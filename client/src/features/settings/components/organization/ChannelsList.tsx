import React from 'react';
import { ConnectChannelButton } from './ConnectChannelButton';

export const ChannelsList: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900">Connected Channels</h3>
          <p className="text-xs text-[#6B6B6B]">Manage accounts authorized to post</p>
        </div>
        <ConnectChannelButton />
      </div>
      <div className="p-8 text-center bg-neutral-50 rounded-xl border border-[#E8E8E8]">
        <p className="text-xs text-[#6B6B6B]">No social channels connected yet.</p>
      </div>
    </div>
  );
};
