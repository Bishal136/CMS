import React from 'react';

export interface IQueueDayGroupProps {
  dateTitle: string;
  children: React.ReactNode;
}

export const QueueDayGroup: React.FC<IQueueDayGroupProps> = ({ dateTitle, children }) => {
  const parts = dateTitle.split(', ');
  const prefix = parts[0];
  const rest = parts.slice(1).join(', ');

  return (
    <div className="mb-10">
      <h3 className="text-xs sm:text-[13px] mb-4">
        {rest ? (
          <>
            <span className="font-bold text-neutral-900">{prefix},</span>{' '}
            <span className="font-normal text-neutral-600">{rest}</span>
          </>
        ) : (
          <span className="font-bold text-neutral-900">{dateTitle}</span>
        )}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
};
