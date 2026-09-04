import React from 'react';

export interface IPostPreviewProps {
  content: string;
}

export const PostPreview: React.FC<IPostPreviewProps> = ({ content }) => {
  return (
    <div className="p-4 bg-neutral-50 rounded-xl border border-[#E8E8E8]">
      <h5 className="text-xs font-semibold text-[#6B6B6B] mb-2 uppercase">Live Preview</h5>
      <p className="text-sm text-neutral-900 whitespace-pre-wrap">
        {content || 'Your preview text will appear here...'}
      </p>
    </div>
  );
};
