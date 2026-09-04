import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useCreateIdeaMutation } from '../../services/ideasApi';
import { Loader2 } from 'lucide-react';

export interface INewIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus?: string;
}

export const NewIdeaModal: React.FC<INewIdeaModalProps> = ({
  isOpen,
  onClose,
  defaultStatus = 'unassigned',
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(defaultStatus);
  const [prevDefaultStatus, setPrevDefaultStatus] = useState(defaultStatus);
  const [tagsInput, setTagsInput] = useState('');
  const [createIdea, { isLoading }] = useCreateIdeaMutation();

  if (prevDefaultStatus !== defaultStatus) {
    setPrevDefaultStatus(defaultStatus);
    setStatus(defaultStatus);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean);

      await createIdea({
        title: title.trim(),
        content: content.trim(),
        status: status as any,
        tags,
      }).unwrap();

      setTitle('');
      setContent('');
      setTagsInput('');
      onClose();
    } catch {
      // Handled by global toast
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Idea" className="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Idea Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 5 lessons learned from our launch"
          required
          autoFocus
        />

        <Textarea
          label="Notes or Outline"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Jot down bullet points, key takeaways, or hooks..."
          rows={4}
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-neutral-600 mb-1 block">
              Column Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full text-xs font-medium border border-neutral-300 rounded-lg p-2 bg-white text-neutral-800 focus:outline-none focus:border-neutral-900"
            >
              <option value="unassigned">Unassigned</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <Input
              label="Tags (comma separated)"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="growth, design"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={isLoading || !title.trim()}
            className="bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Saving...
              </>
            ) : (
              'Save Idea'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
