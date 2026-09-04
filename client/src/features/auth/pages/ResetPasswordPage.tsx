import React from 'react';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export const ResetPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-md bg-white border border-[#E8E8E8] rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-neutral-900">Set New Password</h2>
          <p className="text-xs text-[#6B6B6B] mt-1">Please enter your new password below.</p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};
