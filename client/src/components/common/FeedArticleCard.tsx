import React from 'react';

export interface IFeedArticleCardProps {
  title: string;
  source: string;
  url: string;
  publishedAt?: string;
  thumbnail?: string;
}

export const FeedArticleCard: React.FC<IFeedArticleCardProps> = ({
  title,
  source,
  url,
  publishedAt,
  thumbnail,
}) => {
  return (
    <div className="flex gap-4 p-3 bg-white border border-[#E8E8E8] rounded-xl hover:border-[#FF1493] transition-colors">
      {thumbnail && (
        <img src={thumbnail} alt={title} className="w-16 h-16 object-cover rounded-lg shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <a href={url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-neutral-900 hover:text-[#FF1493] line-clamp-2">
          {title}
        </a>
        <div className="flex items-center gap-2 mt-1 text-xs text-[#6B6B6B]">
          <span>{source}</span>
          {publishedAt && <span>• {publishedAt}</span>}
        </div>
      </div>
    </div>
  );
};
