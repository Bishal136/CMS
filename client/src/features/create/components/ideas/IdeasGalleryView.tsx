import React from 'react';
import { IIdea } from '../../types/idea.types';
import { IdeaCard } from './IdeaCard';

export interface IIdeasGalleryViewProps {
  ideas: IIdea[];
  onSelectIdea: (idea: IIdea) => void;
}

export const IdeasGalleryView: React.FC<IIdeasGalleryViewProps> = ({ ideas, onSelectIdea }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onClick={() => onSelectIdea(idea)} />
      ))}
    </div>
  );
};
