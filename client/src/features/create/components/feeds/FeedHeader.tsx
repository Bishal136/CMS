import React from 'react';
import { Button } from '@/components/ui/Button';

export interface IFeedHeaderProps {
  title?: string;
  lastRefreshed?: string;
  onRefresh?: () => void;
  onNewFeed?: () => void;
}

export const FeedHeader: React.FC<IFeedHeaderProps> = ({
  title = 'All Feeds',
  lastRefreshed = 'Just now',
  onRefresh,
  onNewFeed,
}) => {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8] mb-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
        <p className="text-xs text-[#6B6B6B]">Last updated: {lastRefreshed}</p>
      </div>
      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh}>
            🔄 Refresh
          </Button>
        )}
        {onNewFeed && (
          <Button size="sm" onClick={onNewFeed}>
            + Add RSS Feed
          </Button>
        )}
      </div>
    </div>
  );
};
