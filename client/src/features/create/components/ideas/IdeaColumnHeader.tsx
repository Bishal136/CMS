import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';

export interface IIdeaColumnHeaderProps {
  title: string;
  count: number;
  onAdd: () => void;
  showMenu?: boolean;
}

export const IdeaColumnHeader: React.FC<IIdeaColumnHeaderProps> = ({
  title,
  count,
  onAdd,
  showMenu = true,
}) => {
  return (
    <div className="flex items-center justify-between pb-3 px-1 mb-2">
      <div className="flex items-center gap-2 min-w-0">
        <h3 className="text-xs sm:text-sm font-bold text-neutral-800 truncate">
          {title}
        </h3>
        <span className="text-[11px] px-2 py-0.2 rounded-full bg-neutral-200/70 text-neutral-600 font-semibold select-none">
          {count}
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0 text-neutral-400">
        <button
          type="button"
          onClick={onAdd}
          title={`Add idea to ${title}`}
          className="p-1 hover:text-neutral-800 hover:bg-neutral-200/60 rounded-md transition-colors cursor-pointer"
        >
          <Plus size={15} />
        </button>

        {showMenu && (
          <button
            type="button"
            title="Column options"
            className="p-1 hover:text-neutral-800 hover:bg-neutral-200/60 rounded-md transition-colors cursor-pointer"
          >
            <MoreHorizontal size={15} />
          </button>
        )}
      </div>
    </div>
  );
};
