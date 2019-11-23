import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ContentAdmin from '../features/admin/components/ContentAdmin';
import Upload from '../features/admin/components/Upload';
import AccountConfirmation from '../features/auth/components/AccountConfirmation';
import LoginPage from '../features/auth/components/LoginPage';
import Signup from '../features/auth/components/Signup';
import Article from '../features/content/components/Article';
import ArticleList from '../features/content/components/ArticleList';
import Flashcards from '../features/content/components/Flashcards';
import PublicationList from '../features/content/components/PublicationList';
import SearchPage from '../features/search/components/SearchPage';
import AboutPage from '../layout/components/About';
import AdminRoute from './AdminRoute';

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
        path="/content/:publication/:article/flashcards/:index"
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
      <AdminRoute exact={true} path="/admin/content" component={ContentAdmin} />
      <AdminRoute
        exact={true}
        path="/admin/content/upload"
        component={Upload}
      />
      <AdminRoute exact={true} path="/admin/upload" component={Upload} />
      <Route render={() => <div>404</div>} />
    </Switch>
  </section>
);

export default Routes;
