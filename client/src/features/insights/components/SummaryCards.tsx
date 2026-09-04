import React from 'react';
import { SummaryMetricCard } from './SummaryMetricCard';

export const SummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryMetricCard title="Total Impressions" value="48.2K" change={14.2} />
      <SummaryMetricCard title="Engagements" value="3,840" change={8.5} />
      <SummaryMetricCard title="Engagement Rate" value="7.9%" change={1.2} />
      <SummaryMetricCard title="Audience Growth" value="+412" change={-2.1} />
    </div>
  );
};
