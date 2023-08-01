import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ page, isAuth }) => {
  return isAuth ? page : <Navigate to="/signin" replace />;
};

export default AuthRoute;
