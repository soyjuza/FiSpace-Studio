'use client'

import { useEffect } from 'react'

type RobotState = {
  svg: SVGSVGElement
  head: SVGGElement | null
  visible: boolean
  /** Mirada actual y objetivo, normalizadas en -1..1 */
  x: number
  y: number
  tx: number
  ty: number
  blinkTimer?: number
}

const EASE = 0.12 // suavizado por frame (más bajo = más perezoso)
const REACH = 520 // px de distancia al puntero para llegar a la mirada máxima

/**
 * Da vida a los robots SVG ([data-robot]):
 * - La cabeza y la cara siguen al puntero (ratón).
 * - Parpadean a intervalos aleatorios.
 * - Sin ratón (móvil/táctil) o con el puntero quieto, miran a puntos al azar.
 * - Con "reducir movimiento" activado no se anima nada.
 * Las transformaciones se aplican en CSS a partir de --look-x / --look-y.
 */
export function RobotAnimator() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const robots: RobotState[] = Array.from(
      document.querySelectorAll<SVGSVGElement>('svg[data-robot]'),
    ).map((svg) => ({
      svg,
      head: svg.querySelector<SVGGElement>('.rb-head'),
      visible: false,
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
    }))
    if (!robots.length) return

    let pointer: { x: number; y: number } | null = null
    let lastPointerMove = 0
    let raf = 0
    let idleTimer = 0

    const clamp = (v: number) => Math.max(-1, Math.min(1, v))

    // --- Parpadeo -------------------------------------------------------
    const scheduleBlink = (r: RobotState) => {
      r.blinkTimer = window.setTimeout(
        () => {
          if (r.visible && !document.hidden) {
            r.svg.classList.add('rb-blinking')
            window.setTimeout(() => r.svg.classList.remove('rb-blinking'), 180)
            // De vez en cuando, parpadeo doble
            if (Math.random() < 0.2) {
              window.setTimeout(() => {
                r.svg.classList.add('rb-blinking')
                window.setTimeout(() => r.svg.classList.remove('rb-blinking'), 160)
              }, 320)
            }
          }
          scheduleBlink(r)
        },
        2200 + Math.random() * 3800,
      )
    }
    robots.forEach(scheduleBlink)

    // --- Mirada al azar cuando no hay puntero ---------------------------
    const wander = () => {
      const idle = !pointer || performance.now() - lastPointerMove > 4000
      if (idle) {
        robots.forEach((r) => {
          if (Math.random() < 0.6) {
            r.tx = (Math.random() * 2 - 1) * 0.8
            r.ty = (Math.random() * 2 - 1) * 0.6
          }
        })
        start()
      }
      idleTimer = window.setTimeout(wander, 1600 + Math.random() * 2200)
    }
    idleTimer = window.setTimeout(wander, 1200)

    // --- Seguir al puntero ---------------------------------------------
    const aimAtPointer = () => {
      if (!pointer) return
      robots.forEach((r) => {
        if (!r.visible) return
        const box = (r.head ?? r.svg).getBoundingClientRect()
        const cx = box.left + box.width / 2
        const cy = box.top + box.height / 2
        r.tx = clamp((pointer!.x - cx) / REACH)
        r.ty = clamp((pointer!.y - cy) / REACH)
      })
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      pointer = { x: e.clientX, y: e.clientY }
      lastPointerMove = performance.now()
      start()
    }
    const onPointerLeave = () => {
      pointer = null
      robots.forEach((r) => {
        r.tx = 0
        r.ty = 0
      })
      start()
    }

    // --- Bucle de animación (se detiene solo cuando todo está quieto) ---
    const tick = () => {
      if (pointer && performance.now() - lastPointerMove < 4000) aimAtPointer()
      let moving = false
      robots.forEach((r) => {
        if (!r.visible) return
        r.x += (r.tx - r.x) * EASE
        r.y += (r.ty - r.y) * EASE
        if (Math.abs(r.tx - r.x) > 0.002 || Math.abs(r.ty - r.y) > 0.002) moving = true
        r.svg.style.setProperty('--look-x', r.x.toFixed(3))
        r.svg.style.setProperty('--look-y', r.y.toFixed(3))
      })
      raf = moving ? requestAnimationFrame(tick) : 0
    }
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    // Solo animamos los robots que están en pantalla
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const r = robots.find((rb) => rb.svg === entry.target)
        if (r) r.visible = entry.isIntersecting
      })
      start()
    })
    robots.forEach((r) => io.observe(r.svg))

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('scroll', start, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(idleTimer)
      robots.forEach((r) => clearTimeout(r.blinkTimer))
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('scroll', start)
    }
  }, [])

  return null
}
