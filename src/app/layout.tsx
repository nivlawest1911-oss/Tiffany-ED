import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthProvider } from '@/context/AuthContext';
import { IntelligenceProvider } from '@/context/IntelligenceContext';
import { TavusProvider } from '@/context/TavusContext';
import SovereignDelegate from '@/components/SovereignDelegate';
import CommandPalette from '@/components/CommandPalette';
import ClientLayoutValues from '@/components/ClientLayoutValues';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import FacebookSDK from '@/components/social/FacebookSDK';
import NeuralCursor from '@/components/NeuralCursor';
import TavusPlayer from '@/components/TavusPlayer';
import SovereignShell from '@/components/layout/SovereignShell';
import SovereignScroll from '@/components/layout/SovereignScroll';
import { CelebrationProvider } from '@/context/CelebrationContext';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'EdIntel Sovereign | Strategic Multi-Agent OS',
  description: 'The highest fidelity AI education operating system. Professional strategic intelligence for modern districts.',
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-sovereign-black text-white`} suppressHydrationWarning>
        <AuthProvider>
          <IntelligenceProvider>
            <TavusProvider>
              <CelebrationProvider>
                <FacebookSDK />
                <NeuralCursor />

                <SovereignScroll>
                  <SovereignShell>
                    {children}
                  </SovereignShell>
                </SovereignScroll>

                <SovereignDelegate />
                <TavusPlayer />
                <CommandPalette />
                <ClientLayoutValues />
                <MedicalDisclaimer />
              </CelebrationProvider>
            </TavusProvider>
          </IntelligenceProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
