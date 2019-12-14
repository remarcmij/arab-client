import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { User } from '../features/auth/actions';

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
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={props =>
        predicate(user) ? (
          <Component {...props} />
        ) : (
          <Redirect to={fallbackTo} />
        )
      }
    />
  );
};

export default ProtectedRoute;
