import React from 'react'
import { match, Redirect } from 'react-router'
import Types from 'Types'
import { RomanizationSystems } from '../services/Transcoder'
import GridContainer from './GridContainer'
import LemmaTable from './LemmaTable'
import LemmaList from './LemmaList'
import NavBar from './NavBar'
import MediaQuery from 'react-responsive'
import { withTheme, WithTheme } from '@material-ui/core/styles'

interface Params {
  publication: string
  article: string
}

interface Props extends WithTheme {
  match: match<Params>
  document: Types.AppDocument | null
  isLoading: boolean
  error: Error | null
  showVocalization: boolean
  showTranscription: boolean
  romanization: keyof RomanizationSystems
  fetchArticle: (publication: string, article: string) => void
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

  handleBack = () => void this.setState({ goBack: true })

  renderContent() {
    const {
      document,
      isLoading,
      error,
      showVocalization,
      showTranscription,
      romanization,
      theme,
    } = this.props

    // if (isLoading) {
    //   return <div>Loading...</div>
    // }

    if (error) {
      return <div>Error: {error.message}</div>
    }

    return (
      document &&
      document.kind === 'csv' && (
        <React.Fragment>
          <MediaQuery query={`(min-device-width: ${theme.breakpoints.values.sm + 1}px)`}>
            <LemmaTable
              lemmas={document.data}
              showVocalization={showVocalization}
              showTranscription={showTranscription}
              romanization={romanization}
            />
          </MediaQuery>
          <MediaQuery query={`(max-device-width: ${theme.breakpoints.values.sm}px)`}>
            <LemmaList
              lemmas={document.data}
              showVocalization={showVocalization}
              showTranscription={showTranscription}
              romanization={romanization}
            />
          </MediaQuery>
        </React.Fragment>
      )
    )
  }

  render() {
    const { goBack } = this.state
    const { publication } = this.props.match.params

    if (goBack) {
      return <Redirect to={`/content/${publication}/index`} />
    }

    return (
      <React.Fragment>
        <NavBar title="Arabisch" onBack={this.handleBack} />
        <GridContainer>{this.renderContent()}</GridContainer>
      </React.Fragment>
    )
  }
}

export default withTheme()(ArticlePage)
