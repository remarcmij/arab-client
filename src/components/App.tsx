import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';
import ArticleListPage from '../pages/ArticleListPage';
import ArticlePage from '../pages/ArticlePage';
import FlashcardPage from '../pages/FlashcardsPage';
import PublicationListPage from '../pages/PublicationListPage';
import { SettingsProvider } from '../contexts/SettingsProvider';
import SearchPage from './SearchPage';

// paddingTop emulates the toolbar's minHeight from the default theme
const styles = createStyles({
  root: {
    flexGrow: 1,
    paddingTop: 56,
    '@media (min-width:600px)': {
      paddingTop: 64,
    },
  },
});

interface Props extends WithStyles<typeof styles> {}

const App: React.FC<Props> = ({ classes }) => {
  return (
    <Router>
      <div className={classes.root}>
        <SettingsProvider>
          <Switch>
            <Redirect exact={true} from="/" to="/content" />
            <Route exact={true} path="/content/:publication" component={ArticleListPage} />
            <Route path="/content/:publication/:article/flashcards" component={FlashcardPage} />
            <Route path="/content/:publication/:article" component={ArticlePage} />
            <Route path="/content" component={PublicationListPage} />
            <Route path="/dict" component={SearchPage} />
            <Route path="/about" component={AboutPage} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </SettingsProvider>
      </div>
    </Router>
  );
};

export default withStyles(styles)(App);
