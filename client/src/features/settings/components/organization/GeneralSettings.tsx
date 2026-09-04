import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const GeneralSettings: React.FC = () => {
  const [name, setName] = useState('Personal Workspace');

  return (
    <div className="space-y-4 max-w-md">
      <Input label="Organization Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Button>Update Organization</Button>
    </div>
  );
};
