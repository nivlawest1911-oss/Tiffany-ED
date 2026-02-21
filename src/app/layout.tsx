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
import PWAInstall from '@/components/PWAInstall';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL('https://edintel.ai'),
  title: 'EdIntel Professional | EdIntel Delegate',
  description: 'The definitive AI operating layer for autonomous professionals and institutional intelligence.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#2563eb',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'EdIntel',
  },
};

import { ClerkProvider } from '@clerk/nextjs';
import GenerativeBackground from '@/components/layout/GenerativeBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        layout: {
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorPrimary: '#00B0FF',
          colorText: '#ffffff',
          colorBackground: '#020617',
          borderRadius: '0.75rem',
          colorTextSecondary: '#9ca3af',
        },
        elements: {
          card: 'shadow-lg border border-white/10 backdrop-blur-xl bg-slate-900/90',
          navbar: 'hidden',
          headerTitle: 'text-[#00B0FF]',
          headerSubtitle: 'text-gray-400',
          socialButtonsBlockButton: 'border-white/10 hover:bg-white/5 text-white',
          formButtonPrimary: 'bg-[#00B0FF] hover:bg-[#0090D0] text-white font-bold',
          formFieldLabel: 'text-gray-300',
          formFieldInput: 'bg-slate-800/50 border-white/10 text-white focus:border-[#00B0FF] focus:ring-[#00B0FF]',
          footerActionLink: 'text-[#00B0FF] hover:text-[#0090D0]',
        }
      }}
    >
      <html lang="en" className={`${inter.variable} ${playfair.variable} ${outfit.variable} dark`}>
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
    </ClerkProvider>
  );
}
