'use client';
import { useEffect, useState } from 'react';

export function useMorphicOrdering(initialItems) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    // Load usage weights from local storage
    const weights = JSON.parse(localStorage.getItem('edintel_usage') || '{}');
    const sorted = [...initialItems].sort((a, b) => (weights[b.title] || 0) - (weights[a.title] || 0));
    setItems(sorted);
  }, []);

  const trackClick = (title) => {
    const weights = JSON.parse(localStorage.getItem('edintel_usage') || '{}');
    weights[title] = (weights[title] || 0) + 1;
    localStorage.setItem('edintel_usage', JSON.stringify(weights));
  };

  return { items, trackClick };
}
