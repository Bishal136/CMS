import React from 'react';
import { IChannel } from '../types/channel.types';
import { ChannelIcon } from '@/components/common/ChannelIcon';
import { Button } from '@/components/ui/Button';

export interface IChannelCardProps {
  channel: IChannel;
  onDisconnect?: (id: string) => void;
}

export const ChannelCard: React.FC<IChannelCardProps> = ({ channel, onDisconnect }) => {
  return (
    <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <ChannelIcon platform={channel.platform} className="w-8 h-8" />
        <div>
          <h4 className="text-sm font-semibold text-neutral-900">{channel.name}</h4>
          <span className="text-xs text-green-600 font-medium">Active & Connected</span>
        </div>
      </div>
      {onDisconnect && (
        <Button size="sm" variant="danger" onClick={() => onDisconnect(channel.id)}>
          Disconnect
        </Button>
      )}
    </div>
  );
};
