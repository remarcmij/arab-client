import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { User } from '../features/auth/actions';
import Spinner from '../layout/components/Spinner';

type Props = {
  component: React.ElementType;
  predicate: (user: User | null) => boolean;
  fallbackTo?: string;
  [key: string]: unknown;
};

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  predicate,
  fallbackTo = '/content',
  ...rest
}) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  // This allows the user to hit authorized protected routes with no unneeded fallback,
  //    e.g: http://localhost:3000/admin/users/options is protected,
  //    in a case of an admin we should be hitting it by no fallback.
  const UnAuthorizedFallback = () =>
    loading ? <Spinner /> : <Redirect to={fallbackTo} />;

  return (
    <Route
      {...rest}
      render={props =>
        predicate(user) ? <Component {...props} /> : <UnAuthorizedFallback />
      }
    />
  );
};

export default ProtectedRoute;
