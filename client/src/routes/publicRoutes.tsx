import { RouteObject } from 'react-router-dom';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { PricingPage } from '@/features/landing/pages/PricingPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage';
import { OtpPage } from '@/features/auth/pages/OtpPage';
import { AuthCallbackPage } from '@/features/auth/pages/AuthCallbackPage';

export const publicRoutes: RouteObject[] = [
  { path: '/', element: <LandingPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/verify-otp', element: <OtpPage /> },
  { path: '/auth/callback', element: <AuthCallbackPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password/:token', element: <ResetPasswordPage /> },
];
