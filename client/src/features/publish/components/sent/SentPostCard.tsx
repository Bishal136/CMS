import React from 'react';
import { IPost, IPostChannel } from '../../types/post.types';
import { Image as ImageIcon, Trash2, Repeat, ExternalLink, BarChart2, CheckCircle2 } from 'lucide-react';

export interface ISentPostCardProps {
  post: IPost;
  onDelete?: (id: string) => void;
  onRebuffer?: (post: IPost) => void;
}

export const SentPostCard: React.FC<ISentPostCardProps> = ({
  post,
  onDelete,
  onRebuffer,
}) => {
  const postId = post._id || post.id || '';
  const firstChannel =
    Array.isArray(post.channelIds) && post.channelIds.length > 0
      ? typeof post.channelIds[0] === 'object'
        ? (post.channelIds[0] as IPostChannel)
        : null
      : null;

  const platform = firstChannel?.platform || 'instagram';

  const getPlatformBadge = (p: string) => {
    switch (p.toLowerCase()) {
      case 'instagram':
        return (
          <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0">
            IG
          </span>
        );
      case 'facebook':
        return (
          <span className="w-5 h-5 rounded-md bg-[#1877F2] text-white flex items-center justify-center text-[11px] font-bold shadow-2xs shrink-0">
            f
          </span>
        );
      case 'linkedin':
        return (
          <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0">
            in
          </span>
        );
      case 'twitter':
      case 'threads':
        return (
          <span className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0">
            𝕏
          </span>
        );
      default:
        return (
          <span className="w-5 h-5 rounded-md bg-neutral-800 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0">
            {p.slice(0, 2).toUpperCase()}
          </span>
        );
    }
  };

  const dateToFormat = post.publishedAt || post.sentAt || post.updatedAt;
  const formattedDate = dateToFormat
    ? new Date(dateToFormat).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'Recently';

  return (
    <div className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl p-4 shadow-2xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {getPlatformBadge(platform)}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-neutral-800">
              {firstChannel?.profile?.name || 'Channel'}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-[11px] text-neutral-500">{formattedDate}</span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
              <CheckCircle2 size={10} className="text-emerald-600" />
              Sent
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-800 font-medium line-clamp-2">
            {post.content}
          </p>

          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              {post.mediaUrls.slice(0, 3).map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="attachment"
                  className="w-10 h-10 object-cover rounded-lg border border-neutral-200"
                />
              ))}
              {post.mediaUrls.length > 3 && (
                <span className="text-[11px] text-neutral-500 font-medium">
                  +{post.mediaUrls.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Analytics stats & actions */}
      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
        <div className="text-right text-[11px] text-neutral-500 hidden md:block">
          <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
            <BarChart2 size={12} className="text-neutral-400" />
            <span>1.2K Views</span>
          </div>
          <span className="text-neutral-400">48 Engagements</span>
        </div>

        <div className="flex items-center gap-1 border-l border-neutral-200 pl-2">
          {onRebuffer && (
            <button
              type="button"
              onClick={() => onRebuffer(post)}
              title="Re-add to Queue"
              className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            >
              <Repeat size={14} />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(postId)}
              title="Delete Record"
              className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
