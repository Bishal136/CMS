import React from 'react';
import { ChannelIcon } from './ChannelIcon';

export interface IChannelBadgeProps {
  name: string;
  platform: string;
}

export const ChannelBadge: React.FC<IChannelBadgeProps> = ({ name, platform }) => {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-[#E8E8E8] rounded-full text-xs font-medium text-neutral-800">
      <ChannelIcon platform={platform} className="w-3.5 h-3.5" />
      <span>{name}</span>
    </div>
  );
};
