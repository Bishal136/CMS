import React from 'react';
import { RolesPermissions } from '../components/organization/RolesPermissions';

export const RolesPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">Roles & Permissions</h2>
      <RolesPermissions />
    </div>
  );
};
