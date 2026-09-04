import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';

export const SchedulePicker: React.FC = () => {
  const [dateTime, setDateTime] = useState('');

  return (
    <div className="my-3">
      <Input
        type="datetime-local"
        label="Schedule for later"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
    </div>
  );
};
