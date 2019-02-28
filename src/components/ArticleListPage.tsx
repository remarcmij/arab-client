import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { match, Redirect } from 'react-router'
import Types from 'Types'
import GridContainer from '../components/GridContainer'
import NavBar from '../components/NavBar'
import ArticleListItem from './ArticleListItem'
import * as C from './strings'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit,
    },
  })

interface IParams {
  publication: string
  article: string
}

interface Props extends WithStyles<typeof styles> {
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
    if (this.props.documents.length === 0) {
      const { publication } = this.props.match.params
      this.props.fetchArticleList(publication)
    }
  }

  handleBack = () => {
    this.setState({ goBack: true })
    this.props.clear()
  }

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
          <ArticleListItem key={`${doc.publication}.${doc.article}`} publication={doc} />
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
        <NavBar
          title={C.ARTICLE_LIST_PAGE_TITLE}
          onBack={this.handleBack}
          enableSettingsMenu={true}
        />
        <GridContainer>
          <Paper classes={{ root: this.props.classes.root }}>{this.renderContent()}</Paper>
        </GridContainer>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ArticleListPage)
