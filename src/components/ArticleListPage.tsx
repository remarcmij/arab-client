import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { match, Redirect } from 'react-router'
import Types from 'Types'
import GridContainer from '../components/GridContainer'
import NavBar from '../components/NavBar'
import ArticleListItem from './ArticleListItem'
import * as C from './strings'
import useGoBack from './useGoBack'

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

const renderContent = ({ documents, error }: Props) => {
  return error ? (
    <div>Error: {error.message}</div>
  ) : (
    <List>
      {documents.map(doc => (
        <ArticleListItem key={`${doc.filename}`} publication={doc} />
      ))}
    </List>
  )
}

const ArticleListPage: React.FC<Props> = props => {
  const [goBack, handleBack] = useGoBack(props.clear)

  useEffect(() => {
    if (props.documents.length === 0) {
      const { publication } = props.match.params
      props.fetchArticleList(publication)
    }
  }, [])

  return goBack ? (
    <Redirect to="/content" />
  ) : (
    <React.Fragment>
      <NavBar title={C.ARTICLE_LIST_PAGE_TITLE} onBack={handleBack} enableSettingsMenu={true} />
      <GridContainer>
        {!props.isLoading && (
          <Paper classes={{ root: props.classes.root }}>{renderContent(props)}</Paper>
        )}
      </GridContainer>
    </React.Fragment>
  )
}

export default withStyles(styles)(ArticleListPage)
