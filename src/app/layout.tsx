import '@/app/globals.css';
import CircadianShield from '@/components/CircadianShield';
import TrailModeBanner from '@/components/TrailModeBanner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#000' }}>
        <TrailModeBanner />
        <CircadianShield />
        <main>{children}</main>
      </body>
    </html>
  );
}
