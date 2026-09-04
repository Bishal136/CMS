import { useState } from 'react';

export function useDragAndDrop() {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const onDragStart = (id: string) => setDraggingId(id);
  const onDragEnd = () => setDraggingId(null);

  return { draggingId, onDragStart, onDragEnd };
}
