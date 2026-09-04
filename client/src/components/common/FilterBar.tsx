import React from 'react';
import { SearchInput } from '@/components/ui/SearchInput';

export interface IFilterBarProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  children?: React.ReactNode;
}

export const FilterBar: React.FC<IFilterBarProps> = ({
  searchQuery = '',
  onSearchChange,
  children,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white border border-[#E8E8E8] rounded-xl mb-6">
      <div className="w-full sm:w-64">
        {onSearchChange && (
          <SearchInput
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange('')}
          />
        )}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};
