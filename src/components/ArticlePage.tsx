import React from 'react'
import Types from 'Types'
import { match, Redirect } from 'react-router'
import NavBar from './NavBar'
import GridContainer from './GridContainer'
import LemmaTable from './LemmaTable'
import LemmaTabs from './LemmaTabs'

interface Params {
  publication: string
  article: string
}

type Props = {
  match: match<Params>
  document: Types.AppDocument | null
  isLoading: boolean
  error: Error | null
  showVocalization: boolean
  showTranscription: boolean
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
    const { document, isLoading, error, showVocalization, showTranscription } = this.props

    // if (isLoading) {
    //   return <div>Loading...</div>
    // }

    if (error) {
      return <div>Error: {error.message}</div>
    }

    return (
      document &&
      document.kind === 'csv' && (
        <LemmaTable
          lemmas={document.data}
          showVocalization={showVocalization}
          showTranscription={showTranscription}
        />
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

export default ArticlePage
