import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      navigate(`/register?email=${encodeURIComponent(email.trim())}`);
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="py-24 px-6 bg-[#0D0D0D] text-white text-center relative overflow-hidden">
      {/* Background glow effects */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF1493]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <span className="inline-block px-3.5 py-1 bg-white/10 text-pink-300 text-xs font-semibold rounded-full mb-4 border border-white/15">
          Start In Less Than 2 Minutes
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          Ready to supercharge your social media workflow?
        </h2>

        <p className="text-sm sm:text-base text-neutral-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Join over 250,000 creators and marketing teams using CMSFlow to schedule, engage, and analyze all in one place.
        </p>

        {/* Email Pill Form */}
        <div className="w-full max-w-lg mx-auto mb-6">
          <form
            onSubmit={handleStart}
            className="flex flex-col sm:flex-row items-center p-1.5 sm:p-2 bg-white/10 backdrop-blur-md border border-white/20 focus-within:border-[#FF1493] rounded-full shadow-2xl transition-all"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              aria-label="Email address"
              className="w-full sm:flex-1 px-5 py-3 text-sm text-white placeholder-neutral-400 bg-transparent border-none outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="w-full sm:w-auto mt-2 sm:mt-0 px-6 py-3.5 bg-[#FF1493] hover:bg-[#D90072] text-white font-semibold text-sm rounded-full transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer shrink-0"
            >
              <span>Get started for free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Reassurance items */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
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
