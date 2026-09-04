import React from 'react';
import { cn } from '@/utils/cn';

export interface ISummaryMetricCardProps {
  title: string;
  value: string;
  change: number;
}

export const SummaryMetricCard: React.FC<ISummaryMetricCardProps> = ({ title, value, change }) => {
  const isPositive = change >= 0;

  return (
    <div className="p-5 bg-white border border-[#E8E8E8] rounded-xl shadow-xs">
      <span className="text-xs font-medium text-[#6B6B6B]">{title}</span>
      <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
      <div className="flex items-center gap-1 mt-2 text-xs">
        <span className={cn('font-semibold', isPositive ? 'text-green-600' : 'text-red-500')}>
          {isPositive ? `+${change}%` : `${change}%`}
        </span>
        <span className="text-neutral-400">vs last period</span>
      </div>
    </div>
  );
};
