import React from 'react';
import { cn } from '@/utils/cn';

export interface ITagProps {
  label: string;
  color?: string;
  onRemove?: () => void;
}

export const Tag: React.FC<ITagProps> = ({ label, color = '#FF1493', onRemove }) => {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:opacity-75 font-bold cursor-pointer text-xs"
        >
          &times;
        </button>
      )}
    </span>
  );
};
