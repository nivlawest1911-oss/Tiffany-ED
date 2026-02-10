import type { Metadata } from 'next';
import { Inter, Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CelebrationProvider } from '@/context/CelebrationContext';
import { IntelligenceProvider } from '@/context/IntelligenceContext';
import { EdIntelVibeProvider } from "@/context/EdIntelVibeContext";
import { Toaster } from 'sonner';
import AppLayout from '@/components/layout/AppLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'EdIntel Professional | EdIntel Delegate',
  description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence.',
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
              <EdIntelVibeProvider>
                <AppLayout>
                  {children}
                </AppLayout>
              </EdIntelVibeProvider>
            </AuthProvider>
          </IntelligenceProvider>
        </CelebrationProvider>
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}
