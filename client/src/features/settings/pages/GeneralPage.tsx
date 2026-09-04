import React from 'react';
import { GeneralSettings } from '../components/organization/GeneralSettings';

export const GeneralPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">General Settings</h2>
      <GeneralSettings />
    </div>
  );
};
