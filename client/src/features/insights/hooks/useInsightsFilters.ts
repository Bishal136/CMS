import { useState } from 'react';

export function useInsightsFilters() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  return { selectedChannel, setSelectedChannel };
}
