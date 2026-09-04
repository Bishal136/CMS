import React, { useState } from 'react';
import { IPost } from '../../types/post.types';
import { QueueDayGroup } from './QueueDayGroup';
import { QueueTimeSlot } from './QueueTimeSlot';
import { MoreTimesButton } from './MoreTimesButton';

export interface IQueueListProps {
  posts?: IPost[];
  onOpenComposer: (time?: string, date?: string, platform?: string) => void;
  onDeletePost?: (id: string) => void;
  onPublishPost?: (id: string) => void;
  onEditPost?: (post: IPost) => void;
}

interface ISlotDef {
  time: string;
  timeHour: number; // 9, 13, 17
  platform: 'instagram' | 'facebook' | 'linkedin';
}

export const QueueList: React.FC<IQueueListProps> = ({
  posts = [],
  onOpenComposer,
  onDeletePost,
  onPublishPost,
  onEditPost,
}) => {
  const [daysCount, setDaysCount] = useState(2);

  // Generate upcoming days starting from Today (as shown in user screenshot)
  const dayGroups = Array.from({ length: daysCount }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() + idx);

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
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const title =
      idx === 0
        ? `Today, ${monthNames[d.getMonth()]} ${d.getDate()}`
        : idx === 1
        ? `Tomorrow, ${monthNames[d.getMonth()]} ${d.getDate()}`
        : `${dayNames[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}`;

    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`;

    // Screenshot has:
    // Today (idx === 0): 1:00 PM (Facebook), 5:00 PM (LinkedIn)
    // Tomorrow (idx === 1): 9:00 AM (Instagram), 1:00 PM (Facebook), 5:00 PM (LinkedIn)
    const slots: ISlotDef[] =
      idx === 0
        ? [
            { time: '1:00 PM', timeHour: 13, platform: 'facebook' },
            { time: '5:00 PM', timeHour: 17, platform: 'linkedin' },
          ]
        : [
            { time: '9:00 AM', timeHour: 9, platform: 'instagram' },
            { time: '1:00 PM', timeHour: 13, platform: 'facebook' },
            { time: '5:00 PM', timeHour: 17, platform: 'linkedin' },
          ];

    // Find posts for this day
    const dayPosts = posts.filter((p) => {
      if (!p.scheduledAt) return false;
      const pDate = new Date(p.scheduledAt);
      return (
        pDate.getFullYear() === d.getFullYear() &&
        pDate.getMonth() === d.getMonth() &&
        pDate.getDate() === d.getDate()
      );
    });

    return {
      date: d,
      title,
      dateStr,
      slots,
      dayPosts,
    };
  });

  const handleMoreTimes = () => {
    setDaysCount((prev) => prev + 2);
  };

  return (
    <div className="space-y-4">
      {dayGroups.map((group) => {
        // Track which posts matched standard slots
        const matchedPostIds = new Set<string>();

        return (
          <QueueDayGroup key={group.dateStr} dateTitle={group.title}>
            {group.slots.map((slot) => {
              // Find matching post for this slot time
              const postInSlot = group.dayPosts.find((p) => {
                if (!p.scheduledAt) return false;
                const pDate = new Date(p.scheduledAt);
                return pDate.getHours() === slot.timeHour;
              });

              if (postInSlot && (postInSlot._id || postInSlot.id)) {
                matchedPostIds.add(postInSlot._id || postInSlot.id!);
              }

              return (
                <QueueTimeSlot
                  key={`${group.dateStr}-${slot.time}`}
                  time={slot.time}
                  platform={slot.platform}
                  post={postInSlot}
                  onAddPost={(time, platform) =>
                    onOpenComposer(time, group.dateStr, platform)
                  }
                  onDeletePost={onDeletePost}
                  onPublishPost={onPublishPost}
                  onEditPost={onEditPost}
                />
              );
            })}

            {/* Extra posts scheduled for this day outside standard slots */}
            {group.dayPosts
              .filter((p) => !matchedPostIds.has(p._id || p.id || ''))
              .map((extraPost) => {
                const pDate = extraPost.scheduledAt ? new Date(extraPost.scheduledAt) : null;
                const hours = pDate ? pDate.getHours() : 12;
                const minutes = pDate ? String(pDate.getMinutes()).padStart(2, '0') : '00';
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const formattedHour = hours % 12 || 12;
                const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

                return (
                  <QueueTimeSlot
                    key={extraPost._id || extraPost.id}
                    time={formattedTime}
                    post={extraPost}
                    onAddPost={(time, platform) =>
                      onOpenComposer(time, group.dateStr, platform)
                    }
                    onDeletePost={onDeletePost}
                    onPublishPost={onPublishPost}
                    onEditPost={onEditPost}
                  />
                );
              })}
          </QueueDayGroup>
        );
      })}

      <MoreTimesButton onClick={handleMoreTimes} />
    </div>
  );
};
