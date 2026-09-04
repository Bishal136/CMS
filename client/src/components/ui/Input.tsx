import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, helperText, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-3 py-2 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493] focus:border-transparent transition-all',
            error ? 'border-red-500 focus:ring-red-500' : '',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-[#6B6B6B]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
