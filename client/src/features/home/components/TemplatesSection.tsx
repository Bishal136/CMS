import React from 'react';
import { Sparkles, Rocket, Target } from 'lucide-react';

export interface ITemplateItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  emoji?: string;
}

export interface ITemplatesSectionProps {
  templates?: ITemplateItem[];
  onSelectTemplate?: (template: ITemplateItem) => void;
}

const DEFAULT_TEMPLATES: ITemplateItem[] = [
  {
    id: 'tpl-habit',
    title: 'Share a habit that helps you do better work',
    description: 'Describe a routine or system that helps you show up better.',
    content: 'One habit that completely transformed my workflow is:\n\n1. \n2. \n3. \n\nWhat is one routine that helps you do your best work?',
    emoji: 'sparkles',
  },
  {
    id: 'tpl-journey',
    title: "I didn't think I could do it — and then I did",
    description: 'Tell the story of trying something you thought was out of reach. What made you take the leap, and what surprised yo...',
    content: "I didn't think I could do it — and then I did.\n\nHere is what I learned when taking a leap outside my comfort zone:\n\n- The biggest hurdle was...\n- What actually happened:\n- Key takeaway:",
    emoji: 'rocket',
  },
  {
    id: 'tpl-shift',
    title: 'The quiet shift that changed everything',
    description: 'Share a subtle moment or realization that ended up changing your path in a big way.',
    content: 'The quiet shift that changed everything:\n\nIt wasn’t a massive turning point. It was a simple shift in mindset: ...\n\nHas a small shift ever changed your trajectory?',
    emoji: 'target',
  },
  {
    id: 'tpl-question',
    title: 'The one question that changed my strategy',
    description: 'Sometimes all it takes is one question to shift everything. Share the moment, the question, and how it reshaped your...',
    content: 'The one question that changed my strategy:\n\n"What would this look like if it were easy?"\n\nHere is how answering that question reshaped our approach:',
    emoji: 'help',
  },
];

export const TemplatesSection: React.FC<ITemplatesSectionProps> = ({
  templates = DEFAULT_TEMPLATES,
  onSelectTemplate,
}) => {
  const items = templates.length >= 4 ? templates.slice(0, 4) : DEFAULT_TEMPLATES;

  const renderIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-teal-600">
            <Sparkles size={20} className="stroke-[2.2]" />
          </div>
        );
      case 1:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-indigo-600">
            <Rocket size={20} className="stroke-[2.2]" />
          </div>
        );
      case 2:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-rose-600">
            <Target size={20} className="stroke-[2.2]" />
          </div>
        );
      case 3:
      default:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-red-500 font-bold text-lg leading-none">
            <span className="select-none">?</span>
          </div>
        );
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-sm font-bold text-neutral-900 mb-3 tracking-tight">Templates</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((t, idx) => (
          <div
            key={t.id || idx}
            onClick={() => onSelectTemplate && onSelectTemplate(t)}
            className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between hover:border-neutral-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div>
              {renderIcon(idx)}
              <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug group-hover:text-[#FF1493] transition-colors mt-3 mb-1.5">
                {t.title}
              </h3>
            </div>
            <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
              {t.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
