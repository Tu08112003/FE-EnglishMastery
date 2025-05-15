import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    if (role === 'ADMIN') {
      return <Navigate to="/admin" />;
    }else{
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default PublicRoute;