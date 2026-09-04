import React from 'react';
import { PermissionTable } from './PermissionTable';
import { Button } from '@/components/ui/Button';

export const RolesPermissions: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900">Team Roles & Permissions</h3>
          <p className="text-xs text-[#6B6B6B]">Control team member access across channels</p>
        </div>
        <Button size="sm">+ Invite Member</Button>
      </div>
      <PermissionTable />
    </div>
  );
};
