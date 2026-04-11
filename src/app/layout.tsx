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
import WebVitalsReporter from '@/components/analytics/WebVitalsReporter';
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
  metadataBase: new URL('https://edintelai.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: 'EdIntel Professional | AI Operating System for Education',
  description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence. Sovereign analytics, neural delegation, and strategic insight — all in one platform.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edintel_logo_high_fidelity_1774298407403.png-40aMNM0IwgAivJXguDqZ1AimCtnxVu.jpeg', sizes: '192x192', type: 'image/jpeg' },
      { url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edintel_logo_high_fidelity_1774298407403.png-40aMNM0IwgAivJXguDqZ1AimCtnxVu.jpeg', sizes: '512x512', type: 'image/jpeg' },
    ],
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edintel_logo_high_fidelity_1774298407403.png-40aMNM0IwgAivJXguDqZ1AimCtnxVu.jpeg',
    shortcut: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edintel_logo_high_fidelity_1774298407403.png-40aMNM0IwgAivJXguDqZ1AimCtnxVu.jpeg',
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
    url: 'https://edintelai.vercel.app',
    locale: 'en_US',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edintel_logo_high_fidelity_1774298407403.png-40aMNM0IwgAivJXguDqZ1AimCtnxVu.jpeg',
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
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edintel_logo_high_fidelity_1774298407403.png-40aMNM0IwgAivJXguDqZ1AimCtnxVu.jpeg',
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
    <html lang="en" className={`dark ${orbitron.variable} ${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://nivlawest1911-oss.supabase.co" />
      </head>
      <body className="bg-[#050505] text-gray-100 antialiased overflow-x-hidden selection:bg-[#D4AF37]/30 font-sans min-h-screen">
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
                  <WebVitalsReporter />
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
