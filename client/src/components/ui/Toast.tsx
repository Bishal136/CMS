import React from 'react';
import { cn } from '@/utils/cn';

export interface IToastProps {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
}

export const Toast: React.FC<IToastProps> = ({ title, message, type = 'info', onClose }) => {
  const borderColors = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    info: 'border-l-[#FF1493]',
    warning: 'border-l-amber-500',
  };

  return (
    <div
      className={cn(
        'flex items-start justify-between p-4 bg-white border border-[#E8E8E8] border-l-4 rounded-lg shadow-lg max-w-sm w-full',
        borderColors[type]
      )}
    >
      <div>
        {title && <h4 className="text-sm font-semibold text-neutral-900">{title}</h4>}
        <p className="text-xs text-neutral-600 mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 ml-2">
          &times;
        </button>
      )}
    </div>
  );
};
