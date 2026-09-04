import React from 'react';
import { cn } from '@/utils/cn';

export interface IProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

export const ProgressBar: React.FC<IProgressBarProps> = ({ value, max = 100, className }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full bg-neutral-100 rounded-full h-2 overflow-hidden', className)}>
      <div
        className="bg-[#FF1493] h-full rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
