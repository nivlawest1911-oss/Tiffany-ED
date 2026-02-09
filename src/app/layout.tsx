import type { Metadata } from 'next';
import { Inter, Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CelebrationProvider } from '@/context/CelebrationContext';
import { IntelligenceProvider } from '@/context/IntelligenceContext';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Sovereign OS | Digital Command',
  description: 'The definitive operating layer for autonomous digital assets and sovereign identity.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
      <body className="bg-background text-foreground antialiased overflow-x-hidden selection:bg-blue-500/30 font-sans">
        <CelebrationProvider>
          <IntelligenceProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </IntelligenceProvider>
        </CelebrationProvider>
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}
