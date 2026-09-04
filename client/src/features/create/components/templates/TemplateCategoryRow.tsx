import React from 'react';
import { ITemplate } from '../../types/template.types';
import { TemplateCard } from './TemplateCard';

export interface ITemplateCategoryRowProps {
  categoryName: string;
  templates: ITemplate[];
  onSelect: (t: ITemplate) => void;
}

export const TemplateCategoryRow: React.FC<ITemplateCategoryRowProps> = ({
  categoryName,
  templates,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-base font-bold text-neutral-900 mb-3">{categoryName}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((t) => (
          <TemplateCard key={t.id} template={t} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};
