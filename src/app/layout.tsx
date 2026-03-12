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
  userScalable: true,
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
          rel="stylesheet" 
        />
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
