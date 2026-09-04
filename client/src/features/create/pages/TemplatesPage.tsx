import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TemplateCard } from '../components/templates/TemplateCard';
import { NewTemplateModal } from '../components/templates/NewTemplateModal';
import { PostComposer } from '@/features/publish/components/composer/PostComposer';
import { useGetTemplatesQuery } from '../services/templatesApi';
import { ITemplate } from '../types/template.types';
import {
  Lightbulb,
  Bookmark,
  Plus,
  Search,
  SlidersHorizontal,
  PenLine,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const FALLBACK_CREATOR_CAMP_TEMPLATES: ITemplate[] = [
  {
    id: 'tpl-cc-1',
    title: 'The first time you felt out of place',
    content:
      "Many of us have been in a room, a meeting, or a group chat where everyone else seemed to know exactly what they were doing. This one's about what that was like, and how you found your footing.",
    category: 'Creator Camp Consistency: W...',
    emoji: '🤔',
  },
  {
    id: 'tpl-cc-2',
    title: 'Something you learned from an early boss or mentor',
    content:
      'Think back to a first boss, a manager, or a mentor from early in your journey. What was the single most valuable lesson they passed down?',
    category: 'Creator Camp Consistency: W...',
    emoji: '🧭',
  },
  {
    id: 'tpl-cc-3',
    title: 'Someone who gave you a chance',
    content:
      "There's always that someone in our story who said yes before they had proof. Here is a tribute to the person who opened a door for me.",
    category: 'Creator Camp Consistency: W...',
    emoji: '🙏',
  },
  {
    id: 'tpl-cc-4',
    title: 'Something you learned from a past job',
    content:
      "If you've changed jobs or careers, some of your best skills made the leap with you. Here is an unexpected insight I learned from an earlier role.",
    category: 'Creator Camp Consistency: W...',
    emoji: '🎒',
  },
  {
    id: 'tpl-cc-5',
    title: "The lucky break you're grateful for",
    content:
      "Was there a moment when good timing or someone else's decision changed everything? Sharing the lucky break that made a big difference.",
    category: 'Creator Camp Consistency: W...',
    emoji: '☘️',
  },
];

const FALLBACK_TIP_TEMPLATES: ITemplate[] = [
  {
    id: 'tpl-tip-1',
    title: 'Share a metric milestone',
    content:
      'Hit a key milestone today: [Metric] reached [Number]! 📊 Here are 3 tactical takeaways that got us here.',
    category: 'Tip',
    emoji: '📊',
  },
  {
    id: 'tpl-tip-2',
    title: 'Repurpose your best performing insight',
    content:
      "Don't create from scratch every week. ♻️ Take your #1 performing post from last month and expand on bullet #2 into a full breakdown.",
    category: 'Tip',
    emoji: '♻️',
  },
  {
    id: 'tpl-tip-3',
    title: 'A quick 3-step checklist',
    content:
      'A simple 3-step checklist before hitting publish: 📝\n1. Is the hook clear?\n2. Is there value?\n3. Is the CTA conversational?',
    category: 'Tip',
    emoji: '📝',
  },
  {
    id: 'tpl-tip-4',
    title: 'The key rule you never break',
    content:
      'The #1 rule in my content creation routine: 🔑 Never publish when in a rush or frustrated. Always draft, step away, then refine.',
    category: 'Tip',
    emoji: '🔑',
  },
  {
    id: 'tpl-tip-5',
    title: 'A contrarian opinion in your industry',
    content:
      'Unpopular opinion in [Industry]: 💡 Everyone thinks [Common belief], but in reality [Surprising truth].',
    category: 'Tip',
    emoji: '💡',
  },
];

export const TemplatesPage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'discover' | 'personal'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Composer state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedTemplateContent, setSelectedTemplateContent] = useState('');

  const { data: responseData } = useGetTemplatesQuery(
    searchQuery.trim() ? { search: searchQuery.trim() } : undefined
  );

  const allTemplates: ITemplate[] =
    responseData?.data && responseData.data.length > 0
      ? responseData.data.map((t: any) => ({ ...t, id: t._id || t.id }))
      : [...FALLBACK_CREATOR_CAMP_TEMPLATES, ...FALLBACK_TIP_TEMPLATES];

  const personalTemplates = allTemplates.filter((t) => t.isPersonal);
  const discoverTemplates = allTemplates.filter((t) => !t.isPersonal);

  // Filtered lists
  const creatorCampTemplates = discoverTemplates.filter(
    (t) => t.category && t.category.toLowerCase().includes('creator camp')
  );
  const tipTemplates = discoverTemplates.filter(
    (t) => t.category && t.category.toLowerCase().includes('tip')
  );

  const displayCreatorCamp =
    creatorCampTemplates.length > 0 ? creatorCampTemplates : FALLBACK_CREATOR_CAMP_TEMPLATES;
  const displayTips = tipTemplates.length > 0 ? tipTemplates : FALLBACK_TIP_TEMPLATES;

  const handleSelectTemplate = (template: ITemplate) => {
    setSelectedTemplateContent(template.content || template.title);
    setIsComposerOpen(true);
  };

  const heroFeaturedTemplate = displayCreatorCamp[0] || FALLBACK_CREATOR_CAMP_TEMPLATES[0];

  return (
    <div className="relative min-h-[calc(100vh-100px)] pb-16 flex flex-col select-none">
      {/* 1. Header: Lightbulb + Create + Bookmark | Feedback + New Template */}
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
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-neutral-50 active:bg-neutral-100 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus size={14} className="stroke-[2.5]" />
            <span>New Template</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs & Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 mb-5 gap-3">
        {/* Tabs: Ideas | Templates | Feeds */}
        <div className="flex items-center gap-6">
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
            className="text-xs sm:text-sm font-semibold pb-2.5 transition-colors text-neutral-900 border-b-2 border-black"
          >
            Templates
          </Link>
          <Link
            to="/dashboard/create/feeds"
            className={`text-xs sm:text-sm font-semibold pb-2.5 transition-colors ${
              location.pathname.includes('/feeds')
                ? 'text-neutral-900 border-b-2 border-black'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Feeds
          </Link>
        </div>

        {/* Right Search & Filter controls */}
        <div className="flex items-center gap-2 pb-2">
          {isSearchOpen ? (
            <div className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1 rounded-lg border border-neutral-200 animate-in fade-in">
              <Search size={13} className="text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                autoFocus
                className="bg-transparent text-xs text-neutral-800 focus:outline-none w-36 sm:w-48"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="text-neutral-400 hover:text-neutral-700 text-xs px-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 px-2.5 py-1 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <Search size={13} className="text-neutral-500" />
              <span>Search</span>
            </button>
          )}

          {/* Filter dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-medium text-neutral-600 bg-transparent hover:bg-neutral-100 px-2.5 py-1 rounded-md border-0 focus:outline-none cursor-pointer appearance-none pr-6"
            >
              <option value="All">Filter: All</option>
              <option value="Creator Camp">Creator Camp</option>
              <option value="Tip">Tip</option>
              <option value="Personal">Personal</option>
            </select>
            <SlidersHorizontal
              size={12}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400"
            />
          </div>
        </div>
      </div>

      {/* 3. Sub-tabs: Discover 159 | Personal 0 */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('discover')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'discover'
              ? 'bg-[#E5F8D0] text-[#166534] border border-[#86EFAC]/60 shadow-2xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          <span>Discover</span>
          <span className="text-[10px] bg-white/80 px-1.5 py-0.2 rounded-full font-bold">
            159
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('personal')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'personal'
              ? 'bg-[#E5F8D0] text-[#166534] border border-[#86EFAC]/60 shadow-2xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          <span>Personal</span>
          <span className="text-[10px] bg-neutral-200/80 text-neutral-600 px-1.5 py-0.2 rounded-full font-bold">
            {personalTemplates.length}
          </span>
        </button>
      </div>

      {/* 4. Tab Content */}
      {activeTab === 'discover' ? (
        <div className="space-y-8">
          {/* Section: Creator Camp Consistency: Week 1 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-neutral-900 tracking-tight">
                Creator Camp Consistency: Week 1
              </h2>
              <button
                type="button"
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>See all</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Featured Hero Banner */}
            <div className="bg-[#EAF4FF] border border-[#D5E8FD] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              {/* Left Side: Headline & CTA */}
              <div className="max-w-md">
                <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight leading-none">
                  CREATOR
                  <br />
                  CAMP <span className="font-extrabold text-neutral-800">CONSISTENCY</span>
                </h3>

                <p className="text-xs font-semibold text-neutral-600 mt-3">
                  Week 1: Beginnings
                </p>

                <p className="text-xs text-neutral-900 font-medium mt-1 inline-flex items-center gap-1">
                  Learn more about{' '}
                  <span className="underline font-semibold cursor-pointer">
                    Creator Camp
                  </span>
                  <ExternalLink size={11} className="inline" />.
                </p>

                <div className="flex items-center gap-2.5 mt-5">
                  <button
                    type="button"
                    onClick={() => handleSelectTemplate(heroFeaturedTemplate)}
                    className="bg-[#C8F560] hover:bg-[#bdf04d] active:scale-[0.99] text-neutral-900 font-bold text-xs py-2 px-4 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    Use Prompt
                  </button>

                  <button
                    type="button"
                    className="bg-white hover:bg-neutral-50 active:scale-[0.99] border border-neutral-300 text-neutral-800 font-semibold text-xs py-2 px-4 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    See All
                  </button>
                </div>
              </div>

              {/* Right Side: Floating Preview Card */}
              <div
                onClick={() => handleSelectTemplate(heroFeaturedTemplate)}
                className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm max-w-xs sm:max-w-sm w-full cursor-pointer hover:shadow-md transition-shadow select-none"
              >
                <div className="text-2xl select-none mb-2">🤔</div>
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug mb-1.5">
                  {heroFeaturedTemplate.title}
                </h4>
                <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                  {heroFeaturedTemplate.content}
                </p>
              </div>
            </div>

            {/* 5-Column Grid of Creator Camp Templates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {displayCreatorCamp.slice(0, 5).map((t) => (
                <TemplateCard key={t.id} template={t} onSelect={handleSelectTemplate} />
              ))}
            </div>
          </div>

          {/* Section: Tip */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-neutral-900 tracking-tight">Tip</h2>
              <button
                type="button"
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>See all</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* 5-Column Grid of Tip Templates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {displayTips.slice(0, 5).map((t) => (
                <TemplateCard key={t.id} template={t} onSelect={handleSelectTemplate} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Personal Templates View */
        <div>
          {personalTemplates.length === 0 ? (
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-3 text-neutral-600">
                <Sparkles size={20} />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">
                No personal templates yet
              </h3>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                Save your favorite writing frameworks, prompt structures, or recurring outlines.
              </p>
              <button
                type="button"
                onClick={() => setIsNewModalOpen(true)}
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-2 px-4 rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                + Create First Template
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {personalTemplates.map((t) => (
                <TemplateCard key={t.id} template={t} onSelect={handleSelectTemplate} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. Modals */}
      <NewTemplateModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />

      <PostComposer
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setSelectedTemplateContent('');
        }}
        initialContent={selectedTemplateContent}
      />

      {/* 6. Floating Help Button */}
      <button
        type="button"
        title="Help & Support"
        onClick={() => alert('CMSFlow Templates & Consistency Camp Guide')}
        className="fixed bottom-6 right-6 w-9 h-9 rounded-full bg-[#1E88E5] text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform active:scale-95 cursor-pointer z-40"
      >
        <span className="text-sm font-bold leading-none select-none">?</span>
      </button>
    </div>
  );
};
