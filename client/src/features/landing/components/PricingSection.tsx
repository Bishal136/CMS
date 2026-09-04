import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      badge: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Ideal for individuals just getting started with social publishing.',
      features: [
        'Up to 3 connected channels',
        '10 scheduled posts per channel',
        '100 ideas on Kanban board',
        '1 scheduled thread',
        '1 user account',
        'Community inbox (basic)',
        'Standard post analytics',
      ],
      isPopular: false,
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const,
    },
    {
      id: 'essentials',
      name: 'Essentials',
      badge: 'Most Popular',
      price: isAnnual ? '$5' : '$6',
      period: isAnnual ? '/channel/mo ($60 billed yearly)' : '/channel/month',
      description: 'For creators and solo entrepreneurs looking to build momentum.',
      features: [
        'Unlimited scheduled posts',
        'Unlimited scheduled threads',
        'Unlimited ideas & templates',
        'AI Assistant & Caption Generator',
        'Hashtag groups & manager',
        'Automated first comments',
        'Advanced reach & engagement analytics',
        '3 custom API keys',
        'Standard email support',
      ],
      isPopular: true,
      buttonText: 'Start 14-Day Free Trial',
      buttonVariant: 'primary' as const,
    },
    {
      id: 'team',
      name: 'Team',
      badge: 'Best for Teams',
      price: isAnnual ? '$10' : '$12',
      period: isAnnual ? '/channel/mo ($120 billed yearly)' : '/channel/month',
      description: 'For marketing agencies, high-growth startups, and social teams.',
      features: [
        'Everything in Essentials, plus:',
        'Unlimited team user accounts',
        'Multi-stage approval workflows',
        'Draft revision notes & comments',
        'Role-based permissions (Admin, Editor, Viewer)',
        'Custom channel groups',
        'White-label PDF report exports',
        '5 custom API keys',
        'Priority 24/7 dedicated support',
      ],
      isPopular: false,
      buttonText: 'Start 14-Day Free Trial',
      buttonVariant: 'outline' as const,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-white border-b border-[#E8E8E8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 bg-[#FFF1F7] text-[#FF1493] text-xs font-semibold rounded-full mb-3 border border-[#FF1493]/20">
            Simple & Transparent
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] tracking-tight mb-4">
            Fair pricing that grows with your audience
          </h2>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            Start free with no credit card required. Upgrade, downgrade, or cancel at any time.
          </p>

          {/* Billing Interval Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-neutral-100 rounded-full border border-[#E8E8E8]">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-white text-[#0D0D0D] shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#0D0D0D]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                isAnnual
                  ? 'bg-[#0D0D0D] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#0D0D0D]'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FF1493] text-white text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-200 relative ${
                p.isPopular
                  ? 'border-[#FF1493] ring-2 ring-[#FF1493]/20 shadow-xl bg-gradient-to-b from-[#FFF1F7]/30 to-white'
                  : 'border-[#E8E8E8] bg-white hover:border-neutral-300 shadow-sm'
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF1493] text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{p.badge}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#0D0D0D]">{p.name}</h3>
                  {!p.isPopular && (
                    <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B6B6B] mb-6 min-h-[32px]">{p.description}</p>

                <div className="mb-6 pb-6 border-b border-[#E8E8E8]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#0D0D0D] tracking-tight">
                      {p.price}
                    </span>
                    <span className="text-xs text-[#6B6B6B] font-medium">{p.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold text-[#0D0D0D] uppercase tracking-wider">Features Included:</p>
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700">
                      <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Button
                  variant={p.buttonVariant}
                  size="lg"
                  className={`w-full py-3.5 rounded-xl font-bold text-xs ${
                    p.isPopular ? 'shadow-md shadow-[#FF1493]/25' : ''
                  }`}
                  onClick={() => navigate('/register')}
                >
                  {p.buttonText}
                </Button>
                <p className="text-[11px] text-center text-neutral-400 mt-2.5">
                  No credit card required
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Callout */}
        <div className="mt-12 text-center text-xs text-[#6B6B6B]">
          Managing more than 30 channels or need custom SLA contracts?{' '}
          <a href="mailto:support@cmsflow.com" className="text-[#FF1493] font-semibold underline">
            Contact our Enterprise Team
          </a>
        </div>
      </div>
    </section>
  );
};
