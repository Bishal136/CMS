import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DraftsList } from '../components/drafts/DraftsList';
import { PostComposer } from '../components/composer/PostComposer';
import { ConnectChannelModal } from '@/features/channels/components/ConnectChannelModal';
import {
  useGetPostsQuery,
  useGetPostCountsQuery,
  useDeletePostMutation,
} from '../services/postsApi';
import { useGetChannelsQuery } from '@/features/channels/services/channelsApi';
import { IPost } from '../types/post.types';
import {
  LayoutGrid,
  Bookmark,
  PenLine,
  List as ListIcon,
  Calendar as CalendarIcon,
  Plus,
  ChevronDown,
  Tag as TagIcon,
  Globe,
  Zap,
  HelpCircle,
  Check,
} from 'lucide-react';

export const DraftsPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<string | undefined>();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // Filters
  const [selectedChannelId, setSelectedChannelId] = useState<string | undefined>();
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [timezone, setTimezone] = useState('Dhaka');
  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] = useState(false);

  // Backend queries
  const { data: counts } = useGetPostCountsQuery();
  const { data: channels = [] } = useGetChannelsQuery();
  const { data: drafts = [] } = useGetPostsQuery({
    status: 'draft',
    channelId: selectedChannelId,
  });

  // Mutations
  const [deletePost] = useDeletePostMutation();

  const queueCount = counts?.queue ?? 0;
  const draftsCount = counts?.drafts ?? 0;
  const sentCount = counts?.sent ?? 0;

  const activeChannelName = selectedChannelId
    ? channels.find((c: any) => (c._id || c.id) === selectedChannelId)?.profile?.name ||
      'Channel'
    : 'All Channels';

  const handleDeleteDraft = async (id: string) => {
    try {
      await deletePost(id).unwrap();
    } catch {
      // Ignored
    }
  };

  const handleEditDraft = (draft: IPost) => {
    setEditingContent(draft.content);
    setIsComposerOpen(true);
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

        {/* Right: Feedback Button, View Switcher, New Post Button */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            title="Feedback & Suggestions"
            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            <PenLine size={16} />
          </button>

          {/* View Toggle Pill */}
          <div className="border border-neutral-200 bg-white rounded-lg p-0.5 flex items-center shadow-2xs">
            <button
              type="button"
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                view === 'list'
                  ? 'bg-[#E5F8D0] text-[#166534]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <ListIcon size={14} className="stroke-[2.2]" />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setView('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                view === 'calendar'
                  ? 'bg-[#E5F8D0] text-[#166534]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <CalendarIcon size={14} className="stroke-[2]" />
              <span>Calendar</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingContent(undefined);
              setIsComposerOpen(true);
            }}
            className="border border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-800 font-semibold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus size={14} className="stroke-[2.5]" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* 2. Subnav Tabs & Filters Row */}
      <div className="border-b border-neutral-200 mb-6 flex items-center justify-between">
        {/* Left Subnav Tabs */}
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard/publish/queue"
            className="text-neutral-500 hover:text-neutral-900 font-medium pb-2.5 px-0.5 flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
          >
            <span>Queue</span>
            <span className="bg-neutral-100 text-neutral-600 text-[11px] font-medium px-2 py-0.5 rounded-full">
              {queueCount}
            </span>
          </Link>

          <Link
            to="/dashboard/publish/drafts"
            className="border-b-2 border-neutral-900 text-neutral-900 font-bold pb-2.5 px-0.5 flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <span>Drafts</span>
            <span className="bg-neutral-100 text-neutral-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
              {draftsCount}
            </span>
          </Link>

          <Link
            to="/dashboard/publish/approvals"
            className="text-neutral-500 hover:text-neutral-900 font-medium pb-2.5 px-0.5 flex items-center gap-1 text-xs sm:text-sm transition-colors"
          >
            <span>Approvals</span>
            <span className="inline-flex items-center text-purple-600 text-xs font-semibold">
              <Zap size={13} className="fill-purple-600 text-purple-600 ml-0.5" />
            </span>
          </Link>

          <Link
            to="/dashboard/publish/sent"
            className="text-neutral-500 hover:text-neutral-900 font-medium pb-2.5 px-0.5 flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
          >
            <span>Sent</span>
            <span className="bg-neutral-100 text-neutral-600 text-[11px] font-medium px-2 py-0.5 rounded-full">
              {sentCount}
            </span>
          </Link>
        </div>

        {/* Right Filter Dropdowns */}
        <div className="flex items-center gap-4 pb-2.5">
          {/* Channels Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsChannelDropdownOpen((prev) => !prev);
                setIsTagDropdownOpen(false);
                setIsTimezoneDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <LayoutGrid size={13} className="text-neutral-500" />
              <span>Channels</span>
              <ChevronDown size={12} className="text-neutral-400" />
            </button>

            {isChannelDropdownOpen && (
              <div className="absolute right-0 top-7 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg p-1.5 z-40 space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedChannelId(undefined);
                    setIsChannelDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span>All Channels</span>
                  {!selectedChannelId && <Check size={14} className="text-emerald-600" />}
                </button>
                {channels.map((ch: any) => {
                  const chId = ch._id || ch.id;
                  const isSelected = selectedChannelId === chId;
                  return (
                    <button
                      key={chId}
                      type="button"
                      onClick={() => {
                        setSelectedChannelId(chId);
                        setIsChannelDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{ch.profile?.name || ch.platform}</span>
                      {isSelected && <Check size={14} className="text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tags Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsTagDropdownOpen((prev) => !prev);
                setIsChannelDropdownOpen(false);
                setIsTimezoneDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <TagIcon size={13} className="text-neutral-500" />
              <span>Tags</span>
              <ChevronDown size={12} className="text-neutral-400" />
            </button>

            {isTagDropdownOpen && (
              <div className="absolute right-0 top-7 w-40 bg-white border border-neutral-200 rounded-xl shadow-lg p-1.5 z-40 space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTag(undefined);
                    setIsTagDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span>All Tags</span>
                  {!selectedTag && <Check size={14} className="text-emerald-600" />}
                </button>
                {['Campaigns', 'Product', 'Updates', 'Social'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTag(tag);
                      setIsTagDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>{tag}</span>
                    {selectedTag === tag && <Check size={14} className="text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Timezone Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsTimezoneDropdownOpen((prev) => !prev);
                setIsChannelDropdownOpen(false);
                setIsTagDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <Globe size={13} className="text-neutral-500" />
              <span>{timezone}</span>
              <ChevronDown size={12} className="text-neutral-400" />
            </button>

            {isTimezoneDropdownOpen && (
              <div className="absolute right-0 top-7 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg p-1.5 z-40 space-y-0.5">
                {[
                  { label: 'Dhaka (GMT+6)', val: 'Dhaka' },
                  { label: 'UTC (GMT+0)', val: 'UTC' },
                  { label: 'London (GMT+1)', val: 'London' },
                  { label: 'New York (EST)', val: 'New York' },
                  { label: 'Tokyo (JST)', val: 'Tokyo' },
                ].map((tz) => (
                  <button
                    key={tz.val}
                    type="button"
                    onClick={() => {
                      setTimezone(tz.val);
                      setIsTimezoneDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>{tz.label}</span>
                    {timezone === tz.val && <Check size={14} className="text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Drafts Content */}
      <DraftsList
        drafts={drafts}
        onConnectChannel={() => setIsConnectModalOpen(true)}
        onInviteTeam={() => setIsConnectModalOpen(true)}
        onEditDraft={handleEditDraft}
        onScheduleDraft={handleEditDraft}
        onDeleteDraft={handleDeleteDraft}
      />

      {/* Floating Help Circle Button (Bottom Right) */}
      <button
        type="button"
        title="Help & Support"
        className="fixed bottom-6 right-6 w-9 h-9 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer z-40"
      >
        <HelpCircle size={18} />
      </button>

      {/* Modals */}
      <PostComposer
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setEditingContent(undefined);
        }}
        initialContent={editingContent}
      />

      <ConnectChannelModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </div>
  );
};
