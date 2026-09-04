import { useState } from 'react';

export function useIdeaFilters() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return { selectedTag, setSelectedTag, searchQuery, setSearchQuery };
}
