import React from 'react';
import { Plus, Users, Heart, MessageSquare, TrendingUp } from 'lucide-react';

export interface ISentEmptyStateProps {
  onConnectChannel: () => void;
  onInviteTeam?: () => void;
}

export const SentEmptyState: React.FC<ISentEmptyStateProps> = ({
  onConnectChannel,
  onInviteTeam,
}) => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-16 text-center select-none">
      {/* 1. Wireframe Floating Cards & Charts Illustration */}
      <div className="relative w-80 sm:w-96 h-60 mx-auto mb-6 flex items-center justify-center">
        {/* Curved Flow Arrow: Arcing from bottom-left up and around to the top bar chart */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 380 240"
          fill="none"
        >
          <path
            d="M 190 200 C 90 200, 70 35, 230 35"
            stroke="#E4E4E7"
            strokeWidth="1.5"
            strokeDasharray="0"
            fill="none"
          />
          <polyline
            points="224 30, 232 35, 224 40"
            stroke="#D4D4D8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Top Right: Bar Chart Card */}
        <div className="absolute top-2 right-12 bg-white border border-neutral-200/90 rounded-lg p-2.5 shadow-2xs flex items-end gap-1.5 h-14 z-10">
          <div className="w-1.5 h-3 bg-neutral-200 rounded-full" />
          <div className="w-1.5 h-6 bg-neutral-200 rounded-full" />
          <div className="w-1.5 h-4 bg-neutral-200 rounded-full" />
          <div className="w-1.5 h-8 bg-neutral-200 rounded-full" />
          <div className="w-1.5 h-10 bg-neutral-200 rounded-full" />
          <div className="w-1.5 h-6 bg-neutral-200 rounded-full" />
        </div>

        {/* Center: Main Social Post Wireframe Card */}
        <div className="absolute top-14 left-6 sm:left-8 bg-white border border-neutral-200 rounded-xl p-3.5 shadow-sm w-72 sm:w-80 z-20">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="space-y-2 flex-1 text-left pt-1">
              <div className="w-32 h-2 rounded-full bg-neutral-200" />
              <div className="w-28 h-2 rounded-full bg-neutral-200" />
              <div className="w-20 h-2 rounded-full bg-neutral-200" />
            </div>
            <div className="w-16 h-14 rounded-lg bg-neutral-100 border border-neutral-200/60 shrink-0" />
          </div>

          {/* Post Action Metrics Footer */}
          <div className="flex items-center gap-4 pt-1 border-t border-neutral-100">
            <div className="flex items-center gap-1 text-neutral-300">
              <Heart size={12} className="stroke-[2]" />
              <div className="w-5 h-1.5 rounded-full bg-neutral-200" />
            </div>
            <div className="flex items-center gap-1 text-neutral-300">
              <MessageSquare size={12} className="stroke-[2]" />
              <div className="w-4 h-1.5 rounded-full bg-neutral-200" />
            </div>
            <div className="flex items-center gap-1 text-neutral-300 ml-auto">
              <TrendingUp size={13} className="stroke-[2]" />
            </div>
          </div>
        </div>

        {/* Bottom Left: Wave / Area Chart Card */}
        <div className="absolute bottom-1 left-4 sm:left-6 bg-white border border-neutral-200 rounded-lg p-2 shadow-2xs w-28 h-14 z-30 flex flex-col justify-end overflow-hidden">
          <svg className="w-full h-8" viewBox="0 0 100 35" fill="none" preserveAspectRatio="none">
            <path
              d="M 0 30 Q 35 28, 55 15 T 100 6 L 100 35 L 0 35 Z"
              fill="#F4F4F5"
            />
            <path
              d="M 0 30 Q 35 28, 55 15 T 100 6"
              stroke="#E4E4E7"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Bottom Right: Checklist Card */}
        <div className="absolute -bottom-1 right-8 sm:right-10 bg-white border border-neutral-200 rounded-lg p-2.5 shadow-2xs w-28 space-y-2 z-30">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-[2px] border border-neutral-300 shrink-0" />
            <div className="w-14 h-1.5 rounded-full bg-neutral-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-[2px] border border-neutral-300 shrink-0" />
            <div className="w-10 h-1.5 rounded-full bg-neutral-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-[2px] border border-neutral-300 shrink-0" />
            <div className="w-12 h-1.5 rounded-full bg-neutral-200" />
          </div>
        </div>
      </div>

      {/* 2. Welcome Title & Description */}
      <h2 className="text-base sm:text-lg font-bold text-neutral-900 mb-1 flex items-center justify-center gap-1.5">
        <span>Welcome to Buffer</span>
        <span>👋</span>
      </h2>
      <p className="text-xs sm:text-sm text-neutral-600 max-w-sm text-center mb-6 leading-relaxed">
        Connect a channel to start posting and managing your comments
      </p>

      {/* 3. Action Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onConnectChannel}
          className="bg-[#C8F560] hover:bg-[#bdf04d] active:scale-[0.99] text-neutral-900 font-bold text-xs sm:text-sm px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
        >
          <Plus size={14} className="stroke-[2.5]" />
          <span>Connect a Channel</span>
        </button>

        <button
          type="button"
          onClick={onInviteTeam}
          className="border border-neutral-200 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-700 font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          <Users size={14} className="text-neutral-500" />
          <span>Invite your Team</span>
        </button>
      </div>
    </div>
  );
};
