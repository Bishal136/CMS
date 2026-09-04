import React from 'react';
import { Badge } from '@/components/ui/Badge';

export const TagSelector: React.FC = () => {
  return (
    <div className="flex items-center gap-2 my-2 text-xs">
      <span className="text-[#6B6B6B]">Tags:</span>
      <Badge variant="primary">#growth</Badge>
      <Badge variant="secondary">#announcement</Badge>
      <button className="text-[#FF1493] hover:underline">+ Add Tag</button>
    </div>
  );
};
