import { Header } from '@/components/client/Header'
import { Loader } from '@/components/client/Loader'
import { PageEffects } from '@/components/client/PageEffects'
import { RobotAnimator } from '@/components/client/RobotAnimator'
import { BackgroundCircles, Contact, Footer, Hero, Pricing, ProjectCta, VisualDirection } from '@/components/sections'
import { getContent } from '@/lib/getContent'

// Página estática: se regenera cuando se guarda contenido en el panel (ver hooks/revalidateHome).
export const dynamic = 'force-static'

export default async function HomePage() {
  const content = await getContent()

  return (
    <>
      <Loader />
      <BackgroundCircles />
      <Header email={content.settings.email} />
      <Hero hero={content.home.hero} />
      <VisualDirection section={content.home.visualDirection} video={content.video} />
      <Pricing content={content} />
      <ProjectCta cta={content.home.projectCta} />
      <Contact content={content} />
      <Footer settings={content.settings} />
      <PageEffects />
      <RobotAnimator />
    </>
  )
}
