import React from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthLayout activeTab="login">
      <div className="w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
            FORGOT PASSWORD
          </h1>
          <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold tracking-widest uppercase mt-1">
            ENTER YOUR EMAIL TO RECEIVE INSTRUCTIONS
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </AuthLayout>
  );
};
