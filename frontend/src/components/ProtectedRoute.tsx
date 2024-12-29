import { Navigate } from 'react-router-dom';
import React from 'react';
import { useGetUserQuery } from '../hooks/useAuth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  const { data: user, isLoading } = useGetUserQuery();
  if(!token) {
    return <Navigate to="/login" />
  }

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;

