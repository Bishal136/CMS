import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | CMS Management` : 'CMS Management';
    return () => {
      document.title = prev;
    };
  }, [title]);
}
