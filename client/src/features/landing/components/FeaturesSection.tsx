import React from 'react';
import { 
  CalendarDays, 
  Sparkles, 
  MessageCircle, 
  TrendingUp, 
  ShieldCheck, 
  FolderSync, 
  ArrowUpRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturesSection: React.FC = () => {
  const bentoItems = [
    {
      title: 'Visual Publishing Queue & Calendar',
      category: 'Publishing',
      description: 'Drag and drop your posts on a weekly or monthly grid. Customize channel-specific captions and optimize timeslots for peak audience activity.',
      icon: <CalendarDays className="w-6 h-6 text-[#FF1493]" />,
      colSpan: 'lg:col-span-8',
      accentColor: 'border-pink-200/80 bg-gradient-to-br from-white via-white to-pink-50/30',
      badge: 'Core Engine',
      stat: '10x Faster Scheduling',
    },
    {
      title: 'AI Content Co-Pilot',
      category: 'Ideation',
      description: 'Turn ideas into high-engagement captions, viral hooks, and relevant hashtags tailored for each network in seconds.',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      colSpan: 'lg:col-span-4',
      accentColor: 'border-purple-200/80 bg-gradient-to-br from-white via-white to-purple-50/30',
      badge: 'Built-in AI',
      stat: '50+ Prompt Templates',
    },
    {
      title: 'Unified Social Inbox',
      category: 'Community',
      description: 'Consolidate comments, replies, and brand mentions across YouTube, Instagram, X, and LinkedIn into one zero-clutter inbox.',
      icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
      colSpan: 'lg:col-span-4',
      accentColor: 'border-blue-200/80 bg-gradient-to-br from-white via-white to-blue-50/30',
      badge: 'Engagement',
      stat: '< 2 min Reply Time',
    },
    {
      title: 'Actionable Performance Insights',
      category: 'Analytics',
      description: 'Measure what actually moves the needle. Track engagement rate, follower momentum, best times to post, and export presentation-ready PDF reports.',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      colSpan: 'lg:col-span-4',
      accentColor: 'border-emerald-200/80 bg-gradient-to-br from-white via-white to-emerald-50/30',
      badge: 'Growth Intelligence',
      stat: '+34% Average Reach',
    },
    {
      title: 'Collaborative Team Approvals',
      category: 'Collaboration',
      description: 'Let team members and external freelancers draft posts while maintaining strict editorial approvals before any content goes live.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      colSpan: 'lg:col-span-4',
      accentColor: 'border-amber-200/80 bg-gradient-to-br from-white via-white to-amber-50/30',
      badge: 'Security & Trust',
      stat: 'Zero Accidental Posts',
    },
    {
      title: 'Cloud Media Storage & Creative Sync',
      category: 'Integrations',
      description: 'Seamlessly pull media from Google Drive, Dropbox, and Canva. Store high-res video assets ready for scheduled publishing.',
      icon: <FolderSync className="w-6 h-6 text-indigo-600" />,
      colSpan: 'lg:col-span-12',
      accentColor: 'border-neutral-200 bg-gradient-to-r from-neutral-50 via-white to-neutral-50',
      badge: 'Ecosystem',
      stat: 'Connect in 1 Click',
    },
  ];

  return (
    <section className="py-24 px-6 bg-white border-b border-[#E8E8E8]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 bg-[#FFF1F7] text-[#FF1493] text-xs font-semibold rounded-full mb-3 border border-[#FF1493]/20">
            Engineered For Growth
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] tracking-tight mb-4">
            Built from the ground up for modern social creators
          </h2>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            Say goodbye to endless browser tabs, disconnected spreadsheets, and missed posting deadlines.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {bentoItems.map((item, idx) => (
            <div
              key={idx}
              className={`${item.colSpan} p-8 rounded-3xl border ${item.accentColor} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-white rounded-2xl border border-[#E8E8E8] shadow-xs group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 bg-white/80 rounded-full border border-[#E8E8E8] text-neutral-700">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0D0D0D] mb-2 group-hover:text-[#FF1493] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E8E8]/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-800">
                  {item.stat}
                </span>
                <Link
                  to="/register"
                  className="text-xs font-semibold text-[#FF1493] inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
