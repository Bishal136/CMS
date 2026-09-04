import React from 'react';
import { IPost } from '../../types/post.types';
import { DraftCard } from './DraftCard';
import { DraftsEmptyState } from './DraftsEmptyState';

export interface IDraftsListProps {
  drafts: IPost[];
  onConnectChannel: () => void;
  onInviteTeam?: () => void;
  onEditDraft?: (draft: IPost) => void;
  onScheduleDraft?: (draft: IPost) => void;
  onDeleteDraft?: (id: string) => void;
}

export const DraftsList: React.FC<IDraftsListProps> = ({
  drafts,
  onConnectChannel,
  onInviteTeam,
  onEditDraft,
  onScheduleDraft,
  onDeleteDraft,
}) => {
  if (drafts.length === 0) {
    return (
      <DraftsEmptyState
        onConnectChannel={onConnectChannel}
        onInviteTeam={onInviteTeam}
      />
    );
  }

  return (
    <div className="space-y-3 max-w-3xl">
      {drafts.map((d) => (
        <DraftCard
          key={d._id || d.id}
          draft={d}
          onEdit={onEditDraft}
          onSchedule={onScheduleDraft}
          onDelete={onDeleteDraft}
        />
      ))}
    </div>
  );
};
