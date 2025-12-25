import './globals.css'
import { Inter } from 'next/font/google'
import GlobalSovereignHeader from '@/components/Visuals/GlobalSovereignHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EdIntel | Sovereign Node',
  description: 'Dr. Alvin West - Chief Systems Architect',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalSovereignHeader />
        <main className="relative z-10 min-h-screen bg-black">
          {children}
        </main>
      </body>
    </html>
  )
}