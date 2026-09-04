import React from 'react';
import { IPost, IPostChannel } from '../../types/post.types';
import { Send, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';

export interface IQueuePostCardProps {
  post: IPost;
  onDelete?: (id: string) => void;
  onPublish?: (id: string) => void;
  onEdit?: (post: IPost) => void;
}

export const QueuePostCard: React.FC<IQueuePostCardProps> = ({
  post,
  onDelete,
  onPublish,
  onEdit,
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

  return (
    <div className="flex-1 w-full bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl px-4 py-3 shadow-2xs transition-all flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {getPlatformBadge(platform)}
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-neutral-800 font-medium line-clamp-1">
            {post.content}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] bg-[#E5F8D0] text-[#166534] font-semibold px-2 py-0.5 rounded-full">
              Queued
            </span>
            {post.mediaUrls && post.mediaUrls.length > 0 && (
              <span className="flex items-center gap-1 text-[10px] text-neutral-500">
                <ImageIcon size={11} />
                {post.mediaUrls.length} media
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {onPublish && (
          <button
            type="button"
            onClick={() => onPublish(postId)}
            title="Publish Now"
            className="p-1.5 text-neutral-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
          >
            <Send size={14} />
          </button>
        )}
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(post)}
            title="Edit Post"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 size={14} />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(postId)}
            title="Delete Post"
            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
