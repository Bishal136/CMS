import React from 'react';
import { SOCIAL_PLATFORMS } from '@/utils/socialPlatforms';

export interface IChannelIconProps {
  platform: string;
  className?: string;
}

export const ChannelIcon: React.FC<IChannelIconProps> = ({ platform, className = 'w-5 h-5' }) => {
  const conf = SOCIAL_PLATFORMS[platform];
  return (
    <img
      src={conf?.iconPath || '/src/assets/icons/social/twitter-x.svg'}
      alt={platform}
      className={className}
    />
  );
};
