import React from 'react';
import { SOCIAL_PLATFORMS } from '@/utils/socialPlatforms';

export interface ISocialPlatformGridProps {
  onSelect?: (platformId: string) => void;
}

export const SocialPlatformGrid: React.FC<ISocialPlatformGridProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {Object.values(SOCIAL_PLATFORMS).map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect && onSelect(p.id)}
          className="flex flex-col items-center justify-center p-4 border border-[#E8E8E8] rounded-xl hover:border-[#FF1493] hover:bg-[#FFF1F7]/30 transition-all cursor-pointer"
        >
          <img src={p.iconPath} alt={p.name} className="w-8 h-8 mb-2" />
          <span className="text-xs font-medium text-neutral-800">{p.name}</span>
        </button>
      ))}
    </div>
  );
};
