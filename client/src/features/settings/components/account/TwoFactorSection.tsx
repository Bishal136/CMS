import React from 'react';
import { TwoFactorSetup } from '@/features/auth/components/TwoFactorSetup';

export const TwoFactorSection: React.FC = () => {
  return (
    <div className="max-w-md">
      <h3 className="text-base font-bold text-neutral-900 mb-1">Two-Factor Authentication</h3>
      <p className="text-xs text-[#6B6B6B] mb-4">
        Add an extra layer of security to your account.
      </p>
      <TwoFactorSetup />
    </div>
  );
};
