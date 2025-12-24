'use client';
import { useEffect, useState } from 'react';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isNight, setIsNight] = useState(false);

  // CIRCADIAN SHIELD LOGIC
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour > 19 || hour < 7) setIsNight(true); // Filters blue light after 7PM
  }, []);

  return (
    <html lang="en">
      <body className={isNight ? 'circadian-shield' : ''} style={{
        background: 'radial-gradient(all, #001f3f 0%, #000 100%)',
        minHeight: '100vh',
        color: '#fff',
        transition: 'filter 2s ease-in-out'
      }}>
        <nav style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>EDINTEL SUITE</span>
          <div style={{ gap: '20px', display: 'flex' }}>
            <a href="/archive">Vault</a>
            <a href="/cognitive">AI Audit</a>
            <a href="/board">Board</a>
            <a href="/pricing">Pricing</a>
          </div>
        </nav>
        <main>{children}</main>
        <style jsx global>{`
          .circadian-shield { filter: sepia(0.4) contrast(0.9); }
          .bento-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 20px; }
        `}</style>
      </body>
    </html>
  );
}
