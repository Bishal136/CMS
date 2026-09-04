import React from 'react';
import { cn } from '@/utils/cn';

export interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<ICheckboxProps> = ({ label, className, id, ...props }) => {
  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={checkboxId} className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        id={checkboxId}
        type="checkbox"
        className={cn(
          'w-4 h-4 text-[#FF1493] border-[#E8E8E8] rounded focus:ring-[#FF1493] cursor-pointer accent-[#FF1493]',
          className
        )}
        {...props}
      />
      {label && <span className="text-sm text-neutral-800">{label}</span>}
    </label>
  );
};
