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
import ConnectionStatus from "@/components/district/ConnectionStatus"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "EdIntel Sovereign | The Elite AI for Educational Capital & Freedom",
  description:
    "Join the sovereign revolution. Generate revenue, automate compliance, and liberate your time with the world's first Neural Educational Engine. 14-Day Free Access.",
  generator: "v0.app",
  metadataBase: new URL('https://edintel-app.vercel.app'),
  openGraph: {
    title: "EdIntel Sovereign | The Elite AI for Educational Capital",
    description: "Don't just teach. Govern. Generate revenue, automate compliance, and liberate your time with the world's first Neural Educational Engine.",
    url: 'https://edintel-app.vercel.app',
    siteName: 'EdIntel Sovereign',
    images: [
      {
        url: '/api/og?school=EdIntel%20Sovereign&plan=Join%20The%20Revolution&price=Free',
        width: 1200,
        height: 630,
        alt: 'EdIntel Sovereign - The Elite AI for Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdIntel Sovereign | The Elite AI for Education',
    description: 'Join the sovereign revolution. Generate revenue and automate compliance with AI.',
    images: ['/api/og?school=EdIntel%20Sovereign&plan=Join%20The%20Revolution&price=Free'],
  },
  icons: {
    icon: [
      {
        url: "/webrenew-icon-xl.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/webrenew-icon-xl.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/globe.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <AuthProvider>
          {children}
          <CommandPalette />
          <ClientLayoutValues />
          <MedicalDisclaimer />
          <ConnectionStatus />
          <Footer />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
