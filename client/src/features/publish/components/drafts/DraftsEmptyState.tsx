import React from 'react';
import { Plus, Users } from 'lucide-react';

export interface IDraftsEmptyStateProps {
  onConnectChannel: () => void;
  onInviteTeam?: () => void;
}

export const DraftsEmptyState: React.FC<IDraftsEmptyStateProps> = ({
  onConnectChannel,
  onInviteTeam,
}) => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-16 text-center select-none">
      {/* 1. Wireframe Floating Cards Illustration */}
      <div className="relative w-80 h-52 mx-auto mb-6 flex items-center justify-center">
        {/* Curved Flow Arrow */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 320 200"
          fill="none"
        >
          <path
            d="M 160 160 C 230 160, 235 55, 205 55"
            stroke="#D4D4D8"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <polyline
            points="209 50, 201 55, 209 60"
            stroke="#D4D4D8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Top Floating Card */}
        <div className="absolute top-4 right-16 bg-white border border-neutral-200 rounded-lg px-3 py-2 flex items-center gap-2 shadow-2xs">
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-200" />
          <div className="w-16 h-2 rounded-full bg-neutral-200" />
        </div>

        {/* Center Post Card */}
        <div className="absolute top-14 left-8 bg-white border border-neutral-200 rounded-xl p-3 flex items-center justify-between gap-4 shadow-2xs w-60">
          <div className="space-y-1.5 flex-1 text-left">
            <div className="w-20 h-2 rounded-full bg-neutral-200" />
            <div className="w-28 h-2 rounded-full bg-neutral-200" />
            <div className="w-16 h-2 rounded-full bg-neutral-200" />
            <div className="w-4 h-2 rounded-full bg-emerald-200/80 mt-2" />
          </div>
          <div className="w-14 h-14 rounded-lg bg-neutral-100 shrink-0" />
        </div>

        {/* Bottom Comment Card */}
        <div className="absolute bottom-2 left-24 bg-white border border-neutral-200 rounded-lg px-3 py-2 flex items-center justify-between gap-3 shadow-2xs w-44">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neutral-200" />
            <div className="w-16 h-1.5 rounded-full bg-neutral-200" />
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-200/70" />
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
