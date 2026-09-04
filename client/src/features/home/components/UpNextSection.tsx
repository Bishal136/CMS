import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatTimeOnly } from '@/utils/formatDate';

export interface IUpcomingPost {
  id: string;
  content: string;
  mediaUrls?: string[];
  scheduledAt?: string | Date;
  status: string;
  channels: Array<{
    id: string;
    platform: string;
    name: string;
  }>;
}

export interface IUpNextSectionProps {
  posts?: IUpcomingPost[];
}

export const UpNextSection: React.FC<IUpNextSectionProps> = ({ posts = [] }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-neutral-900 tracking-tight">Up Next</h2>
        {posts.length > 0 && (
          <Link
            to="/dashboard/publish/queue"
            className="text-xs text-neutral-600 hover:text-neutral-900 font-medium inline-flex items-center gap-1"
          >
            View Queue <ArrowRight size={12} />
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-2xl min-h-[190px] flex flex-col items-center justify-center p-8 text-center transition-colors">
          <Calendar size={32} className="text-neutral-400 stroke-[1.5] mb-2" />
          <p className="text-sm font-semibold text-neutral-800">No posts scheduled yet.</p>
          <p className="text-xs text-neutral-500 mt-1">You'll see upcoming posts here.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 divide-y divide-neutral-100 min-h-[190px] flex flex-col justify-center">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-neutral-900 line-clamp-2 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                  <Clock size={11} />
                  <span>
                    {post.scheduledAt
                      ? `${formatDate(post.scheduledAt, { month: 'short', day: 'numeric' })} at ${formatTimeOnly(post.scheduledAt)}`
                      : 'Scheduled'}
                  </span>
                  {post.channels.length > 0 && (
                    <span className="capitalize px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 font-medium">
                      {post.channels[0].platform}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
