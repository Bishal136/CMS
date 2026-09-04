import React from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { OtpVerificationForm } from '../components/OtpVerificationForm';

export const OtpPage: React.FC = () => {
  return (
    <AuthLayout activeTab="otp">
      <OtpVerificationForm />
    </AuthLayout>
  );
};
