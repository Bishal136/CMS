import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IdeasBoard } from '../components/ideas/IdeasBoard';
import { IdeasGalleryView } from '../components/ideas/IdeasGalleryView';
import { GenerateIdeasModal } from '../components/ideas/GenerateIdeasModal';
import { NewIdeaModal } from '../components/ideas/NewIdeaModal';
import { PostComposer } from '@/features/publish/components/composer/PostComposer';
import { useGetIdeasQuery } from '../services/ideasApi';
import {
  Lightbulb,
  Bookmark,
  Sparkles,
  Plus,
  Tag,
  ChevronDown,
  Columns,
  LayoutGrid,
  PenLine,
} from 'lucide-react';

export const IdeasPage: React.FC = () => {
  const location = useLocation();
  const [view, setView] = useState<'board' | 'gallery'>('board');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);
  const [selectedColumnForNewIdea, setSelectedColumnForNewIdea] = useState('unassigned');

  // Post composer state for "Create Post from Idea"
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerContent, setComposerContent] = useState('');

  const { data: responseData } = useGetIdeasQuery();
  const rawIdeas = responseData?.data?.ideas || [];

  const handleOpenCreateModal = (defaultStatus = 'unassigned') => {
    setSelectedColumnForNewIdea(defaultStatus);
    setIsNewIdeaModalOpen(true);
  };

  const handleOpenComposerWithIdea = (content: string) => {
    setComposerContent(content);
    setIsComposerOpen(true);
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)] flex flex-col">
      {/* 1. Top Header Row: Lightbulb + Create + Bookmark | Feedback + Generate Ideas + New Idea */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-1">
        {/* Left: Title & Icons */}
        <div className="flex items-center gap-2.5">
          <Lightbulb size={22} className="text-neutral-900 stroke-[2]" />
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Create</h1>
          <Bookmark size={17} className="text-neutral-400 stroke-[2] cursor-pointer hover:text-neutral-700 transition-colors" />
        </div>

        {/* Right: Actions */}
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
            onClick={() => setIsAiModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-neutral-50 active:bg-neutral-100 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
          >
            <Sparkles size={14} className="text-neutral-600" />
            <span>Generate Ideas</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenCreateModal('unassigned')}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-neutral-50 active:bg-neutral-100 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus size={14} className="stroke-[2.5]" />
            <span>New Idea</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs & Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 mb-6 gap-3">
        {/* Tabs: Ideas | Templates | Feeds */}
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard/create/ideas"
            className={`text-xs sm:text-sm font-semibold pb-2.5 transition-colors relative ${
              location.pathname.includes('/ideas') || location.pathname === '/dashboard/create'
                ? 'text-neutral-900 border-b-2 border-black'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Ideas
          </Link>
          <Link
            to="/dashboard/create/templates"
            className={`text-xs sm:text-sm font-semibold pb-2.5 transition-colors relative ${
              location.pathname.includes('/templates')
                ? 'text-neutral-900 border-b-2 border-black'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Templates
          </Link>
          <Link
            to="/dashboard/create/feeds"
            className={`text-xs sm:text-sm font-semibold pb-2.5 transition-colors relative ${
              location.pathname.includes('/feeds')
                ? 'text-neutral-900 border-b-2 border-black'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Feeds
          </Link>
        </div>

        {/* Right Controls: Tags dropdown & Board / Gallery Toggle */}
        <div className="flex items-center gap-3 pb-2">
          {/* Tags dropdown button */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 px-2 py-1 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <Tag size={13} className="text-neutral-500" />
            <span>Tags</span>
            <ChevronDown size={13} className="text-neutral-400" />
          </button>

          {/* View Switcher Pill (Board active with soft green tint matching screenshot) */}
          <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
            <button
              type="button"
              onClick={() => setView('board')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                view === 'board'
                  ? 'bg-[#E5F8D0] text-[#166534] border border-[#86EFAC]/60 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Columns size={13} />
              <span>Board</span>
            </button>
            <button
              type="button"
              onClick={() => setView('gallery')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                view === 'gallery'
                  ? 'bg-white text-neutral-900 border border-neutral-200 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid size={13} />
              <span>Gallery</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Content: Board View or Gallery View */}
      <div className="flex-1 min-w-0">
        {view === 'board' ? (
          <IdeasBoard
            onOpenCreateModal={handleOpenCreateModal}
            onOpenComposerWithIdea={handleOpenComposerWithIdea}
          />
        ) : (
          <IdeasGalleryView
            ideas={rawIdeas}
            onSelectIdea={(idea) => handleOpenComposerWithIdea(idea.content || idea.title)}
          />
        )}
      </div>

      {/* 4. Modals */}
      <GenerateIdeasModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <NewIdeaModal
        isOpen={isNewIdeaModalOpen}
        onClose={() => setIsNewIdeaModalOpen(false)}
        defaultStatus={selectedColumnForNewIdea}
      />

      <PostComposer
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setComposerContent('');
        }}
        initialContent={composerContent}
      />

      {/* 5. Floating Help Button */}
      <button
        type="button"
        title="Help & Support"
        onClick={() => alert('CMSFlow Ideas & Content Planning Guide')}
        className="fixed bottom-6 right-6 w-9 h-9 rounded-full bg-[#1E88E5] text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform active:scale-95 cursor-pointer z-40"
      >
        <span className="text-sm font-bold leading-none select-none">?</span>
      </button>
    </div>
  );
};
