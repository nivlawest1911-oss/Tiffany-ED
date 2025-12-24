'use client';
import { useState, useEffect } from 'react';

export default function TrailModeBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const updateStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div style={{
      background: 'linear-gradient(90deg, #d4af37, #aa8a2e)',
      color: '#000', textAlign: 'center', padding: '10px',
      fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.8rem'
    }}>
      ⚠️ TRAIL MODE ACTIVE: LOCAL NEURAL CACHE ENGAGED. SYNCING PAUSED.
    </div>
  );
}
