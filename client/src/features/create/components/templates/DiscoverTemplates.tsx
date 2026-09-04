import React from 'react';
import { ITemplate } from '../../types/template.types';
import { TemplateCategoryRow } from './TemplateCategoryRow';

export interface IDiscoverTemplatesProps {
  onSelect: (t: ITemplate) => void;
}

export const DiscoverTemplates: React.FC<IDiscoverTemplatesProps> = ({ onSelect }) => {
  const sampleTemplates: ITemplate[] = [
    { id: '1', title: 'Product Announcement', emoji: '🚀', content: "We are thrilled to launch {product}! Here is what you need to know: \n1. {feature1}\n2. {feature2}", category: 'Marketing' },
    { id: '2', title: 'Weekly Recap', emoji: '📊', content: "Highlights from this week at {company}:\n- Metric A\n- Metric B\nWhat was your biggest win?", category: 'Updates' },
  ];

  return (
    <div className="space-y-6">
      <TemplateCategoryRow categoryName="Popular Community Templates" templates={sampleTemplates} onSelect={onSelect} />
    </div>
  );
};
