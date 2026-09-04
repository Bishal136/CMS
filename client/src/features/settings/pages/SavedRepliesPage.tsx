import React from 'react';
import { SavedRepliesList } from '../components/features/SavedRepliesList';

export const SavedRepliesPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">Saved Replies</h2>
      <SavedRepliesList />
    </div>
  );
};
