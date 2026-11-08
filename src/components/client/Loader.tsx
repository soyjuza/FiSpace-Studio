'use client'

import { useEffect, useRef, useState } from 'react'

const MIN_TIME = 700 // ms mínimo que se muestra el loader (primera visita)
const MIN_TIME_REPEAT = 150 // si ya lo vio en esta sesión (p. ej. al recargar)
const MAX_WAIT = 2500 // nunca esperamos más que esto, aunque falte alguna imagen

/**
 * Pantalla de carga: espera solo las imágenes del hero (lo primero que se ve)
 * y sale con animación. Las de más abajo siguen cargando sin bloquear.
 */
export function Loader() {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [hidden, setHidden] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.classList.add('loading')
    let fake = 0
    let done = false

    const fakeInterval = setInterval(() => {
      // Avanza rápido al inicio y frena al acercarse a 85%
      const step = fake < 40 ? 4 : fake < 70 ? 2 : 0.5
      fake = Math.min(85, fake + step)
      if (!done) setProgress((p) => Math.max(p, fake))
    }, 80)

    let seen = false
    try {
      seen = sessionStorage.getItem('fispace-loader') === '1'
      sessionStorage.setItem('fispace-loader', '1')
    } catch {}

    const images = Array.from(document.querySelectorAll<HTMLImageElement>('.hero img'))
    const imagesLoaded = new Promise<void>((resolve) => {
      if (!images.length) return resolve()
      let loaded = 0
      const onLoad = () => {
        loaded++
        setProgress((p) => Math.max(p, (loaded / images.length) * 100))
        if (loaded >= images.length) resolve()
      }
      images.forEach((img) => {
        if (img.complete) onLoad()
        else {
          img.addEventListener('load', onLoad, { once: true })
          img.addEventListener('error', onLoad, { once: true })
        }
      })
    })

    let exitTimer: ReturnType<typeof setTimeout>
    const capped = Promise.race([imagesLoaded, new Promise((r) => setTimeout(r, MAX_WAIT))])
    const minTime = new Promise((r) => setTimeout(r, seen ? MIN_TIME_REPEAT : MIN_TIME))
    Promise.all([capped, minTime]).then(() => {
      done = true
      clearInterval(fakeInterval)
      setProgress(100)
      // Pequeño delay para que se vea el 100% antes de salir
      exitTimer = setTimeout(() => setExiting(true), seen ? 0 : 200)
    })

    return () => {
      clearInterval(fakeInterval)
      clearTimeout(exitTimer)
    }
  }, [])

  if (hidden) return null

  const pct = Math.round(Math.min(100, progress))

  return (
    <div
      id="page-loader"
      ref={ref}
      className={exiting ? 'loader-exit' : undefined}
      onTransitionEnd={(e) => {
        if (exiting && e.target === ref.current) {
          document.body.classList.remove('loading')
          setHidden(true)
        }
      }}
    >
      <div className="loader-orb loader-orb-1" />
      <div className="loader-orb loader-orb-2" />
      <div className="loader-orb loader-orb-3" />

      <div className="loader-content">
        <div className="loader-brand">
          <span className="loader-brand-name">fispace</span>
          <span className="loader-brand-accent">studio</span>
        </div>
        <p className="loader-tagline">cargando experiencia visual</p>

        <div className="loader-bar-wrap">
          <div className="loader-bar-track">
            <div className="loader-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="loader-pct">{pct}%</span>
        </div>

        <div className="loader-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}
