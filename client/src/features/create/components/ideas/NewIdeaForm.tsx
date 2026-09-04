import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export interface INewIdeaFormProps {
  columnId: string;
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
}

export const NewIdeaForm: React.FC<INewIdeaFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white rounded-xl border border-[#FF1493] space-y-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Idea title..."
        required
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Notes or brief description..."
        rows={2}
      />
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="ghost" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};
