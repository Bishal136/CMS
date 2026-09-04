import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  MessageSquare, 
  BarChart3, 
  Users, 
  CheckCircle, 
  Clock, 
  Send, 
  Eye, 
  ThumbsUp, 
  Share2, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

type TShowcaseTab = 'publish' | 'ideas' | 'inbox' | 'analytics' | 'team';

export const FeatureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TShowcaseTab>('publish');

  const tabs: { id: TShowcaseTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'publish', label: 'Plan & Publish', icon: <Calendar className="w-4 h-4" /> },
    { id: 'ideas', label: 'Ideas & AI Studio', icon: <Sparkles className="w-4 h-4" />, badge: 'AI' },
    { id: 'inbox', label: 'Community Inbox', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics & Growth', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'team', label: 'Team Approvals', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white via-neutral-50/50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 bg-[#FFF1F7] text-[#FF1493] text-xs font-semibold rounded-full mb-3 border border-[#FF1493]/20">
            Interactive Product Tour
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D0D0D] tracking-tight mb-4">
            Everything your social team needs to win
          </h2>
          <p className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed">
            Switch tabs below to see how CMSFlow replaces fragmented tools with one clean, unified workspace.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#FF1493] text-white shadow-md shadow-[#FF1493]/25 scale-102'
                    : 'bg-white border border-[#E8E8E8] text-[#6B6B6B] hover:text-[#0D0D0D] hover:border-neutral-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#FFF1F7] text-[#FF1493]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="bg-white border border-[#E8E8E8] rounded-3xl p-6 sm:p-10 shadow-xl shadow-neutral-200/50">
          {/* TAB 1: Plan & Publish */}
          {activeTab === 'publish' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-pink-50 text-[#FF1493] text-xs font-semibold">
                  <span>Smart Scheduling</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] leading-snug">
                  Publish to YouTube, Instagram, X & LinkedIn in one go
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  Craft a single master post and let CMSFlow tailor formatting, character limits, and media specs for each specific network automatically.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Custom queue schedules per channel</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Multi-channel preview before scheduling</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">First-comment automation & hashtag groups</span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF1493] hover:text-[#D90072] pt-2 group"
                >
                  <span>Try the Visual Composer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mockup Preview */}
              <div className="lg:col-span-7 bg-neutral-50 rounded-2xl p-5 border border-[#E8E8E8]">
                <div className="bg-white rounded-xl border border-[#E8E8E8] shadow-sm overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-[#E8E8E8] flex items-center justify-between bg-neutral-50/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="text-xs font-semibold text-neutral-600 ml-2">Post Composer & Queue</span>
                    </div>
                    <span className="text-xs bg-[#FFF1F7] text-[#FF1493] font-medium px-2.5 py-0.5 rounded-full">
                      Auto-Schedule Active
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Active Channels */}
                    <div className="flex items-center gap-2 pb-3 border-b border-[#E8E8E8]">
                      <span className="text-xs text-neutral-500 font-medium">Posting to:</span>
                      <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-md flex items-center gap-1">
                        YouTube
                      </span>
                      <span className="px-2 py-1 bg-pink-50 text-pink-600 text-xs font-medium rounded-md flex items-center gap-1">
                        Instagram
                      </span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md flex items-center gap-1">
                        LinkedIn
                      </span>
                      <span className="px-2 py-1 bg-neutral-100 text-neutral-800 text-xs font-medium rounded-md flex items-center gap-1">
                        X
                      </span>
                    </div>

                    {/* Editor Box */}
                    <div className="p-4 bg-neutral-50/60 rounded-lg border border-[#E8E8E8] space-y-2">
                      <p className="text-sm text-neutral-800">
                        🚀 Announcing our major release! Discover the all-new unified queue and AI-powered ideas board.
                      </p>
                      <p className="text-xs text-[#FF1493]">#ProductLaunch #GrowthMarketing #SocialStrategy</p>
                    </div>

                    {/* Schedule Time Slot */}
                    <div className="flex items-center justify-between p-3 bg-[#FFF1F7]/60 rounded-lg border border-pink-100">
                      <div className="flex items-center gap-2 text-xs text-neutral-700">
                        <Clock className="w-4 h-4 text-[#FF1493]" />
                        <span>Recommended slot: <strong>Tomorrow at 09:30 AM (Peak Reach)</strong></span>
                      </div>
                      <span className="px-3 py-1.5 bg-[#FF1493] text-white text-xs font-semibold rounded-md shadow-xs">
                        Add to Queue
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Ideas & AI Studio */}
          {activeTab === 'ideas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-50 text-purple-600 text-xs font-semibold">
                  <span>AI-Powered Ideation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] leading-snug">
                  Never stare at a blank screen again
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  Store sparks of inspiration on a visual Kanban board, pull fresh content from your RSS feeds, and generate high-converting hooks with our built-in AI copilot.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Kanban idea boards with custom status columns</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">1-click AI caption generation & tone switcher</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Discoverable template library for viral hooks</span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF1493] hover:text-[#D90072] pt-2 group"
                >
                  <span>Explore Ideas & Templates</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mockup Preview */}
              <div className="lg:col-span-7 bg-neutral-50 rounded-2xl p-5 border border-[#E8E8E8]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">💡 Fresh Ideas (4)</span>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg border border-[#E8E8E8] text-xs space-y-2">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-semibold">Video Hook</span>
                      <p className="font-semibold text-neutral-800">"5 tools we stopped paying for in 2026"</p>
                      <p className="text-neutral-500 text-[11px]">Breakdown of budget savings</p>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg border border-[#E8E8E8] text-xs space-y-2">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-semibold">Case Study</span>
                      <p className="font-semibold text-neutral-800">How Acme grew to 50k subscribers</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">✨ AI Generator</span>
                    </div>
                    <div className="p-3 bg-[#FFF1F7]/70 rounded-lg border border-pink-100 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF1493]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Suggestion:</span>
                      </div>
                      <p className="text-xs text-neutral-800 italic">
                        "Most creators overcomplicate scheduling. Here is the exact 15-minute weekly workflow we use..."
                      </p>
                      <button className="w-full py-1.5 bg-[#FF1493] text-white text-[11px] font-semibold rounded shadow-xs">
                        Use as Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Community Inbox */}
          {activeTab === 'inbox' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-semibold">
                  <span>Unified Engagement</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] leading-snug">
                  Reply to every comment in a single streamlined inbox
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  Turn social comments into loyal community members. Reply to YouTube comments, Instagram threads, and LinkedIn mentions without switching browser windows.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Real-time comment sync across all channels</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Pre-saved canned replies for common questions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Assign comments to specific team members</span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF1493] hover:text-[#D90072] pt-2 group"
                >
                  <span>See the Inbox in Action</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mockup Preview */}
              <div className="lg:col-span-7 bg-neutral-50 rounded-2xl p-5 border border-[#E8E8E8]">
                <div className="bg-white rounded-xl border border-[#E8E8E8] shadow-sm p-4 space-y-4">
                  <div className="p-3 bg-neutral-50/80 rounded-lg border border-[#E8E8E8] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">
                          YT
                        </div>
                        <span className="text-xs font-bold text-neutral-800">Sarah Jenkins</span>
                        <span className="text-[10px] text-neutral-400">5m ago</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                        Unanswered
                      </span>
                    </div>
                    <p className="text-xs text-neutral-700">
                      "Does the Essentials plan include multi-channel queueing? Really loving the UI!"
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <input 
                        type="text" 
                        readOnly 
                        value="Yes Sarah! All plans include visual multi-channel queueing." 
                        className="flex-1 bg-white border border-[#E8E8E8] rounded px-3 py-1 text-xs text-neutral-700" 
                      />
                      <button className="px-3 py-1 bg-[#FF1493] text-white text-xs font-semibold rounded flex items-center gap-1 shadow-xs">
                        <Send className="w-3 h-3" />
                        Reply
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50/40 rounded-lg border border-[#E8E8E8] space-y-1 opacity-80">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-[10px] font-bold">
                          IG
                        </div>
                        <span className="text-xs font-bold text-neutral-800">Marco Rossi</span>
                        <span className="text-[10px] text-neutral-400">1h ago</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-medium">
                        Replied
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600">"This tip saved our agency hours this week. Thank you!"</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Analytics & Insights */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-semibold">
                  <span>Data-Driven Growth</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] leading-snug">
                  Know exactly what content drives real business
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  Track engagement rate, audience impressions, follower momentum, and export beautiful PDF/CSV reports to share with clients or stakeholders.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Aggregated cross-network engagement stats</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Top posts leaderboard and best time to post</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Instant one-click client report exports</span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF1493] hover:text-[#D90072] pt-2 group"
                >
                  <span>View Sample Report</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mockup Preview */}
              <div className="lg:col-span-7 bg-neutral-50 rounded-2xl p-5 border border-[#E8E8E8]">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white p-3.5 rounded-xl border border-[#E8E8E8] shadow-xs">
                    <span className="text-[11px] text-neutral-500 font-medium">Total Reach</span>
                    <p className="text-xl font-bold text-neutral-900 mt-1">482.4K</p>
                    <span className="text-[10px] text-green-600 font-semibold">↑ +24.8% this month</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#E8E8E8] shadow-xs">
                    <span className="text-[11px] text-neutral-500 font-medium">Engagement Rate</span>
                    <p className="text-xl font-bold text-neutral-900 mt-1">5.82%</p>
                    <span className="text-[10px] text-green-600 font-semibold">↑ +1.2% industry avg</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#E8E8E8] shadow-xs">
                    <span className="text-[11px] text-neutral-500 font-medium">New Followers</span>
                    <p className="text-xl font-bold text-neutral-900 mt-1">+8,420</p>
                    <span className="text-[10px] text-green-600 font-semibold">↑ Steady gain</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-neutral-800">Top Performing Post</span>
                    <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded font-semibold">
                      9.4% Eng.
                    </span>
                  </div>
                  <p className="text-xs text-neutral-700 mb-3">
                    "10 lessons learned scaling from $0 to $1M ARR without paid ads."
                  </p>
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> 142k views</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> 8.4k likes</span>
                    <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> 1.2k shares</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Team Approvals */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold">
                  <span>Collaborative Safeguards</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] leading-snug">
                  Safe collaboration without sharing account passwords
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  Give writers and interns permission to draft posts, while founders or marketing leads maintain review and approval control before anything goes live.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Granular role permissions: Admin, Publisher, Creator, Viewer</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Inline revision comments and edit suggestions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">Unlimited team accounts on the Team plan</span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF1493] hover:text-[#D90072] pt-2 group"
                >
                  <span>Build Your Team Workspace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mockup Preview */}
              <div className="lg:col-span-7 bg-neutral-50 rounded-2xl p-5 border border-[#E8E8E8]">
                <div className="bg-white rounded-xl border border-[#E8E8E8] shadow-sm p-4 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E8]">
                    <span className="text-xs font-bold text-neutral-800">Pending Review Queue (1)</span>
                    <span className="text-[11px] bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-medium">
                      Requires Approval
                    </span>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-lg border border-[#E8E8E8] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-800">Drafted by: Emily (Content Specialist)</span>
                      <span className="text-neutral-400">Scheduled for Friday</span>
                    </div>
                    <p className="text-xs text-neutral-700">
                      "Behind the scenes of our remote team retreat! What's your favorite company culture ritual?"
                    </p>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8E8E8]">
                      <button className="px-3 py-1 bg-white border border-[#E8E8E8] text-xs font-medium text-neutral-600 rounded hover:bg-neutral-100">
                        Request Changes
                      </button>
                      <button className="px-3 py-1 bg-[#22C55E] text-white text-xs font-semibold rounded shadow-xs hover:bg-green-600">
                        Approve & Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
