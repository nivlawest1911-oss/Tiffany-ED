'use client';
import { useEffect, useState } from 'react';

export default function CircadianShield() {
  const [filterIntensity, setFilterIntensity] = useState(0);

  useEffect(() => {
    const updateShield = () => {
      const hour = new Date().getHours();
      // Apply heavy filter (sepia/warmth) between 8 PM and 6 AM
      if (hour >= 20 || hour <= 6) {
        setFilterIntensity(0.4); 
      } else if (hour >= 18) {
        setFilterIntensity(0.2); // Transition at sunset
      } else {
        setFilterIntensity(0);
      }
    };
    updateShield();
    const interval = setInterval(updateShield, 60000);
    return () => clearInterval(interval);
  }, []);

  if (filterIntensity === 0) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: 9999,
      backgroundColor: `rgba(255, 150, 0, ${filterIntensity * 0.2})`,
      filter: `sepia(${filterIntensity})`,
      transition: 'all 2s ease-in-out'
    }} />
  );
}
