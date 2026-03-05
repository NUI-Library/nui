import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NUI — React UI Library',
  description: 'A React UI library with custom initialization, powerful theming, and zero dependencies.',
  icons: {
    icon: [
      {
        url: '/N.png',
        type: 'image/svg+xml',
      },
    ]
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
