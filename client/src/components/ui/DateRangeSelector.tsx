import React from 'react';
import { cn } from '@/utils/cn';

export type TDatePreset = '7d' | '30d' | 'mtd' | 'custom';

export interface IDateRangeSelectorProps {
  selectedPreset: TDatePreset;
  onSelect: (preset: TDatePreset) => void;
}

export const DateRangeSelector: React.FC<IDateRangeSelectorProps> = ({
  selectedPreset,
  onSelect,
}) => {
  const presets: { id: TDatePreset; label: string }[] = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: 'mtd', label: 'Month to Date' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="inline-flex rounded-lg border border-[#E8E8E8] p-0.5 bg-neutral-50">
      {presets.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={cn(
            'px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
            selectedPreset === p.id
              ? 'bg-white text-[#FF1493] shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};
