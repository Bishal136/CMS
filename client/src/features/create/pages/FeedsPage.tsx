import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FeedArticle } from '../components/feeds/FeedArticle';
import { NewFeedModal } from '../components/feeds/NewFeedModal';
import { PostComposer } from '@/features/publish/components/composer/PostComposer';
import {
  useGetFeedsQuery,
  useGetFeedItemsQuery,
  useRefreshFeedMutation,
} from '../services/feedsApi';
import { IFeedItem } from '../types/feed.types';
import {
  Lightbulb,
  Bookmark,
  Plus,
  ChevronDown,
  PenLine,
  RefreshCw,
  Newspaper,
  Settings,
} from 'lucide-react';

const FALLBACK_BBC_ARTICLES: IFeedItem[] = [
  {
    id: 'bbc-1',
    feedId: 'bbc',
    title: 'Watch: Drop in small boats crossings forces smugglers to adapt',
    description:
      'A BBC investigation has found smuggling gangs are running low on small boats, forcing rival gangs to work together and load more migrants on larger boats.',
    imageUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    source: 'BBC News',
    sourceUrl: 'https://www.bbc.com/news',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'bbc-2',
    feedId: 'bbc',
    title: 'Ranking the most game-changing transfers in Premier League history',
    description:
      'Some transfers take time to bed in, others prove instant game-changers - here are the top 10 signings of the Premier League era that moved the needle.',
    imageUrl:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    source: 'BBC News',
    sourceUrl: 'https://www.bbc.com/sport/football',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'bbc-3',
    feedId: 'bbc',
    title: "UN warns of 'supersized' El Niño as countries prepare for impact",
    description:
      'The WMO has warned that the natural weather phenomenon could bring disruption to global economies.',
    imageUrl:
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
    source: 'BBC News',
    sourceUrl: 'https://www.bbc.com/news',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

export const FeedsPage: React.FC = () => {
  const location = useLocation();
  const [selectedFeedId, setSelectedFeedId] = useState<string>('all');
  const [isNewFeedModalOpen, setIsNewFeedModalOpen] = useState(false);

  // Composer modal state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerContent, setComposerContent] = useState('');

  const { data: feedsData } = useGetFeedsQuery();
  const { data: itemsData } = useGetFeedItemsQuery(
    selectedFeedId !== 'all' ? { feedId: selectedFeedId } : undefined
  );
  const [refreshFeed, { isLoading: isRefreshing }] = useRefreshFeedMutation();

  const feeds = feedsData?.data || [];
  const rawArticles = itemsData?.data || [];

  const articles: IFeedItem[] =
    rawArticles.length > 0
      ? rawArticles.map((art: any) => ({ ...art, id: art._id || art.id }))
      : FALLBACK_BBC_ARTICLES;

  const handleShareArticle = (art: IFeedItem) => {
    const text = `${art.title}\n\n${art.description || ''}\n\n${art.sourceUrl || art.url || ''}`.trim();
    setComposerContent(text);
    setIsComposerOpen(true);
  };

  const handleRefresh = async () => {
    try {
      await refreshFeed(selectedFeedId !== 'all' ? { feedId: selectedFeedId } : undefined).unwrap();
    } catch {
      // Handled by global toast
    }
  };

  const activeFeed = feeds.find((f) => (f._id || f.id) === selectedFeedId);
  const feedHeaderTitle = selectedFeedId === 'all' ? 'All Feeds' : activeFeed?.name || 'Feed';

  return (
    <div className="relative min-h-[calc(100vh-100px)] pb-16 flex flex-col select-none">
      {/* 1. Header: Lightbulb + Create + Bookmark | Feedback + New Feed */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-1">
        <div className="flex items-center gap-2.5">
          <Lightbulb size={22} className="text-neutral-900 stroke-[2]" />
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Create</h1>
          <Bookmark
            size={17}
            className="text-neutral-400 stroke-[2] cursor-pointer hover:text-neutral-700 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            title="Feedback & notes"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            <PenLine size={16} />
          </button>

          <button
            type="button"
            onClick={() => setIsNewFeedModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-neutral-50 active:bg-neutral-100 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus size={14} className="stroke-[2.5]" />
            <span>New Feed</span>
            <ChevronDown size={13} className="text-neutral-500" />
          </button>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-neutral-200 mb-5">
        <Link
          to="/dashboard/create/ideas"
          className={`text-xs sm:text-sm font-semibold pb-2.5 transition-colors ${
            location.pathname.includes('/ideas')
              ? 'text-neutral-900 border-b-2 border-black'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Ideas
        </Link>
        <Link
          to="/dashboard/create/templates"
          className={`text-xs sm:text-sm font-semibold pb-2.5 transition-colors ${
            location.pathname.includes('/templates')
              ? 'text-neutral-900 border-b-2 border-black'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Templates
        </Link>
        <Link
          to="/dashboard/create/feeds"
          className="text-xs sm:text-sm font-semibold pb-2.5 transition-colors text-neutral-900 border-b-2 border-black"
        >
          Feeds
        </Link>
      </div>

      {/* 3. Feed Source Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {/* All Feeds Pill */}
        <button
          type="button"
          onClick={() => setSelectedFeedId('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            selectedFeedId === 'all'
              ? 'bg-[#E5F8D0] text-[#166534] border border-[#86EFAC]/60 shadow-2xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          All Feeds
        </button>

        {/* BBC News Pill / Feed Pills */}
        {feeds.length > 0 ? (
          feeds.map((feed) => {
            const feedId = feed._id || feed.id;
            const isSelected = selectedFeedId === feedId;
            return (
              <button
                key={feedId}
                type="button"
                onClick={() => setSelectedFeedId(feedId)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#E5F8D0] text-[#166534] border border-[#86EFAC]/60 shadow-2xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <Settings size={12} className="text-neutral-400" />
                <span>{feed.name}</span>
              </button>
            );
          })
        ) : (
          <button
            type="button"
            onClick={() => setSelectedFeedId('bbc')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600 hover:bg-neutral-200 cursor-pointer"
          >
            <Settings size={12} className="text-neutral-400" />
            <span>BBC News</span>
          </button>
        )}
      </div>

      {/* 4. Feed Section: Header + Articles List */}
      <div className="max-w-4xl">
        {/* Feed Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0 shadow-2xs">
            <Newspaper size={16} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-neutral-900 leading-tight">
              {feedHeaderTitle}
            </h2>
            <p className="text-xs text-neutral-500 font-medium flex items-center gap-1.5 mt-0.5">
              <span>Last refreshed about 5 hours ago</span>
              <button
                type="button"
                onClick={handleRefresh}
                title="Refresh feed"
                disabled={isRefreshing}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer transition-transform active:rotate-180"
              >
                <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              </button>
            </p>
          </div>
        </div>

        {/* Feed Articles List */}
        <div className="space-y-4">
          {articles.map((article) => (
            <FeedArticle
              key={article.id || article._id}
              article={article}
              onShare={handleShareArticle}
            />
          ))}
        </div>
      </div>

      {/* 5. Modals */}
      <NewFeedModal
        isOpen={isNewFeedModalOpen}
        onClose={() => setIsNewFeedModalOpen(false)}
      />

      <PostComposer
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setComposerContent('');
        }}
        initialContent={composerContent}
      />

      {/* 6. Floating Help Button */}
      <button
        type="button"
        title="Help & Support"
        onClick={() => alert('CMSFlow Feeds & Content Ingestion Guide')}
        className="fixed bottom-6 right-6 w-9 h-9 rounded-full bg-[#1E88E5] text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform active:scale-95 cursor-pointer z-40"
      >
        <span className="text-sm font-bold leading-none select-none">?</span>
      </button>
    </div>
  );
};
