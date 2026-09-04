import React from 'react';

export interface IStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const StatsCard: React.FC<IStatsCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-xl p-5 shadow-xs flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-[#6B6B6B]">{title}</p>
        <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
      </div>
      {icon && <div className="text-2xl p-3 bg-[#FFF1F7] rounded-xl text-[#FF1493]">{icon}</div>}
    </div>
  );
};
