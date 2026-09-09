import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title
      ? `${title} | Greenden Plants`
      : 'Greenden | Plant Sales & Interior Decor';
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}