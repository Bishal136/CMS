import React from 'react';
import { Button } from '@/components/ui/Button';

export const ChannelSettings: React.FC = () => {
  return (
    <div className="p-6 bg-white border border-[#E8E8E8] rounded-2xl space-y-4">
      <h4 className="text-sm font-bold text-neutral-900">Channel Posting Schedule</h4>
      <p className="text-xs text-[#6B6B6B]">
        Configure default posting times specifically for this channel.
      </p>
      <Button size="sm">Save Schedule</Button>
    </div>
  );
};
