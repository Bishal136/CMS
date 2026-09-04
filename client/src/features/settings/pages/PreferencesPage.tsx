import React from 'react';
import { PreferencesForm } from '../components/account/PreferencesForm';

export const PreferencesPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">Preferences</h2>
      <PreferencesForm />
    </div>
  );
};
