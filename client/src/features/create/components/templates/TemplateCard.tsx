import React from 'react';
import { ITemplate } from '../../types/template.types';

export interface ITemplateCardProps {
  template: ITemplate;
  onSelect: (t: ITemplate) => void;
}

export const TemplateCard: React.FC<ITemplateCardProps> = ({ template, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(template)}
      className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer group min-h-[175px] select-none"
    >
      <div>
        {/* Emoji */}
        <div className="text-2xl select-none mb-2 leading-none">
          {template.emoji || '📝'}
        </div>

        {/* Title */}
        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug line-clamp-2 group-hover:text-[#FF1493] transition-colors mb-1">
          {template.title}
        </h4>

        {/* Preview snippet */}
        <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
          {template.content}
        </p>
      </div>

      {/* Bottom Category Pill Tag */}
      {template.category && (
        <div className="mt-3.5 pt-1">
          <span className="inline-block text-[10px] font-medium text-neutral-500 bg-[#F3F4F6] px-2.5 py-0.5 rounded-full truncate max-w-full">
            {template.category}
          </span>
        </div>
      )}
    </div>
  );
};
