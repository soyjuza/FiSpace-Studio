'use client'

import { useEffect } from 'react'

/**
 * Efectos globales de la página:
 * - Scroll suave en los enlaces internos (#seccion).
 * - "Reveal": los elementos con .reveal aparecen al entrar en pantalla bajando.
 */
export function PageEffects() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a) return
      const target = document.querySelector(a.getAttribute('href')!)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('click', onClick)

    let lastY = window.scrollY
    const onScroll = () => {
      lastY = window.scrollY
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const scrollingDown = window.scrollY >= lastY
        entries.forEach((entry) => {
          if (entry.isIntersecting && scrollingDown) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    window.addEventListener('scroll', onScroll, { passive: true })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return null
}
