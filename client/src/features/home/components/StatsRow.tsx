import React from 'react';
import { Info, PlusSquare } from 'lucide-react';

export interface IStatsRowProps {
  weekStreak?: number;
  postingGoals?: number;
  commentScore?: number;
  hasConnectedChannel?: boolean;
  onConnectChannel?: () => void;
}

export const StatsRow: React.FC<IStatsRowProps> = ({
  weekStreak = 0,
  postingGoals = 0,
  commentScore = 0,
  hasConnectedChannel = false,
  onConnectChannel,
}) => {
  return (
    <div className="mb-8 space-y-2.5">
      {/* Metrics Row Bar */}
      <div className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Metric 1: Week Streak */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center min-w-[32px] px-2.5 py-1 text-sm font-semibold text-neutral-800 bg-white border border-neutral-200/80 rounded-full shadow-2xs">
            {weekStreak}
          </span>
          <span className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5">
            Week Streak
            <button
              type="button"
              title="Number of consecutive weeks with published posts"
              className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <Info size={14} />
            </button>
          </span>
        </div>

        {/* Metric 2: Posting Goals */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center min-w-[32px] px-2.5 py-1 text-sm font-semibold text-neutral-800 bg-white border border-neutral-200/80 rounded-full shadow-2xs">
            {postingGoals}
          </span>
          <span className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5">
            Posting Goals
            <button
              type="button"
              title="Scheduled posts toward your publishing target"
              className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <Info size={14} />
            </button>
          </span>
        </div>

        {/* Metric 3: Comment Score */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center min-w-[32px] px-2.5 py-1 text-sm font-semibold text-neutral-800 bg-white border border-neutral-200/80 rounded-full shadow-2xs">
            {commentScore}
          </span>
          <span className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5">
            Comment Score
            <button
              type="button"
              title="Your response rate and speed on incoming comments"
              className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <Info size={14} />
            </button>
          </span>
        </div>
      </div>

      {/* Blue Alert Banner (Shown when no channel connected or prompting to connect) */}
      {!hasConnectedChannel && (
        <div className="bg-[#EBF5FF] border border-[#BFDBFE]/60 rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs text-[#1E40AF]">
          <PlusSquare size={16} className="text-[#2563EB] shrink-0" />
          <p className="font-medium leading-relaxed">
            <button
              onClick={onConnectChannel}
              className="underline font-semibold text-[#1D4ED8] hover:text-[#1E40AF] cursor-pointer"
            >
              Connect a channel
            </button>{' '}
            to start tracking your posting streak, set goals and more.
          </p>
        </div>
      )}
    </div>
  );
};
