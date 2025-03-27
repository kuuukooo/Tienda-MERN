import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();

  // Si no hay usuario, redirige a login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si hay usuario, muestra el contenido
  return children;
};

export default ProtectedRoute;
