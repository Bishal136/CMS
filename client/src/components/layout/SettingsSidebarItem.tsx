import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

export interface ISettingsSidebarItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export const SettingsSidebarItem: React.FC<ISettingsSidebarItemProps> = ({
  to,
  label,
  icon,
  badge,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors group',
          isActive
            ? 'bg-neutral-100 text-neutral-900 font-semibold'
            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
        )
      }
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {icon && (
          <span className="shrink-0 text-neutral-500 group-hover:text-neutral-800 transition-colors">
            {icon}
          </span>
        )}
        <span className="truncate">{label}</span>
      </div>
      {badge && <div className="shrink-0 ml-2">{badge}</div>}
    </NavLink>
  );
};
