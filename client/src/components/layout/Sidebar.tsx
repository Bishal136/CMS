import React, { useState } from 'react';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarChannelList } from './SidebarChannelList';
import { SidebarOrgInfo } from './SidebarOrgInfo';
import { PostComposer } from '@/features/publish/components/composer/PostComposer';
import { useGetChannelsQuery } from '@/features/channels/services/channelsApi';
import { useGetHomeDashboardQuery } from '@/features/home/services/homeApi';
import {
  Home,
  PenLine,
  Calendar,
  MessageSquare,
  BarChart2,
  Plus,
  PanelLeftClose,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const { data: channels = [] } = useGetChannelsQuery();
  const { data: homeData } = useGetHomeDashboardQuery();

  const orgName = homeData?.data?.organization?.name || 'My organization';
  const orgPlan = homeData?.data?.organization?.plan || 'Free Plan';
  const queueCount = homeData?.data?.upcomingPosts?.length ?? 0;

  return (
    <aside className="w-56 sm:w-60 h-screen bg-white border-r border-[#E8E8E8] flex flex-col justify-between shrink-0 select-none">
      <div className="p-3 sm:p-4">
        {/* Brand Logo & Collapse Toggle */}
        <div className="flex items-center justify-between px-1 mb-4">
          <div className="bg-[#C8F560] text-neutral-900 font-extrabold text-xs tracking-wider px-2.5 py-1 rounded-md shadow-2xs">
            LOGO
          </div>
          <button
            type="button"
            title="Toggle sidebar"
            className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            <PanelLeftClose size={16} />
          </button>
        </div>

        {/* "+ New" Pill Button */}
        <button
          type="button"
          onClick={() => setIsComposerOpen(true)}
          className="w-full bg-[#C8F560] hover:bg-[#bdf04d] active:scale-[0.99] text-neutral-900 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-1.5 mb-4 shadow-2xs transition-all cursor-pointer"
        >
          <Plus size={15} className="stroke-[2.5]" />
          <span>New</span>
        </button>

        {/* Navigation */}
        <nav className="space-y-1">
          <SidebarNavItem
            to="/dashboard"
            label="Home"
            icon={<Home size={16} />}
          />
          <SidebarNavItem
            to="/dashboard/create/ideas"
            label="Create"
            icon={<PenLine size={16} />}
          />
          <SidebarNavItem
            to="/dashboard/publish/queue"
            label="Publish"
            icon={<Calendar size={16} />}
            badge={
              <span className="text-xs text-neutral-400 font-medium">
                {queueCount}
              </span>
            }
          />
          <SidebarNavItem
            to="/dashboard/community/comments"
            label="Community"
            icon={<MessageSquare size={16} />}
          />
          <SidebarNavItem
            to="/dashboard/insights"
            label="Insights"
            icon={<BarChart2 size={16} />}
            badge={
              <span className="bg-[#FCE7F3] text-[#DB2777] text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                New
              </span>
            }
          />
        </nav>

        {/* Connected Channels Shortcuts */}
        <SidebarChannelList channels={channels} />
      </div>

      {/* Organization / User Info Footer */}
      <SidebarOrgInfo orgName={orgName} plan={orgPlan} />

      {/* Composer Modal triggered from + New button */}
      <PostComposer
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
      />
    </aside>
  );
};
