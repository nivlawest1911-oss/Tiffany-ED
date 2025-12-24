'use client';
import { useState, useEffect } from 'react';

export function useMorphicOrdering(baseTiles) {
  const [orderedTiles, setOrderedTiles] = useState(baseTiles);

  useEffect(() => {
    const usageData = JSON.parse(localStorage.getItem('edintel_usage') || '{}');
    const sorted = [...baseTiles].sort((a, b) => (usageData[b.id] || 0) - (usageData[a.id] || 0));
    setOrderedTiles(sorted);
  }, []);

  const recordInteraction = (id) => {
    const usageData = JSON.parse(localStorage.getItem('edintel_usage') || '{}');
    usageData[id] = (usageData[id] || 0) + 1;
    localStorage.setItem('edintel_usage', JSON.stringify(usageData));
  };

  return { orderedTiles, recordInteraction };
}
