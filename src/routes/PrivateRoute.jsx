import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, role } = useSelector((state) => state.auth);
  const location = useLocation();
  if (loading) {
    return <div className='text-center font-semibold text-gray-600'>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (requiredRole && role !== requiredRole) {
    toast.info('Bạn không có quyền truy cập trang này!');
    return <Navigate to={location.state?.from?.pathname || '/'} state={{ from: location }} />;
  }
  return children;

};

export default PrivateRoute;