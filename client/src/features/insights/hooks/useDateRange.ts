import { useState } from 'react';
import { TDatePreset } from '@/components/ui/DateRangeSelector';

export function useDateRange() {
  const [preset, setPreset] = useState<TDatePreset>('30d');
  return { preset, setPreset };
}
