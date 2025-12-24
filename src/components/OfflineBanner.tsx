'use client';
import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    window.addEventListener('offline', () => setIsOffline(true));
    window.addEventListener('online', () => setIsOffline(false));
  }, []);

  if (!isOffline) return null;

  return (
    <div style={{
      background: '#d4af37', color: '#000', fontWeight: 'bold',
      textAlign: 'center', padding: '10px', fontSize: '0.9rem',
      letterSpacing: '1px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
    }}>
      ⚡ TRAIL MODE ACTIVE: System syncing to Local Neural Cache. Changes will push when District link restores.
    </div>
  );
}
