import React from 'react';

export interface IIdeaCardItem {
  id: string;
  title: string;
  tags?: string[];
}

export interface IIdeaCardProps {
  idea: IIdeaCardItem;
  onClick?: () => void;
}

export const IdeaCard: React.FC<IIdeaCardProps> = ({ idea, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-3 bg-white border border-[#E8E8E8] rounded-lg shadow-xs hover:border-[#FF1493] cursor-grab transition-all"
    >
      <h5 className="text-sm font-medium text-neutral-900">{idea.title}</h5>
      {idea.tags && idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {idea.tags.map((t) => (
            <span key={t} className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
