import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { SettingsProvider } from '../contexts/settings';
import { UserProfileProvider } from '../contexts/UserProfileProvider';
import AboutPage from '../pages/AboutPage';
import ArticleListPage from '../pages/ArticleListPage';
import ArticlePage from '../pages/ArticlePage';
import FlashcardPage from '../pages/FlashcardsPage';
import LoginPage from '../pages/LoginPage';
import PublicationListPage from '../pages/PublicationListPage';
import SearchPage from '../pages/SearchPage';
import { getToken } from '../services/token-service';

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

type Props = WithStyles<typeof styles>;

const ProtectedRoute: React.FC<any> = ({ ...props }) => {
  return getToken() ? <Route {...props} /> : <Redirect to="/login" />;
};

const App: React.FC<Props> = ({ classes }) => {
  return (
    <Router>
      <div className={classes.root}>
        <UserProfileProvider>
          <SettingsProvider>
            <Switch>
              <Redirect exact={true} from="/" to="/content" />
              <ProtectedRoute
                exact={true}
                path="/content/:publication"
                component={ArticleListPage}
              />
              <ProtectedRoute
                path="/content/:publication/:article/flashcards"
                component={FlashcardPage}
              />
              <ProtectedRoute
                path="/content/:publication/:article"
                component={ArticlePage}
              />
              <ProtectedRoute path="/content" component={PublicationListPage} />
              <ProtectedRoute path="/search" component={SearchPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/login" component={LoginPage} />
              <Route render={() => <div>404</div>} />
            </Switch>
          </SettingsProvider>
        </UserProfileProvider>
      </div>
    </Router>
  );
};

export default withStyles(styles)(App);
