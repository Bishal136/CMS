import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useCreateFeedMutation } from '../../services/feedsApi';
import { Loader2, Rss } from 'lucide-react';

export interface INewFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewFeedModal: React.FC<INewFeedModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [createFeed, { isLoading }] = useCreateFeedMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    try {
      await createFeed({
        name: name.trim(),
        url: url.trim(),
      }).unwrap();

      setName('');
      setUrl('');
      onClose();
    } catch {
      // Handled by global toast
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New RSS / News Feed" className="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-neutral-500 leading-relaxed">
          Connect any blog, publication, or RSS/Atom feed to automatically pull articles you can schedule and share.
        </p>

        <Input
          label="Feed Name / Source"
          placeholder="e.g. TechCrunch, The Verge, My Company Blog"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Input
          label="Feed or Website URL"
          placeholder="https://example.com/feed or https://example.com/rss.xml"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={isLoading || !name.trim() || !url.trim()}
            className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Rss size={13} />
                Add Feed
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
