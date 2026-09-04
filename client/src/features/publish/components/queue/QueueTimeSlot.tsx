import React from 'react';
import { IPost } from '../../types/post.types';
import { QueuePostCard } from './QueuePostCard';

export interface IQueueTimeSlotProps {
  time: string;
  platform?: 'instagram' | 'facebook' | 'linkedin' | 'twitter' | string;
  post?: IPost;
  onAddPost: (time: string, platform?: string) => void;
  onDeletePost?: (id: string) => void;
  onPublishPost?: (id: string) => void;
  onEditPost?: (post: IPost) => void;
}

export const QueueTimeSlot: React.FC<IQueueTimeSlotProps> = ({
  time,
  platform = 'instagram',
  post,
  onAddPost,
  onDeletePost,
  onPublishPost,
  onEditPost,
}) => {
  const getPlatformIcon = (p: string) => {
    switch (p.toLowerCase()) {
      case 'instagram':
        return (
          <svg
            className="w-4 h-4 text-[#D92D7B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case 'linkedin':
        return (
          <div className="w-4 h-4 rounded-[3px] bg-[#0A66C2] text-white flex items-center justify-center font-bold text-[9px] select-none">
            in
          </div>
        );
      case 'twitter':
      case 'threads':
        return (
          <div className="w-4 h-4 rounded-md bg-black text-white flex items-center justify-center text-[9px] font-bold">
            𝕏
          </div>
        );
      default:
        return (
          <div className="w-4 h-4 rounded-md bg-neutral-800 text-white flex items-center justify-center text-[9px] font-bold">
            {p.slice(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <div className="flex items-center gap-4 group">
      {/* Time Label on the left */}
      <div className="w-16 sm:w-20 text-xs font-semibold text-neutral-800 shrink-0">
        {time}
      </div>

      {/* Post Card OR Empty Slot Box */}
      {post ? (
        <QueuePostCard
          post={post}
          onDelete={onDeletePost}
          onPublish={onPublishPost}
          onEdit={onEditPost}
        />
      ) : (
        <div
          onClick={() => onAddPost(time, platform)}
          className="flex-1 w-full bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl h-11 px-4 flex items-center shadow-2xs transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {getPlatformIcon(platform)}
            <span className="text-xs font-semibold text-neutral-800">
              + New
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
