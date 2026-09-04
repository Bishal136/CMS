import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useCreateTemplateMutation } from '../../services/templatesApi';
import { Loader2 } from 'lucide-react';

export interface INewTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMOJI_OPTIONS = ['📝', '💡', '🚀', '🤔', '📊', '🎯', '🔥', '✨', '🔑', '🙏'];

export const NewTemplateModal: React.FC<INewTemplateModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal');
  const [emoji, setEmoji] = useState('📝');
  const [createTemplate, { isLoading }] = useCreateTemplateMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await createTemplate({
        title: title.trim(),
        content: content.trim(),
        category: category.trim() || 'Personal',
        emoji,
        isPersonal: true,
      }).unwrap();

      setTitle('');
      setContent('');
      setCategory('Personal');
      setEmoji('📝');
      onClose();
    } catch {
      // Handled by global toast
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Template" className="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-neutral-600 mb-1.5 block">
            Choose Icon
          </label>
          <div className="flex flex-wrap gap-1.5">
            {EMOJI_OPTIONS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all cursor-pointer ${
                  emoji === e
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Template Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Weekly Roundup Prompt"
          required
          autoFocus
        />

        <Textarea
          label="Prompt / Template Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write the starting prompt or structure..."
          rows={4}
          required
        />

        <Input
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Personal, Announcements, Tips"
        />

        <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={isLoading || !title.trim() || !content.trim()}
            className="bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Saving...
              </>
            ) : (
              'Save Template'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
