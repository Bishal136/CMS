import React from 'react';

export interface IHomeEmptyStateProps {
  title: string;
  desc: string;
}

export const HomeEmptyState: React.FC<IHomeEmptyStateProps> = ({ title, desc }) => {
  return (
    <div className="p-8 text-center bg-white border border-[#E8E8E8] rounded-xl">
      <p className="text-sm font-medium text-neutral-800">{title}</p>
      <p className="text-xs text-[#6B6B6B] mt-1">{desc}</p>
    </div>
  );
};
