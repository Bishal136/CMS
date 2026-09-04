import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatDate';

export interface IPostCardProps {
  content: string;
  scheduledAt?: string;
  status: 'draft' | 'scheduled' | 'published';
  channelName?: string;
}

export const PostCard: React.FC<IPostCardProps> = ({
  content,
  scheduledAt,
  status,
  channelName,
}) => {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 hover:shadow-xs transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-neutral-700">{channelName || 'General'}</span>
        <Badge variant={status === 'published' ? 'success' : 'primary'}>{status}</Badge>
      </div>
      <p className="text-sm text-neutral-800 line-clamp-3 mb-3">{content}</p>
      {scheduledAt && (
        <p className="text-xs text-[#6B6B6B]">
          Scheduled for: {formatDate(scheduledAt)}
        </p>
      )}
    </div>
  );
};
