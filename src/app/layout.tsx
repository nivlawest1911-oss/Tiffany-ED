import type { Metadata } from 'next';
import '../style.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import WebVitalsReporter from '@/components/analytics/WebVitalsReporter';
import ClientShell from '@/components/layout/ClientShell';
import AccessibleLayout from '@/components/layout/AccessibleLayout';
import { Orbitron, Outfit, Playfair_Display } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  preload: true,
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://edintelai.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: 'EdIntel | Intelligence in Education',
  description: 'The definitive sovereign AI orchestrator for educators, site leaders, and district administrators. ALCOS pedagogy, FERPA compliance, and administrative load reduction.',
  manifest: '/manifest.json',
  icons: {
    icon: '/file.svg',
    apple: '/file.svg',
    shortcut: '/file.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'EdIntel',
  },
  authors: [{ name: 'EdIntel Founders Foundry', url: 'https://edintelai.vercel.app' }],
  creator: 'EdIntel',
  publisher: 'EdIntel Sovereign Platform',
  openGraph: {
    type: 'website',
    siteName: 'EdIntel',
    title: 'EdIntel — Intelligence in Education',
    description: 'Sovereign AI orchestrator for educators and district leaders in Alabama K-12.',
    url: 'https://edintelai.vercel.app',
    locale: 'en_US',
    images: [
      {
        url: '/file.svg',
        width: 1200,
        height: 630,
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdIntel — Intelligence in Education',
    description: 'Sovereign AI orchestrator for educators and district leaders in Alabama K-12.',
    site: '@EdIntelAI',
    images: [
      {
        url: '/file.svg',
        width: 1200,
        height: 630,
      },
    ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${orbitron.variable} ${outfit.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body className="bg-[#050505] text-gray-100 antialiased overflow-x-hidden selection:bg-[#D4AF37]/30 font-sans min-h-screen">
        <AuthProvider>
          <ClientShell />
          <AccessibleLayout>
            {children}
          </AccessibleLayout>
          <Toaster />
          <Analytics />
          <SpeedInsights />
          <WebVitalsReporter />
        </AuthProvider>
      </body>
    </html>
  );
}
