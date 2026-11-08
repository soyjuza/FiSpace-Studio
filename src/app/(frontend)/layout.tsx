import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FiSpace Studio - Estrategia Visual de Alta Conversión',
  description:
    'Optimizo VSL, creativos para ads y sistemas de monetización post-venta para infoproductores y e-commerce.',
  icons: { icon: '/img/favicon-64.png', apple: '/img/apple-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
