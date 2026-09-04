import React from 'react';
import { ChannelGroupsList } from '../components/features/ChannelGroupsList';

export const ChannelGroupsPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">Channel Groups</h2>
      <ChannelGroupsList />
    </div>
  );
};
