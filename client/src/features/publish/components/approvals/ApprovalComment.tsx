import React from 'react';

export interface IApprovalCommentProps {
  author: string;
  text: string;
  createdAt: string;
}

export const ApprovalComment: React.FC<IApprovalCommentProps> = ({ author, text, createdAt }) => {
  return (
    <div className="p-2.5 bg-neutral-50 rounded-lg text-xs">
      <div className="flex items-center justify-between font-semibold text-neutral-900 mb-1">
        <span>{author}</span>
        <span className="text-[#6B6B6B] font-normal">{createdAt}</span>
      </div>
      <p className="text-neutral-700">{text}</p>
    </div>
  );
};
