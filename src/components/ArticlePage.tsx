import IconButton from '@material-ui/core/IconButton'
import { withTheme, WithTheme } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Code from '@material-ui/icons/Code'
import React, { useEffect, useState } from 'react'
import MediaQuery from 'react-responsive'
import { match, Redirect } from 'react-router'
import Types from 'Types'
import ArticleTextContent from './ArticleTextContent'
import GridContainer from './GridContainer'
import LemmaList from './LemmaList'
import LemmaTable from './LemmaTable'
import NavBar from './NavBar'
import * as S from './strings'
import useGoBack from './useGoBack'
import VoiceOverButton from './VoiceOverButton'

interface Params {
  publication: string
  article: string
}

interface Props extends WithTheme {
  match: match<Params>
  document: Types.AppDocument | null
  isLoading: boolean
  error: Error | null
  showFlashcards: boolean
  showVocalization: boolean
  showTranscription: boolean
  romanizationStandard: string
  voiceEnabled: boolean
  voiceName: string
  fetchArticle: (publication: string, article: string) => void
  clear: () => void
  toggleVoice: () => void
}

const ArticlePage: React.FC<Props> = props => {
  const {
    error,
    document,
    toggleVoice,
    showVocalization,
    showTranscription,
    romanizationStandard,
    voiceName,
    voiceEnabled,
    theme,
  } = props

  const { publication, article } = props.match.params

  const [goFlashcards, setGoFlashcards] = useState<boolean>(false)
  const [goBack, handleBack] = useGoBack(props.clear)

  useEffect(() => {
    if (document === null) {
      props.fetchArticle(publication, article)
    }
  }, [])

  const onGoFlashcards = () => setGoFlashcards(true)

  const renderNavBar = () => (
    <NavBar
      title={S.ARTICLE_PAGE_TITLE}
      onBack={handleBack}
      enableSettingsMenu={true}
      rightHandButtons={
        document === null || document.kind !== 'lemmas' ? null : (
          <React.Fragment>
            <VoiceOverButton
              voiceEnabled={voiceEnabled}
              voiceName={voiceName}
              toggleVoice={toggleVoice}
            />
            <Tooltip title={S.FLASHCARDS_PAGE_TITLE} aria-label={S.FLASHCARDS_PAGE_TITLE}>
              <IconButton color="inherit" onClick={onGoFlashcards}>
                <Code />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )
      }
    />
  )

  const renderContent = () => {
    if (error) {
      return <div>Error: {error.message}</div>
    }

    if (!document) {
      return null
    }

    if (document.kind === 'lemmas') {
      return (
        <React.Fragment>
          <MediaQuery query={`(min-device-width: ${theme.breakpoints.values.sm + 1}px)`}>
            <LemmaTable
              document={document}
              showVocalization={showVocalization}
              showTranscription={showTranscription}
              romanizationStandard={romanizationStandard}
              voiceName={voiceName}
              voiceEnabled={voiceEnabled}
            />
          </MediaQuery>
          <MediaQuery query={`(max-device-width: ${theme.breakpoints.values.sm}px)`}>
            <LemmaList
              document={document}
              showVocalization={showVocalization}
              showTranscription={showTranscription}
              romanizationStandard={romanizationStandard}
              voiceName={voiceName}
              voiceEnabled={voiceEnabled}
            />
          </MediaQuery>
        </React.Fragment>
      )
    }

    if (document.kind === 'md') {
      return <ArticleTextContent document={document} />
    }
  }

  if (goBack) {
    return <Redirect to={`/content/${publication}`} />
  }

  if (goFlashcards) {
    return <Redirect to={`/content/${publication}/${article}/flashcards`} />
  }

  return (
    <React.Fragment>
      {renderNavBar()}
      <GridContainer>{renderContent()}</GridContainer>
    </React.Fragment>
  )
}

export default withTheme()(ArticlePage)
