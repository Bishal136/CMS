import React, { useState } from 'react';
import { IPost, IPostChannel } from '../../types/post.types';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export interface IQueueCalendarProps {
  posts?: IPost[];
  onOpenComposer?: (date?: string) => void;
}

export const QueueCalendar: React.FC<IQueueCalendarProps> = ({
  posts = [],
  onOpenComposer,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getPostsForDay = (day: number) => {
    return posts.filter((post) => {
      if (!post.scheduledAt) return false;
      const d = new Date(post.scheduledAt);
      return (
        d.getFullYear() === year &&
        d.getMonth() === month &&
        d.getDate() === day
      );
    });
  };

  const getPlatformBadge = (post: IPost) => {
    const firstChannel =
      Array.isArray(post.channelIds) && post.channelIds.length > 0
        ? typeof post.channelIds[0] === 'object'
          ? (post.channelIds[0] as IPostChannel)
          : null
        : null;
    const platform = firstChannel?.platform || 'instagram';

    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'bg-pink-500 text-white';
      case 'facebook':
        return 'bg-blue-600 text-white';
      case 'linkedin':
        return 'bg-sky-700 text-white';
      default:
        return 'bg-neutral-800 text-white';
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xs">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
        <h3 className="text-base font-bold text-neutral-900">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekdays Row */}
      <div className="grid grid-cols-7 gap-px mb-2 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs font-semibold text-neutral-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty slots for start offset */}
        {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-24 rounded-xl bg-neutral-50/50 p-1.5" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const dayPosts = getPostsForDay(day);
          const isToday =
            new Date().getFullYear() === year &&
            new Date().getMonth() === month &&
            new Date().getDate() === day;

          return (
            <div
              key={`day-${day}`}
              className={`h-24 rounded-xl border p-2 flex flex-col justify-between transition-colors group relative ${
                isToday
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold ${
                    isToday ? 'text-emerald-700' : 'text-neutral-700'
                  }`}
                >
                  {day}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(
                      day
                    ).padStart(2, '0')}`;
                    onOpenComposer?.(dateStr);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 text-neutral-400 hover:text-neutral-800 rounded hover:bg-neutral-100 transition-opacity cursor-pointer"
                  title="Schedule post on this day"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Day Posts List */}
              <div className="space-y-1 overflow-hidden">
                {dayPosts.slice(0, 2).map((post, pIdx) => (
                  <div
                    key={post._id || post.id || pIdx}
                    className={`text-[10px] truncate px-1.5 py-0.5 rounded font-medium ${getPlatformBadge(
                      post
                    )}`}
                    title={post.content}
                  >
                    {post.content}
                  </div>
                ))}
                {dayPosts.length > 2 && (
                  <span className="text-[9px] text-neutral-400 font-medium pl-1">
                    +{dayPosts.length - 2} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
