import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { getContent } from '@/lib/getContent'

// Imagen que aparece al compartir el link (WhatsApp, Instagram, LinkedIn, X...).
// Se genera en el build con el título actual del hero.

export const alt = 'FiSpace Studio — Estrategia visual de alta conversión'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const fontsDir = join(process.cwd(), 'node_modules/@fontsource/inter/files')

export default async function OpengraphImage() {
  const [content, inter400, inter800, logo] = await Promise.all([
    getContent(),
    readFile(join(fontsDir, 'inter-latin-400-normal.woff')),
    readFile(join(fontsDir, 'inter-latin-800-normal.woff')),
    readFile(join(process.cwd(), 'src/app/(frontend)/og-logo.png')),
  ])
  const { hero } = content.home
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 80px',
          gap: 60,
          background: '#000434',
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(221,68,221,0.45), transparent 45%), radial-gradient(circle at 10% 90%, rgba(0,238,255,0.25), transparent 50%)',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', fontSize: 28, color: '#17E1E1', marginBottom: 24, letterSpacing: '0.04em' }}>
            fispace studio
          </div>
          <div style={{ display: 'flex', fontSize: 66, fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            {hero.title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              backgroundImage: 'linear-gradient(90deg, #3D4CF5, #DD44DD)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {hero.titleHighlight}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: 'rgba(163,210,255,0.85)', marginTop: 30 }}>
            VSL · creativos para ads · monetización post-venta
          </div>
        </div>
        <img
          src={logoSrc}
          width={300}
          height={300}
          style={{ borderRadius: 300, boxShadow: '0 10px 60px rgba(61,76,245,0.6)' }}
          alt=""
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
        { name: 'Inter', data: inter800, weight: 800, style: 'normal' },
      ],
    },
  )
}
