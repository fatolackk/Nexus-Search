import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEXUS - Cybernetic Search Engine',
  description: 'Modern cyberpunk search engine with TrustPositif filtering powered by Penulis4D',
  keywords: ['search engine', 'cyberpunk', 'trustpositif', 'penulis4d', 'nexus'],
  authors: [{ name: 'NEXUS Team' }],
  openGraph: {
    title: 'NEXUS - Cybernetic Search Engine',
    description: 'Modern cyberpunk search engine with advanced filtering',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS - Cybernetic Search Engine',
    description: 'Modern cyberpunk search engine with advanced filtering',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}