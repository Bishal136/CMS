import { IPostInsight } from '../types/insights.types';
import { ChannelIcon } from '@/components/common/ChannelIcon';

export interface ITopPostCardProps {
  post: IPostInsight;
}

export const TopPostCard: React.FC<ITopPostCardProps> = ({ post }) => {
  return (
    <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <ChannelIcon platform={post.platform} />
        <div>
          <p className="text-xs font-semibold text-neutral-900 line-clamp-1">{post.content}</p>
          <span className="text-[10px] text-[#6B6B6B]">{post.likes} Likes • {post.comments} Comments</span>
        </div>
      </div>
      <div className="text-right text-xs">
        <span className="font-bold text-[#FF1493]">{post.engagementRate}%</span>
        <p className="text-[10px] text-[#6B6B6B]">Eng. Rate</p>
      </div>
    </div>
  );
};
