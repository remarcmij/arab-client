import { withTheme, WithTheme } from '@material-ui/core/styles'
import React from 'react'
import { match, Redirect } from 'react-router'
import Types from 'Types'
import GridContainer from './GridContainer'
import LemmaFlashcards from './LemmaFlashcards'
import NavBar from './NavBar'
import * as S from './strings'
import VoiceOverButton from './VoiceOverButton'

interface Params {
  publication: string
  article: string
}

interface Props extends WithTheme {
  match: match<Params>
  isLoading: boolean
  error: Error | null
  document: Types.LemmaDocument
  showVocalization: boolean
  showTranscription: boolean
  romanizationStandard: string
  voiceEnabled: boolean
  voiceName: string
  fetchArticle: (publication: string, article: string) => void
  toggleVoice: () => void
}

type State = {
  goBack: boolean
}

class FlashcardPage extends React.Component<Props, State> {
  state = {
    goBack: false,
  }

  componentDidMount() {
    if (!this.props.document) {
      const { publication, article } = this.props.match.params
      this.props.fetchArticle(publication, article)
    }
  }

  handleBack = () => void this.setState({ goBack: true })

  render() {
    const { document, showVocalization, voiceEnabled, voiceName, toggleVoice } = this.props
    const { goBack } = this.state
    const { publication, article } = this.props.match.params

    if (goBack) {
      return <Redirect to={`/content/${publication}/${article}`} />
    }

    if (!document) {
      return null
    }

    return (
      <React.Fragment>
        <NavBar
          title={S.FLASHCARDS_PAGE_TITLE}
          onBack={this.handleBack}
          enableSettingsMenu={true}
          rightHandButtons={
            <VoiceOverButton
              voiceEnabled={voiceEnabled}
              voiceName={voiceName}
              toggleVoice={toggleVoice}
            />
          }
        />
        <GridContainer>
          <LemmaFlashcards
            document={document}
            showVocalization={showVocalization}
            voiceEnabled={voiceEnabled}
            voiceName={voiceName}
          />
        </GridContainer>
      </React.Fragment>
    )
  }
}

export default withTheme()(FlashcardPage)
