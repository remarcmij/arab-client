import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ArticleListContainer from '../../containers/ArticleListContainer';
import FlashcardsContainer from '../../containers/FlashcardsContainer';
import PublicationListContainer from '../../containers/PublicationListContainer';
import SearchPageContainer from '../../containers/SearchPageContainer';
import AboutPage from '../../pages/About';
import LoginPage from '../../pages/LoginPage';
import Article from '../article/Article';
import AccountConfirmation from '../auth/AccountConfirmation';
import Signup from '../auth/Signup';
import Alert from '../layout/Alert';

const Routes: React.FC<{}> = () => {
  return (
    <section>
      <Alert />
      <Switch>
        <Redirect exact={true} from="/" to="/content" />
        <Route
          exact={true}
          path="/content/:publication"
          component={ArticleListContainer}
        />
        <Route
          exact={true}
          path="/content/:publication/:article/flashcards"
          component={FlashcardsContainer}
        />
        <Route
          exact={true}
          path="/content/:publication/:article"
          component={Article}
        />
        <Route
          exact={true}
          path="/content"
          component={PublicationListContainer}
        />
        <Route exact={true} path="/search" component={SearchPageContainer} />
        <Route exact={true} path="/about" component={AboutPage} />
        <Route exact={true} path="/login" component={LoginPage} />
        <Route exact={true} path="/signup" component={Signup} />
        <Route
          exact={true}
          path="/confirmation/:token"
          component={AccountConfirmation}
        />
        <Route render={() => <div>404</div>} />
      </Switch>
    </section>
  );
};

export default Routes;
