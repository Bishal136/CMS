import React from 'react';
import { ChannelIcon } from '@/components/common/ChannelIcon';
import { useGetChannelsQuery } from '@/features/channels/services/channelsApi';
import { cn } from '@/utils/cn';

export interface IChannelSelectorProps {
  selectedChannels: string[];
  onToggle: (chId: string) => void;
}

export const ChannelSelector: React.FC<IChannelSelectorProps> = ({
  selectedChannels,
  onToggle,
}) => {
  const { data: channels = [] } = useGetChannelsQuery();

  const displayChannels =
    channels.length > 0
      ? channels.map((c: any) => ({
          id: c._id || c.id,
          name: c.profile?.name || c.platform,
          platform: c.platform,
        }))
      : [
          { id: 'instagram', name: 'Instagram Channel', platform: 'instagram' },
          { id: 'facebook', name: 'Facebook Page', platform: 'facebook' },
          { id: 'linkedin', name: 'LinkedIn Profile', platform: 'linkedin' },
        ];

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      {displayChannels.map((ch) => {
        const isSelected = selectedChannels.includes(ch.id);
        return (
          <button
            key={ch.id}
            type="button"
            onClick={() => onToggle(ch.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer',
              isSelected
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
            )}
          >
            <ChannelIcon platform={ch.platform} className="w-3.5 h-3.5" />
            <span>{ch.name}</span>
          </button>
        );
      })}
    </div>
  );
};
