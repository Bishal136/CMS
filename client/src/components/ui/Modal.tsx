import React, { useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<IModalProps> = ({ isOpen, onClose, title, children, className }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div
        className={cn(
          'relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-[#E8E8E8] p-6 max-h-[90vh] overflow-y-auto',
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8] mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 text-xl font-bold p-1 leading-none"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
