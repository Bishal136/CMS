import React from 'react';
import { cn } from '@/utils/cn';

export interface IBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'gray';
  className?: string;
}

export const Badge: React.FC<IBadgeProps> = ({ children, variant = 'primary', className }) => {
  const styles = {
    primary: 'bg-[#FFF1F7] text-[#FF1493] border-[#FF1493]/20',
    secondary: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    gray: 'bg-neutral-50 text-neutral-500 border-neutral-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
