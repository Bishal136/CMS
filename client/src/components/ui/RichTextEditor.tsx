import React from 'react';
import { Textarea } from './Textarea';

export interface IRichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<IRichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your post content...',
}) => {
  return (
    <div className="border border-[#E8E8E8] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 p-2 border-b border-[#E8E8E8] bg-neutral-50 text-xs text-neutral-600">
        <button type="button" className="p-1 hover:bg-neutral-200 rounded font-bold">B</button>
        <button type="button" className="p-1 hover:bg-neutral-200 rounded italic">I</button>
        <button type="button" className="p-1 hover:bg-neutral-200 rounded">🔗</button>
        <button type="button" className="p-1 hover:bg-neutral-200 rounded">#</button>
        <button type="button" className="p-1 hover:bg-neutral-200 rounded">@</button>
        <button type="button" className="p-1 hover:bg-neutral-200 rounded">😀</button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-none rounded-none focus:ring-0"
        rows={5}
      />
    </div>
  );
};
