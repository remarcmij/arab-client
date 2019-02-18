import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import AboutPage from './components/AboutPage'
import ChapterListPage from './containers/ChapterListPage'
import ContentPage from './containers/ContentPage'
import LemmaListPage from './containers/LemmaListPage'

const styles = createStyles({
  root: {
    flexGrow: 1,
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
            <Route path="/content/:publication/index" component={ChapterListPage} />
            <Route path="/content/:publication/:chapter" component={LemmaListPage} />
            <Route path="/content" component={ContentPage} />
            <Route path="/about" component={AboutPage} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
