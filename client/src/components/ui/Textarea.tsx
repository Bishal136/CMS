import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ label, helperText, error, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full px-3 py-2 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493] focus:border-transparent transition-all resize-y',
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
Textarea.displayName = 'Textarea';
