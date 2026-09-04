import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

export interface ISettingsSidebarItemProps {
  to: string;
  label: string;
}

export const SettingsSidebarItem: React.FC<ISettingsSidebarItemProps> = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'block px-3 py-2 text-sm rounded-lg transition-colors',
          isActive
            ? 'bg-[#FFF1F7] text-[#FF1493] font-semibold'
            : 'text-neutral-700 hover:bg-neutral-100'
        )
      }
    >
      {label}
    </NavLink>
  );
};
