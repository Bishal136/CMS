import { useState } from 'react';

export function useCommentFilters() {
  const [channelFilter, setChannelFilter] = useState<string | null>(null);
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);

  return { channelFilter, setChannelFilter, unreadOnly, setUnreadOnly };
}
