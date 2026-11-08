'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { whatsappLink, type PlanCard } from '@/lib/links'

const Stars = () => (
  <>
    <img src="/img/estrella-pricing.svg" className="estrella-pricing" alt="" />{' '}
    <img src="/img/estrella-pricing2.svg" className="estrella-pricing2" alt="" />{' '}
    <img src="/img/estrella-pricing3.svg" className="estrella-pricing3" alt="" />
  </>
)

const Arrow = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`arrowGrad-${dir}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={dir === 'left' ? '#00EEFF' : '#3D4CF5'} />
        <stop offset="100%" stopColor={dir === 'left' ? '#3D4CF5' : '#00EEFF'} />
      </linearGradient>
    </defs>
    <path
      d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
      stroke={`url(#arrowGrad-${dir})`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * Tarjetas de planes en carrusel horizontal.
 * - Se puede deslizar con el dedo, el trackpad o las flechas (de a una tarjeta).
 * - Los puntos marcan la tarjeta actual y también sirven para saltar a otra.
 */
export function PricingCarousel({ plans, whatsappNumber }: { plans: PlanCard[]; whatsappNumber: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max - 4)
    // tarjeta activa = la más cercana al inicio visible (o la última si llegamos al final)
    const cards = Array.from(el.children) as HTMLElement[]
    if (el.scrollLeft >= max - 4) return setActive(cards.length - 1)
    let best = 0
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft) <
        Math.abs(cards[best].offsetLeft - el.offsetLeft - el.scrollLeft)) best = i
    })
    setActive(best)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const goTo = (i: number) => {
    const el = trackRef.current
    const card = el?.children[i] as HTMLElement | undefined
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - (el.children[0] as HTMLElement).offsetLeft, behavior: 'smooth' })
  }
  const step = (dir: 1 | -1) => {
    const el = trackRef.current
    const first = el?.children[0] as HTMLElement | undefined
    if (!el || !first) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <div className="pricing-carousel">
      <div className="pricing-cards reveal" ref={trackRef}>
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card${plan.highlighted ? ' card-highlight' : ''}`}>
            <h3 className="card-title">{plan.title}</h3>
            <p className="card-description">{plan.description}</p>
            {plan.introLabel && <p className="card-description pricing-referent">{plan.introLabel}</p>}
            <ul className="card-features">
              {plan.features.map((f, j) => (
                <li key={j}>{f.text}</li>
              ))}
            </ul>
            <a
              target="_blank"
              rel="noopener"
              href={whatsappLink(whatsappNumber, plan.whatsappMessage)}
              className="card-button"
            >
              {plan.buttonLabel} <Stars />
            </a>
          </div>
        ))}
      </div>

      {(canPrev || canNext) && (
        <div className="pricing-nav">
          <button
            className={`pricing-arrow-btn${canPrev ? '' : ' hidden'}`}
            aria-label="Plan anterior"
            onClick={() => step(-1)}
          >
            <Arrow dir="left" />
          </button>
          <div className="scroll-hint">
            {plans.map((p, i) => (
              <button
                key={p.id}
                className={`scroll-dot${i === active ? ' active' : ''}`}
                aria-label={`Ir al plan ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            className={`pricing-arrow-btn${canNext ? '' : ' hidden'}`}
            aria-label="Plan siguiente"
            onClick={() => step(1)}
          >
            <Arrow dir="right" />
          </button>
        </div>
      )}
    </div>
  )
}
