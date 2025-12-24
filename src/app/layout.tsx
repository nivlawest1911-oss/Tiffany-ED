import '@/app/globals.css';
import CircadianShield from '@/components/CircadianShield';
import NeuralReset from '@/components/NeuralReset';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#000', color: '#fff' }}>
        <CircadianShield />
        <NeuralReset />
        <main>{children}</main>
      </body>
    </html>
  );
}
