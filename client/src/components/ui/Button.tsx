import React from 'react';
import { cn } from '@/utils/cn';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-[#FF1493] text-white hover:bg-[#D90072]',
    secondary: 'bg-[#0D0D0D] text-white hover:bg-neutral-800',
    ghost: 'bg-transparent text-neutral-700 hover:bg-[#FFF1F7] hover:text-[#FF1493]',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-[#E8E8E8] bg-white text-neutral-800 hover:bg-neutral-50',
    icon: 'p-2 bg-transparent text-neutral-600 hover:bg-neutral-100 rounded-full',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};
