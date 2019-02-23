import React from 'react'
import { match, Redirect } from 'react-router'
import Types from 'Types'
import GridContainer from './GridContainer'
import LemmaTable from './LemmaTable'
import LemmaList from './LemmaList'
import NavBar from './NavBar'
import MediaQuery from 'react-responsive'
import { withTheme, WithTheme } from '@material-ui/core/styles'
import LemmaFlashcards from './LemmaFlashcards'
import ArticleTextContent from './ArticleTextContent'

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
  speechEnabled: boolean
  voiceName: string
  fetchArticle: (publication: string, article: string) => void
  clear: () => void
}

type State = {
  goBack: boolean
}

class ArticlePage extends React.Component<Props, State> {
  state = {
    goBack: false,
  }

  componentDidMount() {
    const { publication, article } = this.props.match.params
    this.props.fetchArticle(publication, article)
  }

  componentWillUnmount() {
    this.props.clear()
  }

  handleBack = () => void this.setState({ goBack: true })

  renderContent() {
    const {
      document,
      isLoading,
      error,
      showFlashcards,
      showVocalization,
      showTranscription,
      romanizationStandard,
      speechEnabled,
      voiceName,
      theme,
    } = this.props

    // if (isLoading) {
    //   return <div>Loading...</div>
    // }

    if (error) {
      return <div>Error: {error.message}</div>
    }

    if (!document) {
      return null
    }

    if (document.kind === 'csv') {
      if (showFlashcards) {
        return (
          <LemmaFlashcards
            lemmas={document.data}
            showVocalization={showVocalization}
            speechEnabled={speechEnabled}
            voiceName={voiceName}
          />
        )
      }
      return (
        <React.Fragment>
          <MediaQuery query={`(min-device-width: ${theme.breakpoints.values.sm + 1}px)`}>
            <LemmaTable
              lemmas={document.data}
              showVocalization={showVocalization}
              showTranscription={showTranscription}
              romanizationStandard={romanizationStandard}
              voiceName={voiceName}
            />
          </MediaQuery>
          <MediaQuery query={`(max-device-width: ${theme.breakpoints.values.sm}px)`}>
            <LemmaList
              lemmas={document.data}
              showVocalization={showVocalization}
              showTranscription={showTranscription}
              romanizationStandard={romanizationStandard}
            />
          </MediaQuery>
        </React.Fragment>
      )
    }

    if (document.kind === 'md') {
      return <ArticleTextContent htmlText={document.data} />
    }
  }

  render() {
    const { document } = this.props
    const { goBack } = this.state
    const { publication } = this.props.match.params

    if (goBack) {
      return <Redirect to={`/content/${publication}/index`} />
    }

    return (
      <React.Fragment>
        <NavBar
          title={document ? document.title : ''}
          onBack={this.handleBack}
          enableSettingsMenu={document !== null && document.kind === 'csv'}
        />
        <GridContainer>{this.renderContent()}</GridContainer>
      </React.Fragment>
    )
  }
}

export default withTheme()(ArticlePage)
