import React from 'react';
import { Button } from '@/components/ui/Button';

export interface IPlanGateProps {
  requiredPlan: 'essentials' | 'team' | 'agency';
  currentPlan?: string;
  children: React.ReactNode;
}

export const PlanGate: React.FC<IPlanGateProps> = ({
  requiredPlan,
  currentPlan = 'free',
  children,
}) => {
  const isAllowed = currentPlan !== 'free';

  if (!isAllowed) {
    return (
      <div className="p-6 bg-[#FFF1F7] border border-[#FF1493]/30 rounded-xl text-center">
        <h4 className="text-base font-bold text-neutral-900">Premium Feature</h4>
        <p className="text-xs text-neutral-600 mt-1 mb-4">
          This feature requires the {requiredPlan} plan or higher.
        </p>
        <Button size="sm" onClick={() => (window.location.href = '/settings/billing')}>
          Upgrade Plan
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};
