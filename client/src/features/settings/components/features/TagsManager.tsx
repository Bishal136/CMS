import React, { useState } from 'react';
import { TagItem } from './TagItem';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const TagsManager: React.FC = () => {
  const [tags, setTags] = useState(['growth', 'podcast', 'announcement']);
  const [newTag, setNewTag] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  return (
    <div className="space-y-4 max-w-md">
      <form onSubmit={handleAdd} className="flex gap-2">
        <Input
          placeholder="New tag name..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button size="sm" type="submit">Add</Button>
      </form>
      <div className="space-y-2">
        {tags.map((t) => (
          <TagItem
            key={t}
            name={t}
            onDelete={() => setTags(tags.filter((x) => x !== t))}
          />
        ))}
      </div>
    </div>
  );
};
