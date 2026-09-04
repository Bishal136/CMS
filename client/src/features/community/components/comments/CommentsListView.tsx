import React from 'react';
import { IComment } from '../../types/community.types';
import { CommentItem } from './CommentItem';

export interface ICommentsListViewProps {
  comments: IComment[];
  onMarkRead?: (commentId: string) => void;
}

export const CommentsListView: React.FC<ICommentsListViewProps> = ({ comments, onMarkRead }) => {
  return (
    <div className="space-y-3">
      {comments.map((c) => {
        const commentId = c._id || c.id || '';
        const author = c.authorName || c.author || 'User';
        const text = c.content || c.text || '';
        const avatar = c.authorAvatar || c.avatar;
        const formattedDate = c.createdAt
          ? new Date(c.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })
          : 'Recently';

        return (
          <CommentItem
            key={commentId}
            author={author}
            text={text}
            createdAt={formattedDate}
            platform={c.platform}
            avatar={avatar}
            isRead={c.isRead}
            onMarkRead={() => onMarkRead?.(commentId)}
          />
        );
      })}
    </div>
  );
};
