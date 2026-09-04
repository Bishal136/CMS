import React from 'react';

export interface INotificationGroupProps {
  title: string;
  children: React.ReactNode;
}

export const NotificationGroup: React.FC<INotificationGroupProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-bold text-neutral-900 mb-3">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
};
