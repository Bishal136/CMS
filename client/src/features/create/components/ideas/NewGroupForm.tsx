import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';

export interface INewGroupFormProps {
  onAddGroup?: (name: string) => void;
}

export const NewGroupForm: React.FC<INewGroupFormProps> = ({ onAddGroup }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && onAddGroup) {
      onAddGroup(name.trim());
      setName('');
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit}
        className="w-52 shrink-0 border-2 border-emerald-600 bg-white rounded-xl p-2.5 flex items-center gap-1.5 shadow-sm"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group name..."
          autoFocus
          className="w-full text-xs font-semibold text-neutral-800 focus:outline-none px-1"
        />
        <button
          type="submit"
          className="p-1 text-emerald-600 hover:text-emerald-800 rounded cursor-pointer"
        >
          <Check size={14} />
        </button>
        <button
          type="button"
          onClick={() => {
            setName('');
            setIsEditing(false);
          }}
          className="p-1 text-neutral-400 hover:text-neutral-700 rounded cursor-pointer"
        >
          <X size={14} />
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="shrink-0 h-11 px-5 border-2 border-[#16A34A] hover:bg-emerald-50/40 rounded-xl flex items-center gap-1.5 text-xs font-bold text-neutral-800 transition-colors cursor-pointer select-none"
    >
      <Plus size={14} className="stroke-[2.5]" />
      <span>New Group</span>
    </button>
  );
};
