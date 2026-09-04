import React from 'react';
import { cn } from '@/utils/cn';

export interface ISelectOptionItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: ISelectOptionItem[];
  error?: string;
}

export const Select: React.FC<ISelectProps> = ({ label, options, error, className, id, ...props }) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full px-3 py-2 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493] focus:border-transparent transition-all',
          error ? 'border-red-500' : '',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
