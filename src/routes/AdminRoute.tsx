import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from 'typesafe-actions';

type Props = {
  component: React.ElementType;
  [key: string]: unknown;
};

const AdminRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={props =>
        user && user.admin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default AdminRoute;
