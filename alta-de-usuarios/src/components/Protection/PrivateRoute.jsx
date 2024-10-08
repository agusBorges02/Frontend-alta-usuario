import React from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // Hook for navigation


const PrivateRoute = ({ children }) => {
  const idToken = localStorage.getItem('idToken');  // Obtener el token desde el almacenamiento local (o desde el contexto)
  
  // Si no hay token, redirige a la página de login
  if (!idToken) {
    return <Navigate to="/login" />;
  }
  
  // Si hay un token, renderiza el componente protegido
  return children;
};

export default PrivateRoute;
