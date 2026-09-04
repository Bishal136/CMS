import React from 'react';
import { IMention } from '../../types/community.types';
import { Avatar } from '@/components/ui/Avatar';
import { ChannelIcon } from '@/components/common/ChannelIcon';

export interface IMentionItemProps {
  mention: IMention;
  onMarkRead?: (id: string) => void;
}

export const MentionItem: React.FC<IMentionItemProps> = ({ mention, onMarkRead }) => {
  const mentionId = mention._id || mention.id || '';
  const author = mention.authorName || mention.author || 'User';
  const text = mention.content || mention.text || '';
  const avatar = mention.authorAvatar || mention.avatar;
  const dateToFormat = mention.mentionedAt || mention.createdAt;
  const formattedDate = dateToFormat
    ? new Date(dateToFormat).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'Recently';

  return (
    <div className="p-4 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl flex items-start gap-3.5 shadow-2xs transition-all">
      <div className="relative shrink-0">
        <Avatar src={avatar} name={author} size="sm" />
        <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-2xs">
          <ChannelIcon platform={mention.platform} className="w-3 h-3" />
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-neutral-900 truncate">{author}</span>
          <span className="text-[10px] text-neutral-400 shrink-0">{formattedDate}</span>
        </div>
        <p className="text-xs text-neutral-700 mt-1 leading-relaxed">{text}</p>

        {mention.isRead === false && onMarkRead && (
          <button
            type="button"
            onClick={() => onMarkRead(mentionId)}
            className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 mt-2 inline-block cursor-pointer"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
};
