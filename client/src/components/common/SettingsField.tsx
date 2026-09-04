import React from 'react';

export interface ISettingsFieldProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsField: React.FC<ISettingsFieldProps> = ({ label, description, children }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-[#E8E8E8] last:border-b-0">
      <div className="max-w-md">
        <h4 className="text-sm font-medium text-neutral-900">{label}</h4>
        {description && <p className="text-xs text-[#6B6B6B] mt-0.5">{description}</p>}
      </div>
      <div className="w-full md:w-auto">{children}</div>
    </div>
  );
};
