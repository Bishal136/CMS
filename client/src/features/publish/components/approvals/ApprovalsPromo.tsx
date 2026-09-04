import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface IApprovalsPromoProps {
  onDiscoverPlan?: () => void;
}

export const ApprovalsPromo: React.FC<IApprovalsPromoProps> = ({ onDiscoverPlan }) => {
  const navigate = useNavigate();

  const handleDiscover = () => {
    if (onDiscoverPlan) {
      onDiscoverPlan();
    } else {
      navigate('/dashboard/settings/billing');
    }
  };

  return (
    <div className="py-8 px-2 max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 select-none">
      {/* 1. Left Content Column */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
          Collaboration made easy
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
          Say goodbye to the hassle of managing multiple social media channels with multiple
          team mates. With our collaboration features, you can:
        </p>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
            <Check size={16} className="text-neutral-800 stroke-[2.5] shrink-0 mt-0.5" />
            <span>Choose who can post on each of your social media channels</span>
          </li>
          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
            <Check size={16} className="text-neutral-800 stroke-[2.5] shrink-0 mt-0.5" />
            <span>Review posts for quality and brand before hitting publish</span>
          </li>
          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
            <Check size={16} className="text-neutral-800 stroke-[2.5] stroke-2 shrink-0 mt-0.5" />
            <span>Collaborate on ideas</span>
          </li>
          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
            <Check size={16} className="text-neutral-800 stroke-[2.5] shrink-0 mt-0.5" />
            <span>Stay on top of performance with automated reports</span>
          </li>
        </ul>

        <button
          type="button"
          onClick={handleDiscover}
          className="bg-[#C8F560] hover:bg-[#bdf04d] active:scale-[0.99] text-neutral-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>Discover the Team Plan</span>
        </button>
      </div>

      {/* 2. Right Illustration Column */}
      <div className="relative shrink-0 w-80 sm:w-96 flex flex-col items-center py-6">
        {/* Top-Right Speech Bubble with Avatar */}
        <div className="self-end mr-2 mb-2 flex items-center gap-2 border border-neutral-700 bg-white rounded-full pl-1 pr-3 py-1 shadow-2xs z-20">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces"
            alt="Reviewer"
            className="w-5 h-5 rounded-full object-cover shrink-0"
          />
          <span className="text-[11px] font-medium text-neutral-800 whitespace-nowrap">
            This image looks so good! 😻
          </span>
        </div>

        {/* Center Post Card */}
        <div className="relative w-72 sm:w-80 bg-white border border-neutral-700 rounded-2xl p-4 shadow-sm z-10">
          <div className="flex items-start justify-between gap-4">
            {/* Left text lines and Reject button */}
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-2 w-14 bg-neutral-200 rounded-full" />
              <div className="h-2 w-28 bg-neutral-200 rounded-full" />
              <div className="h-2 w-20 bg-neutral-200 rounded-full" />
              <div className="pt-4">
                <button
                  type="button"
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Right purple artwork image container */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-tr from-[#D8B4F8] via-[#C084FC] to-[#A855F7] relative overflow-hidden flex items-end justify-center shrink-0 shadow-inner">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white/50 absolute inset-0">
                <path
                  d="M 15 100 A 35 35 0 0 1 85 100"
                  stroke="white"
                  strokeWidth="10"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M 30 100 A 20 20 0 0 1 70 100"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  opacity="0.9"
                />
              </svg>
            </div>
          </div>

          {/* Overlapping Approve Button */}
          <div className="absolute -bottom-4 right-10 z-20">
            <button
              type="button"
              className="bg-[#A3E635] hover:bg-[#86efac] text-neutral-900 font-bold text-xs sm:text-sm px-6 py-2 rounded-2xl shadow-xs border border-neutral-800/10 transition-colors cursor-pointer"
            >
              Approve
            </button>
          </div>

          {/* Curved Arrow Looping from Approve */}
          <svg
            className="absolute -right-8 top-12 w-12 h-20 pointer-events-none"
            viewBox="0 0 50 80"
            fill="none"
          >
            <path
              d="M 12 65 C 45 65, 45 15, 6 15"
              stroke="#52525B"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <polyline
              points="14 10, 6 15, 14 20"
              stroke="#52525B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Bottom-Left Speech Bubble with Avatar */}
        <div className="self-start ml-2 mt-4 flex items-center gap-2 border border-neutral-700 bg-white rounded-full pl-1 pr-3 py-1 shadow-2xs z-20">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=faces"
            alt="Submitter"
            className="w-5 h-5 rounded-full object-cover shrink-0"
          />
          <span className="text-[11px] font-medium text-neutral-800 whitespace-nowrap">
            Good to go! 🚀
          </span>
        </div>
      </div>
    </div>
  );
};
