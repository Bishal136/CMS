import React from 'react';
import { cn } from '@/utils/cn';

export interface IIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IIconButtonProps> = ({
  children,
  size = 'md',
  className,
  ...props
}) => {
  const sizes = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base',
  };

  return (
    <button
      className={cn(
        'rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors inline-flex items-center justify-center cursor-pointer',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
