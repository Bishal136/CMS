import React from 'react';

export const InsightsHero: React.FC = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-[#FFF1F7] to-white border border-[#FF1493]/20 rounded-2xl mb-6 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-neutral-900">Turn your posts into insights 🔥</h3>
        <p className="text-xs text-[#6B6B6B] mt-1 max-w-md">
          Discover which topics and formats drive the most reach, clicks, and engagement.
        </p>
      </div>
      <img src="/src/assets/images/insights-hero.svg" alt="Insights" className="w-24 h-24 hidden md:block" />
    </div>
  );
};
