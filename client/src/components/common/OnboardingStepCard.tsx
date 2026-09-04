import React from 'react';
import { Button } from '@/components/ui/Button';

export interface IOnboardingStepCardProps {
  step: number;
  title: string;
  description: string;
  actionText: string;
  isCompleted?: boolean;
  onAction: () => void;
}

export const OnboardingStepCard: React.FC<IOnboardingStepCardProps> = ({
  step,
  title,
  description,
  actionText,
  isCompleted,
  onAction,
}) => {
  return (
    <div className="p-4 bg-white border border-[#E8E8E8] rounded-xl flex items-start gap-4 shadow-xs">
      <span className="w-8 h-8 rounded-full bg-[#FFF1F7] text-[#FF1493] font-bold flex items-center justify-center shrink-0">
        {isCompleted ? '✓' : step}
      </span>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-neutral-900">{title}</h4>
        <p className="text-xs text-[#6B6B6B] mt-0.5 mb-3">{description}</p>
        <Button size="sm" variant={isCompleted ? 'outline' : 'primary'} onClick={onAction}>
          {actionText}
        </Button>
      </div>
    </div>
  );
};
