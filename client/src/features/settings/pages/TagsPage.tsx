import React from 'react';
import { TagsManager } from '../components/features/TagsManager';

export const TagsPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">Tags Manager</h2>
      <TagsManager />
    </div>
  );
};
