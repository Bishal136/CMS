import React from 'react';
import { IMention } from '../../types/community.types';
import { MentionItem } from './MentionItem';
import { MentionsEmptyState } from './MentionsEmptyState';

export interface IMentionsListProps {
  mentions: IMention[];
  onConnectChannel?: (platform?: string) => void;
  onMarkRead?: (id: string) => void;
}

export const MentionsList: React.FC<IMentionsListProps> = ({
  mentions,
  onConnectChannel,
  onMarkRead,
}) => {
  if (mentions.length === 0) {
    return <MentionsEmptyState onConnectChannel={onConnectChannel} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-3 pt-4 pb-16">
      {mentions.map((m) => (
        <MentionItem key={m._id || m.id} mention={m} onMarkRead={onMarkRead} />
      ))}
    </div>
  );
};
