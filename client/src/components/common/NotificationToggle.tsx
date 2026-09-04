import React from 'react';
import { Toggle } from '@/components/ui/Toggle';

export interface INotificationToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const NotificationToggle: React.FC<INotificationToggleProps> = ({
  title,
  description,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#E8E8E8] last:border-b-0">
      <div>
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        <p className="text-xs text-[#6B6B6B]">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
};
