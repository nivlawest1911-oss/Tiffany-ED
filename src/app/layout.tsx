export const metadata = {
  title: 'EdIntel Strategic Suite',
  description: 'Mobile County Research & AI Twin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} style={{ margin: 0, padding: 0 }}>
        <Navbar />{children}
      </body>
    </html>
  )
}
