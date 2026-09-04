import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export interface ICommentReplyBoxProps {
  onSendReply?: (text: string) => void;
}

export const CommentReplyBox: React.FC<ICommentReplyBoxProps> = ({ onSendReply }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && onSendReply) {
      onSendReply(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white border border-[#E8E8E8] rounded-xl mt-3 space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Write a reply..."
        className="w-full text-xs p-2 focus:outline-none resize-none"
      />
      <div className="flex items-center justify-between pt-2 border-t border-[#E8E8E8]">
        <button type="button" className="text-xs text-[#FF1493] hover:underline">
          ⚡ Insert Saved Reply
        </button>
        <Button size="sm" type="submit">Reply</Button>
      </div>
    </form>
  );
};
