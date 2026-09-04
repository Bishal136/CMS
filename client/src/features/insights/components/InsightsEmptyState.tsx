import React from 'react';
import { EmptyState } from '@/components/common/EmptyState';

export const InsightsEmptyState: React.FC = () => {
  return (
    <EmptyState
      title="Connect a Channel"
      description="Connect your social channels to see rich engagement insights and growth reports."
      actionText="+ Connect Channel"
      onAction={() => (window.location.href = '/settings/channels')}
    />
  );
};
