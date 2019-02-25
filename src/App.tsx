import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import AboutPage from './components/AboutPage'
import ArticleListPageContainer from './containers/ArticleListPageContainer'
import ArticlePageContainer from './containers/ArticlePageContainer'
import FlashcardPagesContainer from './containers/FlashcardsPageContainer'
import PublicationListPageContainer from './containers/PublicationListPageContainer'

// paddingTop emulates the toolbar's minHeight from the default theme
const styles = createStyles({
  root: {
    flexGrow: 1,
    paddingTop: 56,
    '@media (min-width:600px)': {
      paddingTop: 64,
    },
  },
})

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props> {
  render() {
    const { classes } = this.props
    return (
      <Router>
        <div className={classes.root}>
          <Switch>
            <Redirect exact={true} from="/" to="/content" />
            <Route path="/content/:publication/index" component={ArticleListPageContainer} />
            <Route
              path="/content/:publication/:article/flashcards"
              component={FlashcardPagesContainer}
            />
            <Route path="/content/:publication/:article" component={ArticlePageContainer} />
            <Route path="/content" component={PublicationListPageContainer} />
            <Route path="/about" component={AboutPage} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
