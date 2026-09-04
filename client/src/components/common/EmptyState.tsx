import React from 'react';
import { Button } from '@/components/ui/Button';

export interface IEmptyStateProps {
  title: string;
  description: string;
  illustration?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<IEmptyStateProps> = ({
  title,
  description,
  illustration,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-[#E8E8E8]">
      {illustration && (
        <img src={illustration} alt={title} className="w-36 h-36 mb-4 object-contain" />
      )}
      <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
      <p className="text-sm text-[#6B6B6B] max-w-sm mt-1 mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
};
