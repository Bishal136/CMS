import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MentionsList } from '../components/mentions/MentionsList';
import { ConnectChannelModal } from '@/features/channels/components/ConnectChannelModal';
import {
  useGetMentionsQuery,
  useMarkMentionAsReadMutation,
} from '../services/communityApi';
import { useGetChannelsQuery } from '@/features/channels/services/channelsApi';
import { LayoutGrid, Bookmark, PenLine, HelpCircle } from 'lucide-react';

export const MentionsPage: React.FC = () => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [selectedChannelId] = useState<string | undefined>();

  // Backend queries
  const { data: channels = [] } = useGetChannelsQuery();
  const { data: mentions = [] } = useGetMentionsQuery({
    channelId: selectedChannelId,
  });

  // Mutation
  const [markMentionAsRead] = useMarkMentionAsReadMutation();

  const activeChannelName = selectedChannelId
    ? channels.find((c: any) => (c._id || c.id) === selectedChannelId)?.profile?.name ||
      'Channel'
    : 'All Channels';

  const handleConnectChannel = (_platform?: string) => {
    setIsConnectModalOpen(true);
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markMentionAsRead(id).unwrap();
    } catch {
      // Ignored
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pb-12">
      {/* 1. Page Header Top Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Channel selector with Bookmark */}
        <div className="flex items-center gap-2.5">
          <div className="p-1 text-neutral-800">
            <LayoutGrid size={20} className="stroke-[2.2]" />
          </div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            {activeChannelName}
          </h1>
          <button
            type="button"
            title="Bookmark this view"
            className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <Bookmark size={17} className="stroke-[1.8]" />
          </button>
        </div>

        {/* Right: Feedback Button */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            title="Feedback & Suggestions"
            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            <PenLine size={16} />
          </button>
        </div>
      </div>

      {/* 2. Subnav Tabs Row */}
      <div className="border-b border-neutral-200 mb-12 sm:mb-16 flex items-center justify-between">
        {/* Left Subnav Tabs */}
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard/community/comments"
            className="text-neutral-500 hover:text-neutral-900 font-medium pb-2.5 px-0.5 flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
          >
            <span>Comments</span>
          </Link>

          <Link
            to="/dashboard/community/mentions"
            className="border-b-2 border-neutral-900 text-neutral-900 font-bold pb-2.5 px-0.5 flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <span>Mentions</span>
          </Link>
        </div>
      </div>

      {/* 3. Main Mentions Content */}
      <MentionsList
        mentions={mentions}
        onConnectChannel={handleConnectChannel}
        onMarkRead={handleMarkRead}
      />

      {/* Floating Help Circle Button (Bottom Right) */}
      <button
        type="button"
        title="Help & Support"
        className="fixed bottom-6 right-6 w-9 h-9 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer z-40"
      >
        <HelpCircle size={18} />
      </button>

      {/* Connect Channel Modal */}
      <ConnectChannelModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </div>
  );
};
