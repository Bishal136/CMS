import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { settingsRoutes } from './settingsRoutes';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

const router = createBrowserRouter([
  ...publicRoutes,
  {
    element: <ProtectedRoute />,
    children: [
      dashboardRoutes,
      settingsRoutes,
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
