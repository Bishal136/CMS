import { useState } from 'react';
import { IQueueSlot } from '../types/post.types';

export function useQueueSlots() {
  const [slots] = useState<IQueueSlot[]>([
    { id: 's1', time: '09:00 AM', date: 'Tomorrow, Sep 4' },
    { id: 's2', time: '01:00 PM', date: 'Tomorrow, Sep 4' },
    { id: 's3', time: '05:00 PM', date: 'Tomorrow, Sep 4' },
  ]);

  return { slots };
}
