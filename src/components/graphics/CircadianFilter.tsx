'use client';
import { useEffect, useState } from 'react';

export default function CircadianFilter() {
  const [mounted, setMounted] = useState(false);
  const [hour, setHour] = useState(0);

  useEffect(() => {
     
    setMounted(true);
    setHour(new Date().getHours());
    const timer = setInterval(() => setHour(new Date().getHours()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Only render after the component has mounted on the client
  if (!mounted) return null;

  const isNight = hour >= 21 || hour <= 6;
  if (!isNight) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] bg-orange-500/10 mix-blend-multiply transition-opacity duration-1000" />
  );
}
