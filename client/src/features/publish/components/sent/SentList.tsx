import React from 'react';
import { IPost } from '../../types/post.types';
import { SentPostCard } from './SentPostCard';
import { SentEmptyState } from './SentEmptyState';

export interface ISentListProps {
  posts: IPost[];
  onConnectChannel: () => void;
  onInviteTeam?: () => void;
  onDeletePost?: (id: string) => void;
  onRebuffer?: (post: IPost) => void;
}

export const SentList: React.FC<ISentListProps> = ({
  posts,
  onConnectChannel,
  onInviteTeam,
  onDeletePost,
  onRebuffer,
}) => {
  if (posts.length === 0) {
    return (
      <SentEmptyState
        onConnectChannel={onConnectChannel}
        onInviteTeam={onInviteTeam}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-3 pt-2 pb-16">
      {posts.map((p) => (
        <SentPostCard
          key={p._id || p.id}
          post={p}
          onDelete={onDeletePost}
          onRebuffer={onRebuffer}
        />
      ))}
    </div>
  );
};
