import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import ContentAdmin from '../features/admin/components/ContentAdmin';
import ContentUpload from '../features/admin/components/ContentUpload';
import UsersOptionsAdmin from '../features/admin/components/UsersOptionsAdmin';
import { redirectUser, User } from '../features/auth/actions';
import AccountConfirmation from '../features/auth/components/AccountConfirmation';
import PasswordChange from '../features/auth/components/PasswordChange';
import PasswordReset from '../features/auth/components/PasswordReset';
import Register from '../features/auth/components/Register';
import SignIn from '../features/auth/components/SignIn';
import Article from '../features/content/components/Article';
import ArticleList from '../features/content/components/ArticleList';
import PublicationList from '../features/content/components/PublicationList';
import Flashcards from '../features/flashcards/components/Flashcards';
import SearchPage from '../features/search/components/SearchPage';
import AboutPage from '../layout/components/About';
import ProtectedRoute from './ProtectedRoute';

const isAdmin = (user: User | null) => !!user?.admin;
const isVerified = (user: User | null) => !!user?.verified;
const isNotSignedIn = (user: User | null) => user == null;

const Routes: React.FC = () => {
  const { parentRedirection } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const rgx = new RegExp(`/$`, 'g');

  const path = window.location.pathname.replace(rgx, '');
  const target = parentRedirection?.replace(rgx, '');
  if (target === path) {
    dispatch(redirectUser(null));
  }

  return (
    <section>
      <Switch>
        <Redirect exact={true} from="/" to={parentRedirection || '/content'} />
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
        <Route exact={true} path="/login" component={SignIn} />
        <Route exact={true} path="/register" component={Register} />
        <ProtectedRoute
          predicate={isNotSignedIn}
          exact={true}
          path="/password/:resetToken"
          component={PasswordChange}
        />
        <ProtectedRoute
          predicate={isVerified}
          exact={true}
          path="/password"
          component={PasswordChange}
        />
        <ProtectedRoute
          predicate={isNotSignedIn}
          exact={true}
          path="/reset"
          component={PasswordReset}
        />
        <Route
          exact={true}
          path="/confirmation/:token"
          component={AccountConfirmation}
        />
        <ProtectedRoute
          predicate={isAdmin}
          exact={true}
          path="/admin/content"
          component={ContentAdmin}
        />
        <ProtectedRoute
          predicate={isAdmin}
          exact={true}
          path="/admin/users/options"
          component={UsersOptionsAdmin}
        />
        <ProtectedRoute
          predicate={isAdmin}
          exact={true}
          path="/admin/content/upload"
          component={ContentUpload}
        />
        <ProtectedRoute
          predicate={isAdmin}
          exact={true}
          path="/admin/upload"
          component={ContentUpload}
        />
        <Route render={() => <div>404</div>} />
      </Switch>
    </section>
  );
};

export default Routes;
