import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || (role === "ADMIN" ? "/admin" : "/");
    toast.info('Bạn đã đăng nhập, không thể truy cập trang này!');
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return children;
};

export default PublicRoute;