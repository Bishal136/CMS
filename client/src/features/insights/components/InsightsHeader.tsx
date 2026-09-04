import React from 'react';
import { DateRangeSelector } from '@/components/ui/DateRangeSelector';
import { ExportButton } from './ExportButton';
import { useDateRange } from '../hooks/useDateRange';

export const InsightsHeader: React.FC = () => {
  const { preset, setPreset } = useDateRange();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E8E8] mb-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Analytics & Insights</h2>
        <p className="text-xs text-[#6B6B6B]">Performance analytics across all your channels</p>
      </div>
      <div className="flex items-center gap-3">
        <DateRangeSelector selectedPreset={preset} onSelect={setPreset} />
        <ExportButton />
      </div>
    </div>
  );
};
