import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostsList } from '../components/comments/PostsList';
import { CommentsEmptyState } from '../components/comments/CommentsEmptyState';
import { CommentsListView } from '../components/comments/CommentsListView';
import { CommentThread } from '../components/comments/CommentThread';
import { ConnectChannelModal } from '@/features/channels/components/ConnectChannelModal';
import {
  useGetCommentsQuery,
  useReplyCommentMutation,
  useMarkCommentAsReadMutation,
} from '../services/communityApi';
import { useGetChannelsQuery } from '@/features/channels/services/channelsApi';
import { useGetPostsQuery } from '@/features/publish/services/postsApi';
import {
  LayoutGrid,
  Bookmark,
  PenLine,
  Columns2,
  List as ListIcon,
  ChevronDown,
  SlidersHorizontal,
  HelpCircle,
  Check,
} from 'lucide-react';

export const CommentsPage: React.FC = () => {
  const [view, setView] = useState<'by_post' | 'list'>('by_post');
  const [selectedPostId, setSelectedPostId] = useState<string | undefined>();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // Filters
  const [selectedChannelId, setSelectedChannelId] = useState<string | undefined>();
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'unreplied'>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Backend queries
  const { data: channels = [] } = useGetChannelsQuery();
  const { data: sentPosts = [] } = useGetPostsQuery({
    status: 'sent',
    channelId: selectedChannelId,
  });

  const { data: allComments = [] } = useGetCommentsQuery({
    channelId: selectedChannelId,
    postId: selectedPostId,
    isRead: filterType === 'unread' ? false : undefined,
  });

  // Mutations
  const [replyComment] = useReplyCommentMutation();
  const [markCommentAsRead] = useMarkCommentAsReadMutation();

  const activeChannelName = selectedChannelId
    ? channels.find((c: any) => (c._id || c.id) === selectedChannelId)?.profile?.name ||
      'Channel'
    : 'All Channels';

  const handleConnectChannel = (_platform?: string) => {
    setIsConnectModalOpen(true);
  };

  const handleReply = async (commentId: string, text: string) => {
    try {
      await replyComment({ commentId, text }).unwrap();
    } catch {
      // Ignored
    }
  };

  const handleMarkRead = async (commentId: string) => {
    try {
      await markCommentAsRead(commentId).unwrap();
    } catch {
      // Ignored
    }
  };

  // Find selected post data if any
  const selectedPost = selectedPostId
    ? sentPosts.find((p) => (p._id || p.id) === selectedPostId)
    : undefined;

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

        {/* Right: Feedback Button, View Switcher */}
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
              onClick={() => setView('by_post')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                view === 'by_post'
                  ? 'bg-[#E5F8D0] text-[#166534]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Columns2 size={13} className="stroke-[2.2]" />
              <span>By post</span>
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                view === 'list'
                  ? 'bg-[#E5F8D0] text-[#166534]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <ListIcon size={14} className="stroke-[2]" />
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Subnav Tabs & Filters Row */}
      <div className="border-b border-neutral-200 mb-0 flex items-center justify-between">
        {/* Left Subnav Tabs */}
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard/community/comments"
            className="border-b-2 border-neutral-900 text-neutral-900 font-bold pb-2.5 px-0.5 flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <span>Comments</span>
          </Link>

          <Link
            to="/dashboard/community/mentions"
            className="text-neutral-500 hover:text-neutral-900 font-medium pb-2.5 px-0.5 flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
          >
            <span>Mentions</span>
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
                setIsFilterDropdownOpen(false);
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

          {/* Filter Type Dropdown (All, Unread, Unreplied) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsFilterDropdownOpen((prev) => !prev);
                setIsChannelDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <span>{filterType === 'all' ? 'All' : filterType === 'unread' ? 'Unread' : 'Unreplied'}</span>
              <ChevronDown size={12} className="text-neutral-400" />
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute right-0 top-7 w-36 bg-white border border-neutral-200 rounded-xl shadow-lg p-1.5 z-40 space-y-0.5">
                {[
                  { label: 'All Comments', val: 'all' as const },
                  { label: 'Unread', val: 'unread' as const },
                  { label: 'Unreplied', val: 'unreplied' as const },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => {
                      setFilterType(item.val);
                      setIsFilterDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>{item.label}</span>
                    {filterType === item.val && <Check size={14} className="text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter button */}
          <button
            type="button"
            title="Filter Settings"
            className="p-1 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* 3. Main Split View or List View */}
      {view === 'by_post' ? (
        <div className="flex items-stretch border-b border-neutral-200 min-h-[calc(100vh-10rem)]">
          {/* Left Posts Column */}
          <PostsList
            posts={sentPosts}
            selectedPostId={selectedPostId}
            onSelectPost={setSelectedPostId}
          />

          {/* Right Main Canvas */}
          <div className="flex-1 min-w-0 p-6 sm:p-10 flex flex-col items-center justify-center bg-white overflow-y-auto">
            {!selectedPostId || allComments.length === 0 ? (
              <CommentsEmptyState onConnectChannel={handleConnectChannel} />
            ) : (
              <div className="w-full max-w-2xl mx-auto space-y-4 py-4">
                {selectedPost && (
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-6">
                    <p className="text-xs font-semibold text-neutral-800 line-clamp-2">
                      {selectedPost.content}
                    </p>
                  </div>
                )}
                {allComments.map((comment) => (
                  <CommentThread
                    key={comment._id || comment.id}
                    comment={comment}
                    onReply={handleReply}
                    onMarkRead={handleMarkRead}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="pt-6">
          {allComments.length === 0 ? (
            <CommentsEmptyState onConnectChannel={handleConnectChannel} />
          ) : (
            <div className="max-w-3xl mx-auto space-y-4 py-4">
              <CommentsListView comments={allComments} onMarkRead={handleMarkRead} />
            </div>
          )}
        </div>
      )}

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
