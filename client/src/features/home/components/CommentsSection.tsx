import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatRelativeTime } from '@/utils/formatDate';

export interface IHomeComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  platform: string;
  createdAt: string | Date;
  isRead: boolean;
}

export interface ICommentsSectionProps {
  comments?: IHomeComment[];
}

export const CommentsSection: React.FC<ICommentsSectionProps> = ({ comments = [] }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-neutral-900 tracking-tight">Comments</h2>
        {comments.length > 0 && (
          <Link
            to="/dashboard/community/comments"
            className="text-xs text-neutral-600 hover:text-neutral-900 font-medium inline-flex items-center gap-1"
          >
            View All <ArrowRight size={12} />
          </Link>
        )}
      </div>

      {comments.length === 0 ? (
        <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-2xl min-h-[190px] flex flex-col items-center justify-center p-8 text-center transition-colors">
          <MessageSquare size={32} className="text-neutral-400 stroke-[1.5] mb-2" />
          <p className="text-sm font-semibold text-neutral-800">No comments yet.</p>
          <p className="text-xs text-neutral-500 mt-1">You'll see the latest comments here.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 divide-y divide-neutral-100 min-h-[190px] flex flex-col justify-center">
          {comments.slice(0, 3).map((comment) => (
            <div key={comment.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
              {comment.authorAvatar ? (
                <img
                  src={comment.authorAvatar}
                  alt={comment.authorName}
                  className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold text-xs shrink-0 mt-0.5">
                  {comment.authorName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-neutral-900 truncate">
                    {comment.authorName}
                  </span>
                  <span className="text-[10px] text-neutral-400 shrink-0">
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 line-clamp-1 mt-0.5">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
