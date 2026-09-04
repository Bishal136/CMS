import React from 'react';
import { PricingSection } from '@/features/landing/components/PricingSection';

export const BillingSection: React.FC = () => {
  return (
    <div>
      <h3 className="text-base font-bold text-neutral-900 mb-2">Subscription & Invoices</h3>
      <PricingSection />
    </div>
  );
};
