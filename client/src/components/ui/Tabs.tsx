import React from 'react';
import { cn } from '@/utils/cn';

export interface ITabItem {
  id: string;
  label: string;
  count?: number;
}

export interface ITabsProps {
  tabs: ITabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const Tabs: React.FC<ITabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex border-b border-[#E8E8E8] gap-6">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'pb-3 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 cursor-pointer',
              isActive
                ? 'border-[#FF1493] text-[#FF1493]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-2 py-0.5 text-xs rounded-full',
                  isActive ? 'bg-[#FFF1F7] text-[#FF1493]' : 'bg-neutral-100 text-neutral-600'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
