import React from 'react';
import { Sparkles, ShoppingBag, Briefcase, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MadeForSection: React.FC = () => {
  const personas = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#FF1493]" />,
      title: 'Content Creators & Influencers',
      subtitle: 'Build your audience without burning out',
      description: 'Schedule a week of video hooks, carousels, and stories in one sitting. Repurpose winning YouTube Shorts directly to TikTok and Instagram Reels.',
      highlights: ['Visual post calendar', 'Trending hashtag groups', 'First-comment automation'],
      cta: 'Start as a Creator',
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-purple-600" />,
      title: 'Growing Brands & E-commerce',
      subtitle: 'Turn followers into loyal paying customers',
      description: 'Promote new arrivals and flash sales across all channels simultaneously. Drive high-intent traffic with automated destination links and Pinterest boards.',
      highlights: ['Multi-channel product drops', 'Engagement inbox for support', 'Conversion tracking'],
      cta: 'Grow Your Brand',
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      title: 'Marketing Agencies',
      subtitle: 'Manage 50+ client brands effortlessly',
      description: 'Switch between client workspaces in one click. Give junior copywriters drafting access while clients and account directors maintain approval sign-off.',
      highlights: ['Client approval workflows', 'White-labeled PDF reports', 'Separate channel groups'],
      cta: 'Explore Agency Plan',
    },
    {
      icon: <Rocket className="w-6 h-6 text-emerald-600" />,
      title: 'Founders & Solopreneurs',
      subtitle: 'Build in public with zero distraction',
      description: 'Establish authority on LinkedIn and X. Use the AI copilot to turn raw meeting notes or product milestones into engaging thought-leadership threads.',
      highlights: ['Thread composer', 'Kanban idea capture', 'Personal viral templates'],
      cta: 'Scale Your Authority',
    },
  ];

  return (
    <section className="py-24 px-6 bg-white border-b border-[#E8E8E8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 bg-[#FFF1F7] text-[#FF1493] text-xs font-semibold rounded-full mb-3 border border-[#FF1493]/20">
            Tailored For You
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] tracking-tight mb-4">
            Designed for teams and creators of every scale
          </h2>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            Whether you are a solo YouTuber or an agency managing dozens of client profiles, CMSFlow scales with you.
          </p>
        </div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personas.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl border border-[#E8E8E8] bg-neutral-50/40 hover:bg-white hover:border-[#FF1493]/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E8E8] shadow-xs flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0D0D0D] mb-1">{p.title}</h3>
                <p className="text-xs font-semibold text-[#FF1493] mb-3">{p.subtitle}</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">{p.description}</p>
                
                <div className="space-y-2 mb-8">
                  {p.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-neutral-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-white border border-[#E8E8E8] hover:border-[#FF1493] text-xs font-bold text-[#0D0D0D] hover:text-[#FF1493] transition-all group-hover:shadow-xs"
              >
                <span>{p.cta}</span>
                <ArrowRight className="w-4 h-4 text-[#FF1493] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
