import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CommandPalette from "@/components/CommandPalette"
import ClientLayoutValues from "@/components/ClientLayoutValues"
import Footer from "@/components/Footer"
import MedicalDisclaimer from "@/components/MedicalDisclaimer"
import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"
import SovereignDelegate from "@/components/SovereignDelegate"
import { IntelligenceProvider } from "@/context/IntelligenceContext"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "EdIntel SOVEREIGN | Professional AI for Educational Leadership",
  description:
    "Empowering educational leaders with SOVEREIGN-level AI intelligence. Optimize time, ensure compliance, and focus on student success. Professional tools for modern education.",
  generator: "v0.app",
  metadataBase: new URL('https://edintel-app.vercel.app'),
  openGraph: {
    title: "EdIntel SOVEREIGN | Professional AI for Educational Leadership",
    description: "SOVEREIGN-level AI intelligence for educational excellence. Transform your leadership with advanced AI tools.",
    url: 'https://edintel-app.vercel.app',
    siteName: 'EdIntel SOVEREIGN',
    images: [
      {
        url: '/edintel-sovereign-logo.jpg',
        width: 1200,
        height: 1200,
        alt: 'EdIntel SOVEREIGN - Professional AI for Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdIntel SOVEREIGN | Professional AI for Education',
    description: 'SOVEREIGN-level AI intelligence for educational leaders.',
    images: ['/edintel-sovereign-logo.jpg'],
  },
  icons: {
    icon: [
      {
        url: "/edintel-sovereign-logo.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/edintel-sovereign-logo.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/globe.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/edintel-sovereign-logo.jpg",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

import NeuralCursor from "@/components/NeuralCursor"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <IntelligenceProvider>
            <NeuralCursor />
            {children}
            <SovereignDelegate />
            <CommandPalette />
            <ClientLayoutValues />
            <MedicalDisclaimer />
            <Footer />
          </IntelligenceProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
