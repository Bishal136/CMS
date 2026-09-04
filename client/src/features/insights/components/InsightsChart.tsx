import React from 'react';

export const InsightsChart: React.FC = () => {
  return (
    <div className="p-6 bg-white border border-[#E8E8E8] rounded-2xl mb-6">
      <h3 className="text-base font-bold text-neutral-900 mb-4">Impressions Trend</h3>
      <div className="h-64 flex items-end justify-between gap-2 pt-6">
        {[40, 65, 30, 85, 95, 75, 110, 60, 90, 120, 140, 130].map((val, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div
              className="w-full bg-[#FF1493] rounded-t-md transition-all hover:bg-[#D90072]"
              style={{ height: `${(val / 150) * 100}%` }}
            />
            <span className="text-[10px] text-[#6B6B6B]">W{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
