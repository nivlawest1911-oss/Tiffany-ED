import type { Metadata } from 'next';
import { Inter, Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { IntelligenceProvider } from '@/context/IntelligenceContext';
import { EdIntelVibeProvider } from "@/context/EdIntelVibeContext";
import { CelebrationProvider } from '@/context/CelebrationContext';
import { SovereignProvider } from '@/context/SovereignState';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL('https://edintel.ai'),
  title: 'EdIntel Professional | EdIntel Delegate',
  description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
        <body className="bg-background text-foreground antialiased overflow-x-hidden selection:bg-blue-500/30 font-sans">
          <AuthProvider>
            <CelebrationProvider>
              <IntelligenceProvider>
                <SovereignProvider>
                  <EdIntelVibeProvider>
                    {children}
                    <Toaster position="top-right" theme="dark" />
                    <Analytics />
                    <SpeedInsights />
                  </EdIntelVibeProvider>
                </SovereignProvider>
              </IntelligenceProvider>
            </CelebrationProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
