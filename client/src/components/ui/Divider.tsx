import React from 'react';
import { cn } from '@/utils/cn';

export interface IDividerProps {
  className?: string;
}

export const Divider: React.FC<IDividerProps> = ({ className }) => {
  return <hr className={cn('border-t border-[#E8E8E8] my-4', className)} />;
};
