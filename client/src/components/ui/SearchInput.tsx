import React from 'react';
import { cn } from '@/utils/cn';

export interface ISearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  onChange,
  onClear,
  className,
  placeholder = 'Search...',
  ...props
}) => {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493] transition-all',
          className
        )}
        {...props}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700"
        >
          &times;
        </button>
      )}
    </div>
  );
};
