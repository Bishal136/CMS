import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { HeroConstellation } from './HeroConstellation';

export const HeroSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      navigate(`/register?email=${encodeURIComponent(email.trim())}`);
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-6 bg-white overflow-hidden bg-hero-grid">
      {/* Background Soft Ambient Light */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#FFF1F7]/70 via-pink-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true" 
      />

      {/* Floating Network Constellation matching design/Landing page.png */}
      <HeroConstellation />

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Tag / Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F7] border border-[#FF1493]/25 text-[#FF1493] text-xs font-semibold mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#FF1493]" />
          <span>The Next-Gen Social Media Management Platform</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#0D0D0D] tracking-tight leading-[1.08] mb-6">
          Your social media <br className="hidden sm:inline" />
          <span className="relative inline-block">
            workspace
            <span 
              className="absolute -bottom-1 left-0 w-full h-[6px] bg-[#FF1493]/20 rounded-full" 
              aria-hidden="true" 
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Connected to every platform and tool you use.
        </p>

        {/* Email Pill Input Form matching design/Landing page.png */}
        <div className="w-full max-w-xl mx-auto mb-4">
          <form 
            onSubmit={handleGetStarted}
            className="flex flex-col sm:flex-row items-center p-1.5 sm:p-2 bg-white border border-[#E8E8E8] hover:border-neutral-300 focus-within:border-[#FF1493] focus-within:ring-4 focus-within:ring-[#FF1493]/10 rounded-full shadow-lg shadow-neutral-100 transition-all duration-200"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              aria-label="Email address"
              className="w-full sm:flex-1 px-5 py-3 text-sm text-[#0D0D0D] placeholder-[#6B6B6B] bg-transparent border-none outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="w-full sm:w-auto mt-2 sm:mt-0 px-6 py-3.5 bg-[#FF1493] hover:bg-[#D90072] text-white font-semibold text-sm rounded-full transition-all duration-150 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer shrink-0"
            >
              <span>Get started for free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Microcopy & Guarantees */}
        <p className="text-xs text-[#6B6B6B] mb-6">
          By entering your email, you agree to receive emails from CMSFlow.
        </p>

        {/* Highlights Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B6B6B]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
