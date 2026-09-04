import React from 'react';

export interface IFeatureCheckItemProps {
  text: string;
}

export const FeatureCheckItem: React.FC<IFeatureCheckItemProps> = ({ text }) => {
  return (
    <li className="flex items-center gap-2 text-sm text-neutral-700">
      <span className="text-[#FF1493] font-bold">✓</span>
      <span>{text}</span>
    </li>
  );
};
