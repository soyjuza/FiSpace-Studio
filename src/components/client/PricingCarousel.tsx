'use client'

import { useEffect, useRef, useState } from 'react'

import { whatsappLink, type PlanCard } from '@/lib/links'

const delayClass = (i: number) => `reveal-delay-${Math.min(i + 1, 4)}`

const Stars = () => (
  <>
    <img src="/img/estrella-pricing.svg" className="estrella-pricing" alt="" />{' '}
    <img src="/img/estrella-pricing2.svg" className="estrella-pricing2" alt="" />{' '}
    <img src="/img/estrella-pricing3.svg" className="estrella-pricing3" alt="" />
  </>
)

/** Tarjetas de planes con scroll horizontal, puntos (móvil) y flechas (desktop). */
export function PricingCarousel({ plans, whatsappNumber }: { plans: PlanCard[]; whatsappNumber: string }) {
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const el = cardsRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth
      const progress = max > 0 ? el.scrollLeft / max : 0
      setActiveDot(Math.round(progress * (plans.length - 1)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [plans.length])

  const scrollTo = (end: boolean) => {
    const el = cardsRef.current
    if (!el) return
    el.scrollTo({ left: end ? el.scrollWidth : 0, behavior: 'smooth' })
    setAtEnd(end)
  }

  return (
    <>
      <div className="pricing-cards" ref={cardsRef}>
        {plans.map((plan, i) => (
          <div
            key={plan.id}
            className={`pricing-card${plan.highlighted ? ' card-highlight' : ''} reveal ${delayClass(i)}`}
          >
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

      {/* Indicador de scroll solo en móvil */}
      <div className="scroll-hint">
        {plans.map((p, i) => (
          <span key={p.id} className={`scroll-dot${i === activeDot ? ' active' : ''}`} />
        ))}
      </div>

      {/* Flechas de navegación desktop */}
      <div className="pricing-arrows">
        <button
          className={`pricing-arrow-btn pricing-arrow-left${atEnd ? '' : ' hidden'}`}
          aria-label="Ver primeras tarjetas"
          onClick={() => scrollTo(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="arrowGradL" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00EEFF" />
                <stop offset="100%" stopColor="#3D4CF5" />
              </linearGradient>
            </defs>
            <path d="M15 18l-6-6 6-6" stroke="url(#arrowGradL)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className={`pricing-arrow-btn pricing-arrow-right${atEnd ? ' hidden' : ''}`}
          aria-label="Ver más tarjetas"
          onClick={() => scrollTo(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="arrowGradR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3D4CF5" />
                <stop offset="100%" stopColor="#00EEFF" />
              </linearGradient>
            </defs>
            <path d="M9 18l6-6-6-6" stroke="url(#arrowGradR)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  )
}
