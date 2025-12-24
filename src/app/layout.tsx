'use client';
import VoiceAssistant from '@/components/VoiceAssistant';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    window.addEventListener('offline', () => setIsOffline(true));
    window.addEventListener('online', () => setIsOffline(false));
  }, []);

  return (
    <html lang="en">
      <body>
        {isOffline && (
          <div style={{ background: '#d4af37', color: '#000', textAlign: 'center', padding: '5px', fontSize: '0.8rem' }}>
            ⚠️ TRAIL MODE ACTIVE: System operating on offline cache.
          </div>
        )}
        <main>{children}</main>
        <VoiceAssistant />
      </body>
    </html>
  );
}
