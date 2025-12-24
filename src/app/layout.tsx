import '@/app/globals.css';
import CircadianShield from '@/components/CircadianShield';
import OfflineBanner from '@/components/OfflineBanner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#000' }}>
        <OfflineBanner />
        <CircadianShield />
        {children}
      </body>
    </html>
  );
}
