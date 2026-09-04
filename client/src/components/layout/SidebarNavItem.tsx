import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

export interface ISidebarNavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
}

export const SidebarNavItem: React.FC<ISidebarNavItemProps> = ({ to, label, icon, badge }) => {
  return (
    <NavLink
      to={to}
      end={to === '/dashboard'}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors',
          isActive
            ? 'bg-[#EFEFEF] text-neutral-900 font-semibold'
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
        )
      }
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="w-5 h-5 flex items-center justify-center shrink-0">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      {badge && <div className="shrink-0">{badge}</div>}
    </NavLink>
  );
};
