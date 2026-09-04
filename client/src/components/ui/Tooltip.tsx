import React, { useState } from 'react';
import { cn } from '@/utils/cn';

export interface ITooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<ITooltipProps> = ({ text, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-xs rounded whitespace-nowrap z-50 pointer-events-none shadow-sm',
            position === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
};
