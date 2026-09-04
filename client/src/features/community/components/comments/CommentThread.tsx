import React from 'react';
import { IComment } from '../../types/community.types';
import { CommentItem } from './CommentItem';
import { CommentReplyBox } from './CommentReplyBox';

export interface ICommentThreadProps {
  comment: IComment;
  onReply?: (commentId: string, text: string) => void;
  onMarkRead?: (commentId: string) => void;
}

export const CommentThread: React.FC<ICommentThreadProps> = ({
  comment,
  onReply,
  onMarkRead,
}) => {
  const commentId = comment._id || comment.id || '';
  const author = comment.authorName || comment.author || 'User';
  const text = comment.content || comment.text || '';
  const avatar = comment.authorAvatar || comment.avatar;

  const formattedDate = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'Recently';

  return (
    <div className="p-4 bg-neutral-50/50 border border-neutral-200 rounded-xl space-y-3">
      <CommentItem
        author={author}
        text={text}
        createdAt={formattedDate}
        platform={comment.platform}
        avatar={avatar}
        isRead={comment.isRead}
        onMarkRead={() => onMarkRead?.(commentId)}
      />

      {/* Existing replied content from backend if any */}
      {comment.repliedContent && (
        <div className="pl-6 pt-1">
          <div className="p-3 bg-white border border-neutral-200 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-neutral-900">You (Replied)</span>
              {comment.repliedAt && (
                <span className="text-[10px] text-neutral-400">
                  {new Date(comment.repliedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-700">{comment.repliedContent}</p>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-6 space-y-2">
          {comment.replies.map((rep) => (
            <CommentItem
              key={rep._id || rep.id}
              author={rep.authorName || rep.author || 'User'}
              text={rep.content || rep.text || ''}
              createdAt={
                rep.createdAt
                  ? new Date(rep.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  : ''
              }
              avatar={rep.authorAvatar || rep.avatar}
            />
          ))}
        </div>
      )}

      <CommentReplyBox onSendReply={(replyText) => onReply?.(commentId, replyText)} />
    </div>
  );
};
