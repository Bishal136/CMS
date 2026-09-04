import React from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { HeroSection } from '../components/HeroSection';
import { TrustedByBar } from '../components/TrustedByBar';
import { FeatureShowcase } from '../components/FeatureShowcase';
import { FeaturesSection } from '../components/FeaturesSection';
import { IntegrationsSection } from '../components/IntegrationsSection';
import { MadeForSection } from '../components/MadeForSection';
import { PricingSection } from '../components/PricingSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { CTASection } from '../components/CTASection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0D0D0D] selection:bg-[#FFF1F7] selection:text-[#FF1493]">
      <PublicNavbar />
      <main className="flex-1">
        <HeroSection />
        <TrustedByBar />
        <FeatureShowcase />
        <FeaturesSection />
        <IntegrationsSection />
        <MadeForSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <PublicFooter />
    </div>
  );
};
