import React from 'react';
import { BillingSection } from '../components/organization/BillingSection';

export const BillingPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">Billing & Plans</h2>
      <BillingSection />
    </div>
  );
};
