import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ArticleList from '../../pages/ArticleList';
import Flashcards from '../../pages/Flashcards';
import PublicationList from '../../pages/PublicationList';
import SearchPage from '../../pages/SearchPage';
import AboutPage from '../../pages/About';
import LoginPage from '../../pages/LoginPage';
import Article from '../article/Article';
import AccountConfirmation from '../auth/AccountConfirmation';
import Signup from '../auth/Signup';

const Routes: React.FC<{}> = () => {
  return (
    <section>
      <Switch>
        <Redirect exact={true} from="/" to="/content" />
        <Route
          exact={true}
          path="/content/:publication"
          component={ArticleList}
        />
        <Route
          exact={true}
          path="/content/:publication/:article/flashcards"
          component={Flashcards}
        />
        <Route
          exact={true}
          path="/content/:publication/:article"
          component={Article}
        />
        <Route exact={true} path="/content" component={PublicationList} />
        <Route exact={true} path="/search" component={SearchPage} />
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
