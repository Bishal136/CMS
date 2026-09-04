import React from 'react';
import { IApproval } from '../../types/post.types';
import { ApprovalCard } from './ApprovalCard';
import { ApprovalsPromo } from './ApprovalsPromo';

export interface IApprovalsListProps {
  approvals: IApproval[];
}

export const ApprovalsList: React.FC<IApprovalsListProps> = ({ approvals }) => {
  if (approvals.length === 0) {
    return <ApprovalsPromo />;
  }

  return (
    <div className="space-y-4">
      {approvals.map((app) => (
        <ApprovalCard key={app.id} approval={app} onApprove={() => {}} onReject={() => {}} />
      ))}
    </div>
  );
};
