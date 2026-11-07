'use client'

import { useEffect, useRef, useState } from 'react'

/** Barra superior: se oculta al bajar y aparece al subir. */
export function Header({ email }: { email: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y > lastY.current && y > 80) setHidden(true)
      else if (y < lastY.current) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [user, domain] = email.split('@')

  return (
    <header className={[scrolled && 'scrolled', hidden && 'hidden'].filter(Boolean).join(' ')}>
      <div className="header-pill">
        <div className="header-content">
          <div className="logo">
            <a href={`mailto:${email}`}>
              <span className="logo-name">{user}</span>
              {domain && <span className="logo-domain">@{domain}</span>}
            </a>
          </div>
          <nav>
            <a href="#redes">ver redes</a>
            <a href="#contacto" className="btn-contacto">
              CONTACTO
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
