import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import { siteUrl } from '@/lib/site'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const title = 'FiSpace Studio - Estrategia Visual de Alta Conversión'
const description =
  'Optimizo VSL, creativos para ads y sistemas de monetización post-venta para infoproductores y e-commerce.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  icons: { icon: '/img/favicon-64.png', apple: '/img/apple-icon.png' },
  openGraph: {
    type: 'website',
    locale: 'es_LA',
    url: '/',
    siteName: 'FiSpace Studio',
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
