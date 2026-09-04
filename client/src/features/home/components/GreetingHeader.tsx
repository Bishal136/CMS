import React from 'react';
import { formatDate } from '@/utils/formatDate';
import { PenLine } from 'lucide-react';

export interface IGreetingHeaderProps {
  userName?: string;
}

export const GreetingHeader: React.FC<IGreetingHeaderProps> = ({ userName = 'bishalbiswas2027' }) => {
  const hour = new Date().getHours();
  let timeGreeting = 'Good Morning';
  if (hour >= 12 && hour < 17) {
    timeGreeting = 'Good Afternoon';
  } else if (hour >= 17) {
    timeGreeting = 'Good Evening';
  }

  // Format date like: Thu, Sep 3 2026
  const now = new Date();
  const dateFormatted = formatDate(now, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).replace(/, (\d{4})/, ' $1');

  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-start gap-3">
        <span className="text-3xl select-none leading-none mt-0.5" role="img" aria-label="wave">
          👋
        </span>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            {timeGreeting}, {userName}!
          </h1>
          <p className="text-xs text-neutral-500 font-medium mt-1">
            {dateFormatted}
          </p>
        </div>
      </div>

      <button
        type="button"
        title="Quick Notes & Feedback"
        className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
      >
        <PenLine size={16} />
      </button>
    </div>
  );
};
