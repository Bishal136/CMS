import React from 'react';
import { ChannelsList } from '../components/organization/ChannelsList';

export const ChannelsPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">Channels</h2>
      <ChannelsList />
    </div>
  );
};
