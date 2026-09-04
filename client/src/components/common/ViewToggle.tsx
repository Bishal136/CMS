import React from 'react';
import { cn } from '@/utils/cn';

export interface IViewToggleProps {
  currentView: string;
  onViewChange: (view: string) => void;
  options: { id: string; label: string; icon?: React.ReactNode }[];
}

export const ViewToggle: React.FC<IViewToggleProps> = ({
  currentView,
  onViewChange,
  options,
}) => {
  return (
    <div className="inline-flex rounded-lg border border-[#E8E8E8] p-0.5 bg-neutral-50">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onViewChange(opt.id)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer',
            currentView === opt.id
              ? 'bg-white text-[#FF1493] shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          )}
        >
          {opt.icon}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
};
