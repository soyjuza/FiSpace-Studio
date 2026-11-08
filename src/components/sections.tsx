import { PricingCarousel } from './client/PricingCarousel'
import { VideoPlayer } from './client/VideoPlayer'
import { Multiline } from './Multiline'
import { Robot } from './robot/Robot'
import type { SiteContent } from '@/lib/getContent'
import { whatsappLink } from '@/lib/links'

/** Fondo de todo lo que va debajo del hero (ver .flow-bg en globals.css). */
export function PageFlowBackground() {
  return <div className="flow-bg" aria-hidden="true" />
}

export function Hero({ hero }: { hero: SiteContent['home']['hero'] }) {
  return (
    <section className="hero">
      {/* Fondo del hero según el concepto original: luces en las esquinas y una
          línea oscura nítida que baja por la izquierda, pasa bajo el subtítulo,
          sube detrás del robot y sale por abajo a la derecha. */}
      <div className="hero-bg" aria-hidden="true">
        <svg className="hero-band hero-band--desktop" viewBox="0 0 1600 900" preserveAspectRatio="none">
          <path d="M51,-40 L51,150 C51,360 150,575 385,575 C600,575 700,420 950,330 C1180,250 1380,420 1440,615 C1480,740 1515,820 1515,980" />
        </svg>
        {/* Misma línea para pantalla parada (tablet y celular): baja por la
            izquierda, cruza bajo los botones, pasa detrás del robot y sale abajo a la derecha */}
        <svg className="hero-band hero-band--mobile" viewBox="0 0 400 1000" preserveAspectRatio="none">
          <path d="M16,-40 L16,400 C16,540 100,590 210,605 C320,620 384,700 384,830 L384,1040" />
        </svg>
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hola">
            {hero.title} <img src="/img/estrella-hero2.svg" className="estrella-hero2" alt="" />
            <br />
            <span className="highlight">{hero.titleHighlight}</span>
          </h1>
          <p>
            <Multiline text={hero.description} />
          </p>
          <div className="hero-buttons">
            <a href="#contacto" className="btn-primary">
              {hero.primaryButtonLabel} <img src="/img/estrella_hero.svg" className="estrella-icon-hero" alt="" />
            </a>
            <a href="#planes" className="btn-secondary">
              <samp className="hero-btn-secundario">{hero.secondaryButtonLabel}</samp>
            </a>
          </div>
        </div>
        <div className="hero-mascot">
          <div className="mascot-container">
            <img src="/img/mano-derecha.svg" className="hand-layer-left" alt="" />
            <img src="/img/mano-izquierda.svg" className="hand-layer-right" alt="" />
            <Robot variant="hero" className="robot-layer" />
            <div className="logo-circle-layer">
              <img src="/img/logo.webp" className="pablo-img" alt="FiSpace Studio Logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function VisualDirection({
  section,
  video,
}: {
  section: SiteContent['home']['visualDirection']
  video: SiteContent['video']
}) {
  return (
    <section className="visual-direction">
      <h2 className="section-title reveal">{section.title}</h2>
      <img src="/img/estrella-visual-direction.svg" className="estrella-visualdirection" alt="" />
      <div className="video-container reveal reveal-scale reveal-delay-2">
        <VideoPlayer src={video.src} poster={video.poster} caption={section.videoCaption} />
      </div>
    </section>
  )
}

export function Pricing({ content }: { content: SiteContent }) {
  const { pricing } = content.home
  return (
    <section className="pricing" id="planes">
      <h2 className="pricing-title reveal">{pricing.title}</h2>
      <p className="pricing-subtitle reveal reveal-delay-1">
        <Multiline text={pricing.subtitle} />
      </p>
      <PricingCarousel plans={content.plans} whatsappNumber={content.settings.whatsappNumber} />
    </section>
  )
}

export function ProjectCta({ cta }: { cta: SiteContent['home']['projectCta'] }) {
  return (
    <section className="project-cta">
      <div className="cta-wrapper reveal reveal-scale">
        <div className="cta-content">
          <h2 className="cta-title">
            {cta.title} <br /> <span className="highlight">{cta.titleHighlight}</span>
          </h2>
          <p className="cta-subtitle">
            <Multiline text={cta.subtitle} />
          </p>
        </div>

        <div className="cta-figure">
          <Robot variant="project" className="robot2" />
          <img src="/img/mano-izquierda2.svg" className="hand-layer-left2" alt="" />
          <a href={cta.formUrl} target="_blank" rel="noopener" className="cta-sign">
            <span className="cta-box-label">
              {cta.boxLabel} <img src="/img/estrella-projet.webp" className="estrella-icon" alt="" />
            </span>
            <span className="cta-box">
              <span className="cta-box-text">
                <Multiline text={cta.boxText} />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export function Contact({ content }: { content: SiteContent }) {
  const { contact } = content.home
  const { settings } = content
  return (
    <section className="contact" id="contacto">
      <div className="contact-content reveal reveal-scale">
        <h2 className="contact-title reveal reveal-delay-1">
          {contact.title} <br /> <span className="highlight">{contact.titleHighlight}</span>
        </h2>
        <p className="contact-description reveal reveal-delay-2">
          <Multiline text={contact.description} />
        </p>
        <p className="contact-subtitle reveal reveal-delay-2">
          <Multiline text={contact.subtitle} />
        </p>
        <div className="contact-buttons reveal reveal-delay-3">
          <div className="btn-whatsapp-wrap">
            <img src="/img/mano-izquierda3.svg" className="hand-layer-left3" alt="" />
            <Robot variant="contact" className="robot3" />
            <a target="_blank" rel="noopener" href={whatsappLink(settings.whatsappNumber)} className="btn-whatsapp">
              <img src="/img/whatsapp-icon.webp" className="whatsapp-icon" alt="" /> {contact.whatsappLabel}
            </a>
          </div>
          <a href={`mailto:${settings.email}`} className="btn-email">
            <img src="/img/gmail.webp" className="email-icon" alt="" /> {contact.emailLabel}
          </a>
        </div>
        <p className="social-text">{contact.socialText}</p>
        <div className="linea" />
        <div className="social-links" id="redes">
          {settings.socialLinks.map((s) => (
            <a key={s.url} target="_blank" rel="noopener" href={s.url} className="social-link">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer({ settings }: { settings: SiteContent['settings'] }) {
  return (
    <footer>
      <div className="footer-content">
        <p className="footer-copy">{settings.footerText}</p>
        <p className="footer-credit">
          Diseñado y desarrollado por
          <a href={settings.creditUrl} target="_blank" rel="noopener" className="footer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {settings.creditName}
          </a>
        </p>
      </div>
    </footer>
  )
}
