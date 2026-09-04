import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { IIdea } from '../../types/idea.types';
import { Button } from '@/components/ui/Button';
import { useDeleteIdeaMutation, useUpdateIdeaMutation } from '../../services/ideasApi';
import { Trash2, Send } from 'lucide-react';

export interface IIdeaDetailModalProps {
  idea: IIdea | null;
  onClose: () => void;
  onCreatePost?: (content: string) => void;
}

export const IdeaDetailModal: React.FC<IIdeaDetailModalProps> = ({
  idea,
  onClose,
  onCreatePost,
}) => {
  const [deleteIdea] = useDeleteIdeaMutation();
  const [updateIdea] = useUpdateIdeaMutation();

  if (!idea) return null;

  const ideaId = idea.id || idea._id || '';

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this idea?')) {
      await deleteIdea(ideaId);
      onClose();
    }
  };

  const handleStatusChange = async (newStatus: 'unassigned' | 'todo' | 'in-progress' | 'done') => {
    await updateIdea({ id: ideaId, data: { status: newStatus } });
  };

  return (
    <Modal isOpen={!!idea} onClose={onClose} title={idea.title} className="max-w-lg">
      <div className="space-y-5">
        {/* Status switcher pills */}
        <div>
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(['unassigned', 'todo', 'in-progress', 'done'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => handleStatusChange(st)}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  idea.status === st || (st === 'in-progress' && idea.status === ('in_progress' as any))
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {st.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Notes / Content */}
        <div>
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">
            Notes & Content
          </label>
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-xs sm:text-sm text-neutral-800 whitespace-pre-wrap leading-relaxed">
            {idea.content || idea.description || 'No additional notes provided.'}
          </div>
        </div>

        {/* Tags if any */}
        {idea.tags && idea.tags.length > 0 && (
          <div className="flex gap-1.5">
            {idea.tags.map((t) => (
              <span
                key={t}
                className="text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            Delete Idea
          </button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (onCreatePost) {
                  onCreatePost(idea.content || idea.title);
                }
              }}
              className="inline-flex items-center gap-1.5 bg-[#FF1493] hover:bg-[#d90072] text-white"
            >
              <Send size={13} />
              Create Post from Idea
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
