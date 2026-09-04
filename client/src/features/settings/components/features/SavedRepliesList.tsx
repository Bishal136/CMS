import React from 'react';
import { Button } from '@/components/ui/Button';

export const SavedRepliesList: React.FC = () => {
  return (
    <div className="space-y-4 max-w-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900">Saved Replies</h3>
          <p className="text-xs text-[#6B6B6B]">Quick snippets to answer repetitive questions in Community</p>
        </div>
        <Button size="sm">+ New Saved Reply</Button>
      </div>
      <div className="p-8 text-center bg-neutral-50 rounded-xl border border-[#E8E8E8]">
        <p className="text-xs text-[#6B6B6B]">No saved replies yet.</p>
      </div>
    </div>
  );
};
