import React from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/Avatar';

export const ChannelLayout: React.FC = () => {
  const { channelId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8]">
        <div className="flex items-center gap-3">
          <Avatar name={`Channel ${channelId}`} size="lg" />
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Channel #{channelId}</h2>
            <p className="text-xs text-[#6B6B6B]">Connected & Ready to Post</p>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
