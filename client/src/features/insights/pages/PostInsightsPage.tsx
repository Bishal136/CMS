import React from 'react';
import { InsightsHeader } from '../components/InsightsHeader';
import { InsightsHero } from '../components/InsightsHero';
import { SummaryCards } from '../components/SummaryCards';
import { InsightsChart } from '../components/InsightsChart';
import { TopPostsSection } from '../components/TopPostsSection';

export const PostInsightsPage: React.FC = () => {
  return (
    <div>
      <InsightsHeader />
      <InsightsHero />
      <SummaryCards />
      <InsightsChart />
      <TopPostsSection />
    </div>
  );
};
