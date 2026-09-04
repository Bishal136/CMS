import React from 'react';
import { IPost, IPostChannel } from '../../types/post.types';
import { Edit3, Calendar, Trash2, Image as ImageIcon } from 'lucide-react';

export interface IDraftCardProps {
  draft: IPost;
  onEdit?: (draft: IPost) => void;
  onSchedule?: (draft: IPost) => void;
  onDelete?: (id: string) => void;
}

export const DraftCard: React.FC<IDraftCardProps> = ({
  draft,
  onEdit,
  onSchedule,
  onDelete,
}) => {
  const draftId = draft._id || draft.id || '';
  const firstChannel =
    Array.isArray(draft.channelIds) && draft.channelIds.length > 0
      ? typeof draft.channelIds[0] === 'object'
        ? (draft.channelIds[0] as IPostChannel)
        : null
      : null;
  const platform = firstChannel?.platform || 'instagram';

  const getPlatformBadge = (p: string) => {
    switch (p.toLowerCase()) {
      case 'instagram':
        return (
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0">
            IG
          </div>
        );
      case 'facebook':
        return (
          <div className="w-5 h-5 rounded-md bg-[#1877F2] text-white flex items-center justify-center text-[11px] font-bold shadow-2xs shrink-0">
            f
          </div>
        );
      case 'linkedin':
        return (
          <div className="w-5 h-5 rounded-md bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0">
            in
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-md bg-neutral-800 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0">
            {p.slice(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <div className="p-4 bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl flex items-center justify-between gap-4 shadow-2xs transition-all">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {getPlatformBadge(platform)}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-neutral-900 line-clamp-2">
            {draft.content}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500">
            <span>Draft</span>
            {draft.mediaUrls && draft.mediaUrls.length > 0 && (
              <span className="flex items-center gap-1 text-neutral-500">
                <ImageIcon size={12} />
                {draft.mediaUrls.length} media
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(draft)}
            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            title="Edit Draft"
          >
            <Edit3 size={15} />
          </button>
        )}
        {onSchedule && (
          <button
            type="button"
            onClick={() => onSchedule(draft)}
            className="p-1.5 text-neutral-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            title="Add to Queue"
          >
            <Calendar size={15} />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(draftId)}
            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Draft"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
};
