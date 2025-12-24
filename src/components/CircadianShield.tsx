'use client';
import { useEffect, useState } from 'react';

export default function CircadianShield() {
  const [warmth, setWarmth] = useState(0);

  useEffect(() => {
    const applyCircadianLogic = () => {
      const hour = new Date().getHours();
      // Peak filter between 10 PM and 5 AM
      const intensity = (hour >= 22 || hour <= 5) ? 0.5 : (hour >= 18 ? 0.2 : 0);
      setWarmth(intensity);
    };
    applyCircadianLogic();
    const interval = setInterval(applyCircadianLogic, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: 9999,
      backgroundColor: `rgba(255, 120, 0, ${warmth * 0.15})`,
      backdropFilter: `sepia(${warmth * 100}%)`,
      transition: 'all 5s ease-in-out'
    }} />
  );
}
