import React from 'react';
import { IIdea } from '../../types/idea.types';
import { Layers } from 'lucide-react';

export interface IIdeaCardProps {
  idea: IIdea;
  onClick: () => void;
}

export const IdeaCard: React.FC<IIdeaCardProps> = ({ idea, onClick }) => {
  const isExtensionMockup =
    idea.previewIllustration === 'extension-mockup' ||
    idea.title.includes('Save Inspirations you find online');

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer group select-none"
    >
      {/* Extension Mockup Illustration (if present, like in screenshot) */}
      {isExtensionMockup && (
        <div className="bg-[#E9F2FE] border-b border-[#D8E6FA] p-3.5 relative overflow-hidden flex items-center justify-center min-h-[96px]">
          {/* Buffer-like stack icon at top right */}
          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-white/90 shadow-xs flex items-center justify-center text-blue-600">
            <Layers size={13} />
          </div>

          {/* Cursive handwritten "click" + arrow */}
          <div className="absolute left-3 top-3 text-[11px] text-blue-900 font-serif italic flex items-center gap-1">
            <span>click</span>
            <span className="text-sm -rotate-45 font-mono leading-none">➜</span>
          </div>

          {/* Mini popup card */}
          <div className="bg-white rounded-lg shadow-sm border border-blue-100/80 px-3 py-2 w-32 flex flex-col items-center gap-1 text-center scale-95">
            <span className="text-[10px] font-semibold text-neutral-700 leading-tight">
              Create Post
            </span>
            <div className="w-full bg-[#1E6091] hover:bg-[#184d75] text-white text-[9px] font-bold py-1 px-2 rounded-md shadow-2xs">
              Save to ideas
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="p-3.5">
        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug group-hover:text-[#FF1493] transition-colors">
          {idea.title}
        </h4>

        {(idea.content || idea.description) && (
          <p className="text-xs text-neutral-500 mt-1.5 line-clamp-3 leading-relaxed">
            {idea.content || idea.description}
          </p>
        )}

        {idea.tags && idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {idea.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
