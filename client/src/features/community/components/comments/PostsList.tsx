import React from 'react';
import { IPost, IPostChannel } from '@/features/publish/types/post.types';
import { Inbox, PanelLeftClose } from 'lucide-react';
import { ChannelIcon } from '@/components/common/ChannelIcon';

export interface IPostsListProps {
  posts?: IPost[];
  selectedPostId?: string;
  onSelectPost?: (postId: string) => void;
}

export const PostsList: React.FC<IPostsListProps> = ({
  posts = [],
  selectedPostId,
  onSelectPost,
}) => {
  return (
    <div className="w-72 sm:w-80 border-r border-neutral-200 min-h-[calc(100vh-12rem)] flex flex-col bg-white shrink-0">
      {/* 1. Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
        <h4 className="text-xs font-semibold text-neutral-800 tracking-tight">Posts</h4>
        <div className="flex items-center gap-2 text-neutral-400">
          <button
            type="button"
            title="Archive / Inbox"
            className="p-1 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <Inbox size={14} className="stroke-[1.8]" />
          </button>
          <button
            type="button"
            title="Collapse sidebar"
            className="p-1 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <PanelLeftClose size={14} className="stroke-[1.8]" />
          </button>
        </div>
      </div>

      {/* 2. Content */}
      <div className="flex-1 overflow-y-auto">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <p className="text-xs text-neutral-400 font-normal">
              Your posts will appear here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {posts.map((post) => {
              const postId = post._id || post.id || '';
              const isSelected = selectedPostId === postId;
              const firstChannel =
                Array.isArray(post.channelIds) && post.channelIds.length > 0
                  ? typeof post.channelIds[0] === 'object'
                    ? (post.channelIds[0] as IPostChannel)
                    : null
                  : null;

              const platform = firstChannel?.platform || 'instagram';

              return (
                <div
                  key={postId}
                  onClick={() => onSelectPost?.(postId)}
                  className={`p-3 text-xs transition-colors cursor-pointer flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-neutral-50 border-l-2 border-neutral-900'
                      : 'hover:bg-neutral-50/60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    <ChannelIcon platform={platform} className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-neutral-800 font-medium line-clamp-2 leading-snug">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-400">
                      <span>{firstChannel?.profile?.name || 'Channel'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
