import React from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { PricingSection } from '../components/PricingSection';
import { CTASection } from '../components/CTASection';

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <main className="flex-1 pt-10">
        <PricingSection />
        <CTASection />
      </main>
      <PublicFooter />
    </div>
  );
};
