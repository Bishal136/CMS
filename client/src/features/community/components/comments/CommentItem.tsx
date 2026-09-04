import React from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { ChannelIcon } from '@/components/common/ChannelIcon';

export interface ICommentItemProps {
  author: string;
  text: string;
  createdAt: string;
  platform?: string;
  avatar?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}

export const CommentItem: React.FC<ICommentItemProps> = ({
  author,
  text,
  createdAt,
  platform = 'instagram',
  avatar,
  isRead,
  onMarkRead,
}) => {
  return (
    <div className="flex items-start gap-3 p-3.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl shadow-2xs transition-all">
      <div className="relative shrink-0">
        <Avatar src={avatar} name={author} size="sm" />
        <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-2xs">
          <ChannelIcon platform={platform} className="w-3 h-3" />
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h5 className="text-xs font-bold text-neutral-900 truncate">{author}</h5>
          <span className="text-[10px] text-neutral-400 shrink-0">{createdAt}</span>
        </div>
        <p className="text-xs text-neutral-700 mt-1 leading-relaxed">{text}</p>

        {isRead === false && onMarkRead && (
          <button
            type="button"
            onClick={onMarkRead}
            className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 mt-2 inline-block cursor-pointer"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
};
