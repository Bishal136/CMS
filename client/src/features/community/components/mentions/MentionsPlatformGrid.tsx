import React from 'react';
import { SocialPlatformGrid } from '@/components/common/SocialPlatformGrid';

export const MentionsPlatformGrid: React.FC = () => {
  return (
    <div className="my-6">
      <p className="text-xs text-[#6B6B6B] mb-3 text-center">Available for supported platforms:</p>
      <SocialPlatformGrid />
    </div>
  );
};
