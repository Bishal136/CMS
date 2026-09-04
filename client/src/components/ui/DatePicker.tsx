import React from 'react';
import { cn } from '@/utils/cn';

export interface IDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}

export const DatePicker: React.FC<IDatePickerProps> = ({ value, onChange, label }) => {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-neutral-700 mb-1">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'px-3 py-2 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493]'
        )}
      />
    </div>
  );
};
