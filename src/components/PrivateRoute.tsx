import Reate from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Rootstate} from '../state/store';
import React from 'react';

interface PrivateRouteProps {
  children: Reate.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const isAuthenticated = useSelector(
    (state: Rootstate) => state.userAuth.isAuthenticated
  );
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
