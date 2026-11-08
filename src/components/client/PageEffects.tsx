'use client'

import { useEffect } from 'react'

/**
 * Efectos globales de la página:
 * - Scroll suave en los enlaces internos (#seccion).
 * - "Reveal": los elementos con .reveal aparecen al entrar en pantalla.
 *   Bajando, con animación; subiendo (o al cargar a mitad de página), al instante,
 *   para que nunca queden huecos vacíos.
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

    const pending = new Set(document.querySelectorAll<HTMLElement>('.reveal'))

    const reveal = (el: Element, instant: boolean) => {
      if (instant) {
        el.classList.add('reveal-instant')
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('reveal-instant')))
      }
      el.classList.add('visible')
      pending.delete(el as HTMLElement)
      observer.unobserve(el)
    }

    let lastY = window.scrollY
    const observer = new IntersectionObserver(
      (entries) => {
        const y = window.scrollY
        const scrollingDown = y >= lastY
        lastY = y
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target, !scrollingDown)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    pending.forEach((el) => observer.observe(el))

    // Lo que quedó por encima de la pantalla sin llegar a verse (scroll rápido,
    // salto con un enlace o recarga a mitad de página) aparece sin animación.
    let ticking = false
    const revealSkipped = () => {
      ticking = false
      pending.forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) reveal(el, true)
      })
    }
    const onScroll = () => {
      if (!ticking && pending.size) {
        ticking = true
        requestAnimationFrame(revealSkipped)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    revealSkipped()

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return null
}
