import React from 'react';
import { IIdeaColumn, IIdea } from '../../types/idea.types';
import { IdeaColumnHeader } from './IdeaColumnHeader';
import { IdeaCard } from './IdeaCard';
import { Plus } from 'lucide-react';

export interface IIdeaColumnProps {
  column: IIdeaColumn;
  onAddIdea: (columnId: string) => void;
  onSelectIdea: (idea: IIdea) => void;
  onDropIdea?: (ideaId: string, targetStatus: string) => void;
}

export const IdeaColumn: React.FC<IIdeaColumnProps> = ({
  column,
  onAddIdea,
  onSelectIdea,
  onDropIdea,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const ideaId = e.dataTransfer.getData('text/plain');
    if (ideaId && onDropIdea) {
      onDropIdea(ideaId, column.id);
    }
  };

  const handleDragStart = (e: React.DragEvent, ideaId: string) => {
    e.dataTransfer.setData('text/plain', ideaId);
  };

  const isUnassigned = column.id === 'unassigned';

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-64 sm:w-72 shrink-0 flex flex-col"
    >
      <IdeaColumnHeader
        title={column.title}
        count={column.ideas.length}
        onAdd={() => onAddIdea(column.id)}
        showMenu={!isUnassigned}
      />

      {/* Column Body Container */}
      <div
        className={`flex-1 rounded-2xl min-h-[520px] p-2.5 flex flex-col transition-colors ${
          column.ideas.length > 0
            ? 'bg-[#F9F9FB] border border-[#EBECEF]'
            : 'bg-[#F7F7F8] border border-[#EEEEF0] items-center'
        }`}
      >
        {column.ideas.length === 0 ? (
          <div className="w-full flex-1 flex flex-col items-center pt-8">
            <button
              type="button"
              onClick={() => onAddIdea(column.id)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 py-2 px-3 rounded-lg hover:bg-neutral-200/50 transition-colors cursor-pointer select-none"
            >
              <Plus size={14} className="text-neutral-500" />
              <span>New Idea</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
            {column.ideas.map((idea) => (
              <div
                key={idea.id || idea._id}
                draggable
                onDragStart={(e) => handleDragStart(e, idea.id || idea._id || '')}
              >
                <IdeaCard idea={idea} onClick={() => onSelectIdea(idea)} />
              </div>
            ))}

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onAddIdea(column.id)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-800 py-1.5 px-3 rounded-lg hover:bg-neutral-200/50 transition-colors cursor-pointer select-none"
              >
                <Plus size={13} />
                <span>New Idea</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
