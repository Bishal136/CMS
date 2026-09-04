import React from 'react';
import { Button } from '@/components/ui/Button';

export const ChannelGroupsPromo: React.FC = () => {
  return (
    <div className="p-8 bg-[#FFF1F7] border border-[#FF1493]/30 rounded-2xl text-center max-w-md mx-auto my-6">
      <h4 className="text-base font-bold text-neutral-900">Channel Groups</h4>
      <p className="text-xs text-[#6B6B6B] mt-1 mb-4">
        Group channels by brand or client to schedule posts to multiple profiles at once.
      </p>
      <Button size="sm">Upgrade to Essentials</Button>
    </div>
  );
};
