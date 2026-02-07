import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
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
import AppLayout from '@/components/layout/AppLayout';

import SovereignScroll from '@/components/layout/SovereignScroll';
import { CelebrationProvider } from '@/context/CelebrationContext';
import { SovereignMediaLayer } from '@/components/SovereignMediaLayer';

import type { Viewport } from 'next';

export const metadata: Metadata = {
  title: 'EdIntel Sovereign OS - God-Mode Education Intelligence',
  description: 'Unified operating system integrating 34 AI, Media, Governance, and Communication tools for district-wide education intelligence by Dr. Alvin West, Jr.',
};

export const viewport: Viewport = {
  themeColor: '#020617',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Performance: Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.heygen.com" />
        <link rel="dns-prefetch" href="https://api.openai.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        {/* Creative Protocol SDKs */}
        <script src="https://sdk.canva.com/designbutton/v2/api.js" async></script>
        <script src="https://sdk.cc-embed.adobe.com/v1/CCEverywhere.js" async></script>
      </head>
      <body className="font-sans antialiased selection:bg-primary/30" suppressHydrationWarning>
        <div className="fixed inset-0 bg-[#050505] -z-50" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] -z-40 pointer-events-none" />

        <SovereignMediaLayer />
        <AuthProvider>
          <IntelligenceProvider>
            <TavusProvider>
              <CelebrationProvider>
                <FacebookSDK />
                <NeuralCursor />

                <SovereignScroll>
                  <AppLayout>
                    {children}
                  </AppLayout>
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
