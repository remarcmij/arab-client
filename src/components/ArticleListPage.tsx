import List from '@material-ui/core/List'
import * as React from 'react'
import { match, Redirect } from 'react-router'
import Types from 'Types'
import GridContainer from '../components/GridContainer'
import NavBar from '../components/NavBar'
import ArticleListItem from './ArticleListItem'
import * as C from './strings'

interface IParams {
  publication: string
  chapter: string
}

type Props = {
  match: match<IParams>
  documents: Types.AppDocument[]
  isLoading: boolean
  error: Error | null
  fetchArticleList: (publication: string) => void
  clear: () => void
}

type State = {
  goBack: boolean
}

class ArticleListPage extends React.Component<Props, State> {
  readonly state: State = {
    goBack: false,
  }

  componentDidMount() {
    const { publication } = this.props.match.params
    this.props.fetchArticleList(publication)
  }

  componentWillUnmount() {
    this.props.clear()
  }

  handleBack = () => void this.setState({ goBack: true })

  renderContent() {
    const { documents, isLoading, error } = this.props

    // if (isLoading) {
    //   return <p>Loading...</p>
    // }

    if (error) {
      return <div>Error: {error.message}</div>
    }

    return (
      <List>
        {documents.map(doc => (
          <ArticleListItem key={`${doc.publication}.${doc.chapter}`} publication={doc} />
        ))}
      </List>
    )
  }

  render() {
    const { goBack } = this.state

    if (goBack) {
      return <Redirect to="/content" />
    }

    return (
      <React.Fragment>
        <NavBar title={C.ARTICLES_TITLE} onBack={this.handleBack} />
        <GridContainer>{this.renderContent()}</GridContainer>
      </React.Fragment>
    )
  }
}

export default ArticleListPage
