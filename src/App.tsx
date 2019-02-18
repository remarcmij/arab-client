import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AboutPage from './Pages/AboutPage';
import ChapterListPage from './Pages/ChapterListPage';
import PublicationListPage from './Pages/PublicationListPage';
import WordListPage from './Pages/WordListPage';

interface Props {
  classes: {
    root: string;
  };
}

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <HashRouter>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Arabic
              </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact={true} path="/" component={PublicationListPage} />
            <Route path="/pub/:publication/:chapter" component={WordListPage} />
            <Route path="/pub/:publication" component={ChapterListPage} />
            <Route path="/about" component={AboutPage} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default withStyles(styles)(App);
