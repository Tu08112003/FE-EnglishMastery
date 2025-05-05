import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) return <div className='text-center font-semibold text-gray-600'>Loading...</div>; // hoặc spinner
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;