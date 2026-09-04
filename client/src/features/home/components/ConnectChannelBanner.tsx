import React from 'react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export const ConnectChannelBanner: React.FC = () => {
  return (
    <div className="bg-[#FFF1F7] border border-[#FF1493]/30 rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h4 className="text-sm font-bold text-neutral-900">Connect a channel to get started!</h4>
        <p className="text-xs text-neutral-600 mt-0.5">
          Link YouTube, Instagram, X, or LinkedIn to begin scheduling and tracking posts.
        </p>
      </div>
      <Link to="/settings/channels">
        <Button size="sm">+ Connect Channel</Button>
      </Link>
    </div>
  );
};
