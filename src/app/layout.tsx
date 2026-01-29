import type React from "react"
import type { Metadata, Viewport } from "next"
import { Outfit, Inter } from "next/font/google"
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
import { TavusProvider } from "@/context/TavusContext"
import FacebookSDK from "@/components/social/FacebookSDK"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Quantum Studio | EdIntel Intelligence OS",
  description:
    "The Operating System for the Modern Educator. Reclaiming instructional time through spatial logistics & high-fidelity AI. Authorized for Mobile County Schools.",
  generator: "Quantum Studio v5.0",
  metadataBase: new URL('https://edintel-app.vercel.app'),
  openGraph: {
    title: "Quantum Studio | EdIntel Intelligence OS",
    description: "Spatial Glassmorphism interface enabling seamless transitions between instructional modules. Token Economy and AI Agents included.",
    url: 'https://edintel-app.vercel.app',
    siteName: 'Quantum Studio',
    images: [
      {
        url: '/quantum-studio-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Quantum Studio Interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Studio | EdIntel',
    description: 'The Operating System for the Modern Educator.',
    images: ['/quantum-studio-og.jpg'],
  },
  icons: {
    icon: "/favicon.ico",
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
      <head>
        {(process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            data-recording-token="94iiEpYqEzfg7cRVmAVcgyVxJr0P0aY8nunNQkKS"
            data-is-production-environment="false"
            src="https://snippet.meticulous.ai/v1/meticulous.js"
          />
        )}
      </head>
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <IntelligenceProvider>
            <TavusProvider>
              <FacebookSDK />
              <NeuralCursor />
              {children}
              <SovereignDelegate />
              <CommandPalette />
              <ClientLayoutValues />
              <MedicalDisclaimer />
              <Footer />
            </TavusProvider>
          </IntelligenceProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
