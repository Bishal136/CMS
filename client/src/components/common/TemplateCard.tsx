import React from 'react';

export interface ITemplateCardProps {
  emoji?: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export const TemplateCard: React.FC<ITemplateCardProps> = ({
  emoji = '📝',
  title,
  description,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#E8E8E8] hover:border-[#FF1493] rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm"
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <h4 className="text-sm font-semibold text-neutral-900">{title}</h4>
      <p className="text-xs text-[#6B6B6B] line-clamp-2 mt-1">{description}</p>
    </div>
  );
};
