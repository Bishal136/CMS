import { useState } from 'react';

export function usePostFilters() {
  const [channelFilter, setChannelFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  return { channelFilter, setChannelFilter, tagFilter, setTagFilter };
}
