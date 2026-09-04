import React, { useState } from 'react';
import { SOCIAL_PLATFORMS } from '@/utils/socialPlatforms';
import { Check, ExternalLink, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

type TCategory = 'all' | 'video' | 'visual' | 'professional' | 'microblog' | 'tools';

export const IntegrationsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TCategory>('all');

  const categories: { id: TCategory; label: string }[] = [
    { id: 'all', label: 'All Platforms' },
    { id: 'video', label: 'Video & Shorts' },
    { id: 'visual', label: 'Visual & Photo' },
    { id: 'professional', label: 'Professional & B2B' },
    { id: 'microblog', label: 'Microblogging' },
    { id: 'tools', label: 'Cloud & Tools' },
  ];

  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      category: 'video',
      color: '#FF0000',
      icon: SOCIAL_PLATFORMS['youtube']?.iconPath,
      badge: 'Full API',
      description: 'Schedule YouTube Shorts and full videos with automated thumbnail & tag publishing.',
      features: ['Shorts & Videos', 'Comment Replying', 'Reach Analytics'],
    },
    {
      id: 'instagram',
      name: 'Instagram',
      category: 'visual',
      color: '#E1306C',
      icon: SOCIAL_PLATFORMS['instagram']?.iconPath,
      badge: 'Meta Partner',
      description: 'Auto-publish Reels, carousels, and grid posts. Schedule your first comment automatically.',
      features: ['Reels & Carousels', 'First Comment Automation', 'Story Scheduling'],
    },
    {
      id: 'twitter-x',
      name: 'X (Twitter)',
      category: 'microblog',
      color: '#000000',
      icon: SOCIAL_PLATFORMS['twitter-x']?.iconPath,
      badge: 'Certified API',
      description: 'Compose multi-tweet threads, schedule media posts, and analyze follower engagement spikes.',
      features: ['Thread Scheduling', 'Quote & Retweet', 'Engagement Leaderboard'],
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      category: 'professional',
      color: '#0A66C2',
      icon: SOCIAL_PLATFORMS['linkedin']?.iconPath,
      badge: 'Official API',
      description: 'Amplify thought leadership on personal profiles and Company Pages with PDF carousels.',
      features: ['PDF Document Carousels', 'Company Pages', 'Engagement Insights'],
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      category: 'video',
      color: '#000000',
      icon: SOCIAL_PLATFORMS['tiktok']?.iconPath,
      badge: 'Direct Share',
      description: 'Queue viral video content with custom trending sounds, captions, and privacy settings.',
      features: ['Direct Video Queue', 'Captions & Hashtags', 'Performance Metrics'],
    },
    {
      id: 'facebook',
      name: 'Facebook',
      category: 'visual',
      color: '#1877F2',
      icon: SOCIAL_PLATFORMS['facebook']?.iconPath,
      badge: 'Meta Partner',
      description: 'Manage Facebook business pages, post updates, and respond to incoming customer comments.',
      features: ['Page Management', 'Cross-posting', 'Comment Moderation'],
    },
    {
      id: 'threads',
      name: 'Threads',
      category: 'microblog',
      color: '#000000',
      icon: SOCIAL_PLATFORMS['threads']?.iconPath,
      badge: 'Meta Graph API',
      description: 'Connect with the fastest growing conversational network. Post text, photos, and links.',
      features: ['Auto-publishing', 'Threaded Conversations', 'Insights'],
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      category: 'visual',
      color: '#BD081C',
      icon: SOCIAL_PLATFORMS['pinterest']?.iconPath,
      badge: 'Commerce API',
      description: 'Drive high-intent traffic to your store with scheduled visual Pins and destination URLs.',
      features: ['Board Selection', 'Destination Link Tagging', 'Visual Search Stats'],
    },
    {
      id: 'google-business',
      name: 'Google Business',
      category: 'professional',
      color: '#4285F4',
      icon: SOCIAL_PLATFORMS['google-business']?.iconPath,
      badge: 'Local SEO',
      description: 'Keep local customers informed with special offers, store updates, and event announcements.',
      features: ['Call-To-Action Buttons', 'Local Event Promos', 'Customer Review Inbox'],
    },
    {
      id: 'mastodon',
      name: 'Mastodon',
      category: 'microblog',
      color: '#6364FF',
      icon: SOCIAL_PLATFORMS['mastodon']?.iconPath,
      badge: 'Decentralized',
      description: 'Engage with the fediverse by scheduling to custom instances with full content warnings.',
      features: ['Custom Instances', 'Content Warnings', 'Federated Reach'],
    },
    {
      id: 'zapier',
      name: 'Zapier & Webhooks',
      category: 'tools',
      color: '#FF4A00',
      icon: '/src/assets/icons/social/zapier.svg',
      badge: 'Automation',
      description: 'Connect CMSFlow with Shopify, Notion, Slack, and over 5,000+ business applications.',
      features: ['Custom Webhooks', 'Automated Triggers', 'Multi-step Zaps'],
    },
    {
      id: 'canva-drive',
      name: 'Canva & Cloud Storage',
      category: 'tools',
      color: '#00C4CC',
      icon: '/src/assets/icons/social/youtube.svg', // will render custom icon
      badge: 'Asset Hub',
      description: 'Import graphics straight from Canva, Google Drive, Dropbox, and OneDrive into your queue.',
      features: ['One-Click Canva Import', 'Cloud Drive Sync', 'High-Res Media'],
    },
  ];

  const filtered = activeCategory === 'all' 
    ? platforms 
    : platforms.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 px-6 bg-neutral-50/60 border-b border-[#E8E8E8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 bg-[#FFF1F7] text-[#FF1493] text-xs font-semibold rounded-full mb-3 border border-[#FF1493]/20">
            Native Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] tracking-tight mb-4">
            Connected to every platform and tool you use
          </h2>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            One-click OAuth authentication ensures your credentials stay completely secure. No password sharing required.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0D0D0D] text-white shadow-xs'
                  : 'bg-white border border-[#E8E8E8] text-[#6B6B6B] hover:text-[#0D0D0D] hover:border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white rounded-2xl border border-[#E8E8E8] hover:border-[#FF1493]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-[#E8E8E8] flex items-center justify-center p-2.5 shadow-xs">
                    <img 
                      src={item.icon} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback icon if SVG not found
                        (e.target as HTMLElement).style.display = 'none';
                      }} 
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0D0D0D] mb-1.5">{item.name}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed mb-4">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-[#E8E8E8] space-y-1.5">
                {item.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info box */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F7] flex items-center justify-center text-[#FF1493] shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0D0D0D]">Need a custom API or platform integration?</p>
              <p className="text-xs text-[#6B6B6B]">Our open REST API and webhook infrastructure lets your engineering team build custom workflows.</p>
            </div>
          </div>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-[#0D0D0D] hover:bg-neutral-800 text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5"
          >
            <span>Explore Developer API</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
