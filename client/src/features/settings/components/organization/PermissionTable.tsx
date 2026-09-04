import React from 'react';

export const PermissionTable: React.FC = () => {
  return (
    <div className="border border-[#E8E8E8] rounded-xl overflow-hidden text-xs">
      <table className="w-full text-left">
        <thead className="bg-neutral-50 border-b border-[#E8E8E8]">
          <tr>
            <th className="p-3">Role</th>
            <th className="p-3">Publish Posts</th>
            <th className="p-3">Manage Channels</th>
            <th className="p-3">Billing</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#E8E8E8]">
            <td className="p-3 font-semibold">Admin</td>
            <td className="p-3 text-green-600">✓ Full</td>
            <td className="p-3 text-green-600">✓ Full</td>
            <td className="p-3 text-green-600">✓ Full</td>
          </tr>
          <tr>
            <td className="p-3 font-semibold">Contributor</td>
            <td className="p-3 text-amber-600">Draft only</td>
            <td className="p-3 text-red-500">✕ None</td>
            <td className="p-3 text-red-500">✕ None</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
