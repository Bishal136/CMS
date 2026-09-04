import React from 'react';
import { IApproval } from '../../types/post.types';
import { Button } from '@/components/ui/Button';

export interface IApprovalCardProps {
  approval: IApproval;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ApprovalCard: React.FC<IApprovalCardProps> = ({
  approval,
  onApprove,
  onReject,
}) => {
  return (
    <div className="p-5 bg-white border border-[#E8E8E8] rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-700">
          Requested by {approval.requestedBy}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold">
          Pending Review
        </span>
      </div>
      <p className="text-sm text-neutral-900">{approval.post.content}</p>
      <div className="flex justify-end gap-2 pt-2 border-t border-[#E8E8E8]">
        <Button size="sm" variant="danger" onClick={() => onReject(approval.id)}>
          Reject
        </Button>
        <Button size="sm" onClick={() => onApprove(approval.id)}>
          Approve & Schedule
        </Button>
      </div>
    </div>
  );
};
