import type { Metadata } from 'next';
import { Inter, Playfair_Display, Outfit } from 'next/font/google';
import '../style.css';
import { AuthProvider } from '@/context/AuthContext';
import { IntelligenceProvider } from '@/context/IntelligenceContext';
import { EdIntelVibeProvider } from "@/context/EdIntelVibeContext";
import { CelebrationProvider } from '@/context/CelebrationContext';
import { SovereignProvider } from '@/context/SovereignState';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PWAInstall from '@/components/PWAInstall';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL('https://edintel-app.vercel.app'),
  title: 'EdIntel Professional | AI Operating System for Education',
  description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence. Sovereign analytics, neural delegation, and strategic insight — all in one platform.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'EdIntel',
  },
  authors: [{ name: 'Dr. Alvin West II', url: 'https://www.linkedin.com/in/alvin-west-ii-dba-11a75323/' }],
  creator: 'Dr. Alvin West II',
  publisher: 'EdIntel',
  openGraph: {
    type: 'website',
    siteName: 'EdIntel',
    title: 'EdIntel — AI Operating System for Education Leaders',
    description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence. Sovereign analytics, neural delegation, and strategic insight.',
    url: 'https://edintel-app.vercel.app',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdIntel — AI Operating System for Education Leaders',
    description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence.',
    creator: '@AlvinWe53959439',
    site: '@AlvinWe53959439',
  },
  other: {
    'linkedin:profile': 'https://www.linkedin.com/in/alvin-west-ii-dba-11a75323/',
    'facebook:profile': 'https://www.facebook.com/alvin.west.18',
    'tiktok:creator': '@alvinwestii',
  },
};



export const viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};


import GenerativeBackground from '@/components/layout/GenerativeBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${outfit.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet" />
      </head>
      <body className="bg-[#050505] text-gray-100 antialiased overflow-x-hidden selection:bg-[#00B0FF]/30 font-sans">
        <CelebrationProvider>
          <AuthProvider>
            <IntelligenceProvider>
              <SovereignProvider>
                <EdIntelVibeProvider>
                  <PWAInstall />
                  <GenerativeBackground />
                  <main className="relative z-10">
                    {children}
                  </main>
                  <Toaster position="top-right" theme="dark" />
                  <Analytics />
                  <SpeedInsights />
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                          if ('serviceWorker' in navigator) {
                            window.addEventListener('load', function() {
                              navigator.serviceWorker.register('/sw.js').then(
                                function(registration) {
                                  console.log('ServiceWorker registration successful with scope: ', registration.scope);
                                },
                                function(err) {
                                  console.log('ServiceWorker registration failed: ', err);
                                }
                              );
                            });
                          }
                        `,
                    }}
                  />
                </EdIntelVibeProvider>
              </SovereignProvider>
            </IntelligenceProvider>
          </AuthProvider>
        </CelebrationProvider>
      </body>
    </html>
  );
}
