import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
