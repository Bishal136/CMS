import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export interface IProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  redirectPath = '/login',
  children,
}) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
