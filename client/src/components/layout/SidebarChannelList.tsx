import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ConnectChannelModal } from '@/features/channels/components/ConnectChannelModal';
import { Link } from 'react-router-dom';

export interface ISidebarChannelItem {
  id: string;
  name: string;
  platform: string;
}

export interface ISidebarChannelListProps {
  channels?: ISidebarChannelItem[];
}

export const SidebarChannelList: React.FC<ISidebarChannelListProps> = ({ channels = [] }) => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  return (
    <div className="mt-7">
      <div className="px-3 mb-2.5">
        <span className="text-xs font-medium text-neutral-400">Connect channels</span>
      </div>

      {/* Social channel icon shortcuts row */}
      <div className="flex items-center gap-2 px-3 mb-3">
        {/* Instagram */}
        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shadow-2xs hover:opacity-90 transition-opacity cursor-pointer"
          title="Connect Instagram"
        >
          <span className="text-[10px] font-bold">IG</span>
        </button>

        {/* Threads / X */}
        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="w-7 h-7 rounded-lg bg-black flex items-center justify-center text-white shadow-2xs hover:opacity-90 transition-opacity cursor-pointer"
          title="Connect Threads / X"
        >
          <span className="text-[10px] font-bold">𝕏</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="w-7 h-7 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white shadow-2xs hover:opacity-90 transition-opacity cursor-pointer"
          title="Connect LinkedIn"
        >
          <span className="text-[10px] font-bold">in</span>
        </button>

        {/* Plus Button */}
        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="w-7 h-7 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-500 shadow-2xs hover:text-neutral-900 transition-colors cursor-pointer"
          title="Connect more channels"
        >
          <Plus size={13} className="stroke-[2.5]" />
        </button>
      </div>

      {/* Connected channels list if any exist */}
      {channels.length > 0 && (
        <div className="space-y-1 mt-3 px-1 border-t border-neutral-100 pt-2">
          {channels.map((ch) => (
            <Link
              key={ch.id}
              to={`/dashboard/channel/${ch.id}`}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate">{ch.name}</span>
            </Link>
          ))}
        </div>
      )}

      <ConnectChannelModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </div>
  );
};
