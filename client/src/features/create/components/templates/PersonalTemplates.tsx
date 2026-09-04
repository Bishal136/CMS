import React from 'react';
import { ITemplate } from '../../types/template.types';
import { TemplateCard } from './TemplateCard';
import { EmptyState } from '@/components/common/EmptyState';

export interface IPersonalTemplatesProps {
  templates: ITemplate[];
  onSelect: (t: ITemplate) => void;
  onCreateNew: () => void;
}

export const PersonalTemplates: React.FC<IPersonalTemplatesProps> = ({
  templates,
  onSelect,
  onCreateNew,
}) => {
  if (templates.length === 0) {
    return (
      <EmptyState
        title="No personal templates yet"
        description="Save your frequently used post frameworks to reuse them in seconds."
        actionText="+ New Template"
        onAction={onCreateNew}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} onSelect={onSelect} />
      ))}
    </div>
  );
};
