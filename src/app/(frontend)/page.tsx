import { Header } from '@/components/client/Header'
import { Loader } from '@/components/client/Loader'
import { PageEffects } from '@/components/client/PageEffects'
import { RobotAnimator } from '@/components/client/RobotAnimator'
import { Contact, Footer, Hero, PageFlowBackground, Pricing, ProjectCta, VisualDirection } from '@/components/sections'
import { getContent } from '@/lib/getContent'
import { siteUrl } from '@/lib/site'

// Página estática: se regenera cuando se guarda contenido en el panel (ver hooks/revalidateHome).
export const dynamic = 'force-static'

export default async function HomePage() {
  const content = await getContent()
  const { settings } = content

  // Datos del negocio para Google (aparecen en búsquedas y ayudan al SEO)
  const businessId = `${siteUrl}/#negocio`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#sitio`,
        url: siteUrl,
        name: 'FiSpace Studio',
        inLanguage: 'es',
        publisher: { '@id': businessId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': businessId,
        name: 'FiSpace Studio',
        url: siteUrl,
        image: `${siteUrl}/opengraph-image`,
        logo: `${siteUrl}/img/apple-icon.png`,
        description:
          'Estrategia visual de alta conversión: VSL, creativos para ads y sistemas de monetización post-venta.',
        email: settings.email,
        telephone: `+${settings.whatsappNumber}`,
        // Links limpios (sin parámetros de rastreo como ?igsh=) para que Google reconozca el perfil
        sameAs: settings.socialLinks.map((s) => s.url.split('?')[0]),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Loader />
      <Header email={content.settings.email} />
      <Hero hero={content.home.hero} />
      <div className="page-flow">
        <PageFlowBackground />
        <VisualDirection section={content.home.visualDirection} video={content.video} />
        <Pricing content={content} />
        <ProjectCta cta={content.home.projectCta} />
        <Contact content={content} />
        <Footer settings={content.settings} />
      </div>
      <PageEffects />
      <RobotAnimator />
    </>
  )
}
