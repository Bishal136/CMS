import React from 'react';
import { cn } from '@/utils/cn';

export interface IFeedSourceTabProps {
  id: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export const FeedSourceTab: React.FC<IFeedSourceTabProps> = ({ name, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer',
        isActive ? 'bg-[#FF1493] text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
      )}
    >
      {name}
    </button>
  );
};
