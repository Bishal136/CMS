import React, { useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/cn';

export interface IPopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<IPopoverProps> = ({ trigger, content, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={cn('absolute z-40 mt-2 p-3 bg-white border border-[#E8E8E8] rounded-xl shadow-md', className)}>
          {content}
        </div>
      )}
    </div>
  );
};
