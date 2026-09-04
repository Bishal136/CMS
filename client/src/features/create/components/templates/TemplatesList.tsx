import React from 'react';
import { ITemplate } from '../../types/template.types';
import { TemplateCard } from './TemplateCard';

export interface ITemplatesListProps {
  templates: ITemplate[];
  onSelect: (t: ITemplate) => void;
}

export const TemplatesList: React.FC<ITemplatesListProps> = ({ templates, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} onSelect={onSelect} />
      ))}
    </div>
  );
};
