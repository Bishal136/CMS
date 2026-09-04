import React from 'react';
import { Toggle } from '@/components/ui/Toggle';

export interface INotificationItemProps {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

export const NotificationItem: React.FC<INotificationItemProps> = ({ title, desc, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#E8E8E8] last:border-b-0">
      <div>
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        <p className="text-xs text-[#6B6B6B]">{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
};
