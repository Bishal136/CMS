import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export interface INewTemplateFormProps {
  onSubmit: (title: string, content: string) => void;
  onCancel: () => void;
}

export const NewTemplateForm: React.FC<INewTemplateFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title, content);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Template Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea label="Template Text" value={content} onChange={(e) => setContent(e.target.value)} rows={4} required />
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Template</Button>
      </div>
    </form>
  );
};
