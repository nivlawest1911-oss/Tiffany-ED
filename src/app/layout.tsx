import type { Metadata } from 'next';
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
import { Orbitron, Outfit, Playfair_Display } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

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
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
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
        url: '/twitter-image.jpg',
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
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

import AccessibleLayout from '@/components/layout/AccessibleLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${outfit.variable} ${playfair.variable} bg-[#050505] text-gray-100 antialiased overflow-x-hidden selection:bg-[#D4AF37]/30 font-sans min-h-screen`}>
        <CelebrationProvider>
          <AuthProvider>
            <IntelligenceProvider>
              <SovereignProvider>
                <EdIntelVibeProvider>
                  <ClientShell />
                  <AccessibleLayout>
                    {children}
                  </AccessibleLayout>
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
