import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { User } from '../features/auth/actions';

type Props = {
  component: React.ElementType;
  predicate: (user: User) => boolean;
  [key: string]: unknown;
};

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  predicate,
  ...rest
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={props =>
        user && predicate(user) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
