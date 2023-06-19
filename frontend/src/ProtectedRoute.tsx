import React, { useContext, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import routes from './routes';
import { AuthContext } from '.';

type IProps = PropsWithChildren<unknown>;

const ProtectedRoute = ({ children }: IProps) => {
  const user = useContext(AuthContext);

  if (!user) {
    return <Navigate to={routes['login'].getRoute()} />;
  }

  return <>{children}</>;
};
export default ProtectedRoute;
