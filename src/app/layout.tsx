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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "EdIntel | Professional AI for Educational Leadership",
  description:
    "Empowering educational leaders to optimize time, ensure compliance, and focus on student success. Professional tools for modern education. 14-Day Free Access.",
  generator: "v0.app",
  metadataBase: new URL('https://edintel-app.vercel.app'),
  openGraph: {
    title: "EdIntel | Professional AI for Educational Leadership",
    description: "Optimize your time and ensure excellence in educational leadership with our professional AI tools.",
    url: 'https://edintel-app.vercel.app',
    siteName: 'EdIntel',
    images: [
      {
        url: '/api/og?school=EdIntel&plan=Get%20Started&price=Free',
        width: 1200,
        height: 630,
        alt: 'EdIntel - Professional AI for Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdIntel | Professional AI for Education',
    description: 'Empowering educational leaders with professional AI tools.',
    images: ['/api/og?school=EdIntel&plan=Get%20Started&price=Free'],
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
  children: React.ReactCenter
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <AuthProvider>
          {children}
          <CommandPalette />
          <ClientLayoutValues />
          <MedicalDisclaimer />
          <Footer />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
