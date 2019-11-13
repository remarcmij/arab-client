import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AboutPage from '../layout/components/About';
import ArticleList from '../features/content/components/ArticleList';
import Flashcards from '../features/content/components/Flashcards';
import LoginPage from '../features/auth/components/LoginPage';
import PublicationList from '../features/content/components/PublicationList';
import SearchPage from '../features/search/components/SearchPage';
import Upload from '../features/admin/components/Upload';
import AdminRoute from './AdminRoute';
import Article from '../features/content/components/Article';
import AccountConfirmation from '../features/auth/components/AccountConfirmation';
import Signup from '../features/auth/components/Signup';

const Routes: React.FC = () => (
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
      <AdminRoute exact={true} path="/admin/upload" component={Upload} />
      <Route render={() => <div>404</div>} />
    </Switch>
  </section>
);

export default Routes;
