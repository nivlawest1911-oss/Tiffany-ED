import type { Metadata } from 'next';
import { Playfair_Display, Outfit, Orbitron } from 'next/font/google';
import '../style.css';
import { AuthProvider } from '@/context/AuthContext';
import { IntelligenceProvider } from '@/context/IntelligenceContext';
import { EdIntelVibeProvider } from "@/context/EdIntelVibeContext";
import { CelebrationProvider } from '@/context/CelebrationContext';
import { SovereignProvider } from '@/context/SovereignState';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientShell from '@/components/layout/ClientShell';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata: Metadata = {
  metadataBase: new URL('https://edintel-app.vercel.app'),
  alternates: {
    canonical: '/',
  },
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
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdIntel — AI Operating System for Education Leaders',
    description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence.',
    creator: '@AlvinWe53959439',
    site: '@AlvinWe53959439',
    images: [
      {
        url: '/twitter-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  other: {
    'linkedin:profile': 'https://www.linkedin.com/in/alvin-west-ii-dba-11a75323/',
    'facebook:profile': 'https://www.facebook.com/alvin.west.18',
    'tiktok:creator': '@alvinwestii',
  },
};



export const viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} ${orbitron.variable} dark`}>
      <head>

      </head>
      <body className="bg-[#050505] text-gray-100 antialiased overflow-x-hidden selection:bg-[#D4AF37]/30 font-sans">
        <CelebrationProvider>
          <AuthProvider>
            <IntelligenceProvider>
              <SovereignProvider>
                <EdIntelVibeProvider>
                  <ClientShell />
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
