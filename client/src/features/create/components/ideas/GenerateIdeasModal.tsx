import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useGenerateIdeasMutation } from '../../services/ideasApi';
import { Sparkles, Loader2 } from 'lucide-react';

export interface IGenerateIdeasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenerateIdeasModal: React.FC<IGenerateIdeasModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('');
  const [generateIdeas, { isLoading }] = useGenerateIdeasMutation();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    try {
      await generateIdeas({ topic: topic.trim(), count: 3 }).unwrap();
      setTopic('');
      onClose();
    } catch {
      // Handled by global error
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Ideas with AI">
      <form onSubmit={handleGenerate} className="space-y-4">
        <p className="text-xs text-neutral-500 leading-relaxed">
          Enter a topic, theme, or question. Our AI will draft brainstorm cards directly into your Unassigned column.
        </p>

        <Input
          label="What topic or niche would you like ideas for?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. SaaS growth strategies, morning routines, leadership"
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="inline-flex items-center gap-1.5 bg-[#FF1493] hover:bg-[#d90072] text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={13} />
                Generate 3 Post Ideas
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
