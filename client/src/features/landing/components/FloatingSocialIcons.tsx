import React from 'react';
import { SOCIAL_PLATFORMS } from '@/utils/socialPlatforms';

export const FloatingSocialIcons: React.FC = () => {
  const icons = ['youtube', 'instagram', 'facebook', 'linkedin', 'twitter-x', 'tiktok'];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {icons.map((key) => {
        const p = SOCIAL_PLATFORMS[key];
        return (
          <div
            key={key}
            className="w-12 h-12 bg-white border border-[#E8E8E8] rounded-2xl shadow-sm flex items-center justify-center hover:-translate-y-1 transition-transform"
          >
            <img src={p?.iconPath} alt={p?.name} className="w-6 h-6" />
          </div>
        );
      })}
    </div>
  );
};
