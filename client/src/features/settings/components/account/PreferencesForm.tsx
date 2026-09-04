import React from 'react';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export const PreferencesForm: React.FC = () => {
  return (
    <div className="space-y-4 max-w-md">
      <Select
        label="Timezone"
        options={[
          { value: 'UTC', label: 'UTC (+00:00)' },
          { value: 'Asia/Dhaka', label: 'Dhaka (+06:00)' },
          { value: 'America/New_York', label: 'Eastern Time (-05:00)' },
        ]}
      />
      <Select
        label="Time Format"
        options={[
          { value: '12h', label: '12-hour (9:00 AM)' },
          { value: '24h', label: '24-hour (09:00)' },
        ]}
      />
      <Button>Save Preferences</Button>
    </div>
  );
};
