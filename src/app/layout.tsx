import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CommandPalette from "@/components/CommandPalette"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "EdIntel Sovereign | Cognitive Leadership Platform",
  description:
    "The future of cognitive leadership. AI-powered education intelligence platform for administrators, teachers, and districts.",
  generator: "v0.app",
  metadataBase: new URL('https://edintel-app.vercel.app'),
  openGraph: {
    title: "EdIntel Sovereign | AI-Powered Education Platform",
    description: "Transform education with AI. Generate IEPs, lesson plans, and more for Mobile County schools.",
    url: 'https://edintel-app.vercel.app',
    siteName: 'EdIntel Sovereign',
    images: [
      {
        url: '/api/og?school=Mobile County Schools&plan=Professional&price=$79',
        width: 1200,
        height: 630,
        alt: 'EdIntel Sovereign - AI-Powered Education Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdIntel Sovereign | AI-Powered Education',
    description: 'Transform education with AI for Mobile County schools',
    images: ['/api/og?school=Mobile County Schools&plan=Professional&price=$79'],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
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
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <CommandPalette />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
