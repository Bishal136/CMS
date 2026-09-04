import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export interface ISavedReplyFormProps {
  onSave: (title: string, text: string) => void;
  onCancel: () => void;
}

export const SavedReplyForm: React.FC<ISavedReplyFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(title, text);
      }}
      className="space-y-3"
    >
      <Input label="Shortcut Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea label="Reply Text" value={text} onChange={(e) => setText(e.target.value)} required />
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Reply</Button>
      </div>
    </form>
  );
};
