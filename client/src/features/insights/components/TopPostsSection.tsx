import React from 'react';
import { TopPostCard } from './TopPostCard';

export const TopPostsSection: React.FC = () => {
  const samplePosts = [
    { postId: '1', content: 'Our new product is live on Product Hunt! 🚀', platform: 'twitter-x', impressions: 12000, likes: 240, comments: 45, engagementRate: 9.4 },
    { postId: '2', content: '5 lessons learned bootstrapping to $10k MRR', platform: 'linkedin', impressions: 8500, likes: 180, comments: 22, engagementRate: 8.1 },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-base font-bold text-neutral-900 mb-3">Top Performing Posts</h3>
      <div className="space-y-3">
        {samplePosts.map((p) => (
          <TopPostCard key={p.postId} post={p} />
        ))}
      </div>
    </div>
  );
};
