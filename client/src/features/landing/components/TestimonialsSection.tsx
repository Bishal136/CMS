import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      quote: "CMSFlow transformed our multi-channel workflow. We went from spending 15 hours a week manually copy-pasting posts to under 90 minutes. Our audience grew by 240% across YouTube Shorts and LinkedIn in 90 days.",
      author: "Alex Morgan",
      role: "Head of Growth",
      company: "HyperScale Media",
      stat: "+240% Reach Growth",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote: "The visual queue and ideas Kanban board are absolute game-changers. I haven't missed a scheduled slot in 6 months, and the AI co-pilot produces killer hooks whenever I hit a creative wall.",
      author: "Samantha Lee",
      role: "Full-Time Creator",
      company: "350k+ Followers",
      stat: "12 hrs saved / week",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote: "Our agency manages 40 client profiles on CMSFlow. The team approval workflows give clients complete peace of mind while our copywriters draft content seamlessly. It paid for itself on day one.",
      author: "David Zhao",
      role: "Founder & Creative Director",
      company: "Pulse Agency London",
      stat: "40+ Brands Managed",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-24 px-6 bg-neutral-50/50 border-b border-[#E8E8E8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 bg-[#FFF1F7] text-[#FF1493] text-xs font-semibold rounded-full mb-3 border border-[#FF1493]/20">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] tracking-tight mb-4">
            Loved by ambitious creators & fast-growing teams
          </h2>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            Here is how real marketers and creators use CMSFlow to build consistent social media momentum.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-3xl border border-[#E8E8E8] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Stat Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {r.stat}
                  </span>
                </div>

                <p className="text-sm text-neutral-800 leading-relaxed italic mb-8">
                  "{r.quote}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#E8E8E8]">
                <img
                  src={r.avatar}
                  alt={r.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#E8E8E8]"
                  loading="lazy"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-[#0D0D0D]">{r.author}</p>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  </div>
                  <p className="text-xs text-[#6B6B6B]">
                    {r.role} • <span className="font-medium text-neutral-800">{r.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
