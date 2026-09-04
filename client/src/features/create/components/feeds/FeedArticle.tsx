import React from 'react';
import { IFeedItem } from '../../types/feed.types';
import { ExternalLink } from 'lucide-react';
import { formatRelativeTime } from '@/utils/formatDate';

export interface IFeedArticleProps {
  article: IFeedItem;
  onShare: (art: IFeedItem) => void;
}

export const FeedArticle: React.FC<IFeedArticleProps> = ({ article, onShare }) => {
  const sourceName =
    typeof article.feedId === 'object' && article.feedId !== null
      ? (article.feedId as any).name
      : article.source || 'BBC News';

  const linkUrl = article.sourceUrl || article.url || '#';

  const defaultImages = [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
  ];

  const thumbnail =
    article.imageUrl ||
    defaultImages[Math.abs(article.title.length) % defaultImages.length];

  return (
    <div
      onClick={() => onShare(article)}
      className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-neutral-300 hover:shadow-xs transition-all cursor-pointer group select-none"
    >
      {/* Thumbnail Image on the Left */}
      <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
        <img
          src={thumbnail}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Content Area on the Right */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-bold text-neutral-900 leading-snug group-hover:text-[#1E40AF] transition-colors">
            {article.title}
            <a
              href={linkUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block ml-1.5 text-neutral-400 hover:text-blue-600 align-middle"
              title="Open source article"
            >
              <ExternalLink size={13} />
            </a>
          </h4>
        </div>

        {/* Source Badge */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 mt-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          <span>{sourceName}</span>
        </div>

        {/* Summary Snippet */}
        {article.description && (
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mt-1">
            {article.description}
          </p>
        )}

        {/* Relative Timestamp */}
        <div className="text-[11px] text-neutral-400 mt-2 font-medium">
          {formatRelativeTime(article.publishedAt)}
        </div>
      </div>
    </div>
  );
};
