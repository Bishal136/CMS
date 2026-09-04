import React from 'react';

export interface ITagItemProps {
  name: string;
  color?: string;
  onDelete?: () => void;
}

export const TagItem: React.FC<ITagItemProps> = ({ name, color = '#FF1493', onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white border border-[#E8E8E8] rounded-xl">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xs font-semibold text-neutral-900">#{name}</span>
      </div>
      {onDelete && (
        <button onClick={onDelete} className="text-xs text-red-500 hover:underline">
          Delete
        </button>
      )}
    </div>
  );
};
