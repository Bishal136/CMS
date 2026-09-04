import React from 'react';
import { cn } from '@/utils/cn';

export interface IAlertProps {
  title?: string;
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
}

export const Alert: React.FC<IAlertProps> = ({ title, children, type = 'info' }) => {
  const styles = {
    info: 'bg-[#FFF1F7] border-[#FF1493]/30 text-neutral-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-green-50 border-green-200 text-green-900',
  };

  return (
    <div className={cn('p-4 rounded-lg border text-sm', styles[type])}>
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div>{children}</div>
    </div>
  );
};
