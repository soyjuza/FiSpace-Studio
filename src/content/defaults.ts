/**
 * Contenido inicial de la página.
 *
 * Se usa para sembrar la base de datos la primera vez (ver `src/seed.ts`)
 * y como respaldo si algún campo del CMS queda vacío.
 * Los saltos de línea (\n) en los textos se muestran como saltos reales en la página.
 */

export const defaultSettings = {
  email: 'fispacestudio@gmail.com',
  whatsappNumber: '573226575563',
  socialLinks: [
    { label: 'INSTAGRAM', url: 'https://www.instagram.com/fispacestudio?igsh=cm8xdnlqYnRudHQw' },
    { label: 'TWITTER', url: 'https://x.com/Fispacestudio' },
    { label: 'TIKTOK', url: 'https://www.tiktok.com/@fisdamn?_r=1&_t=ZS-94dmX8bkCRx' },
  ],
  footerText: '© 2026 FiSpace Studio — Estrategia Visual de Alta Conversión',
  creditName: 'soyjuza',
  creditUrl: 'https://github.com/soyjuza',
}

export const defaultHome = {
  hero: {
    title: 'Arquitectura visual para',
    titleHighlight: 'escalar ventas digitales.',
    description:
      'Optimizo VSL, creativos para ads y sistemas de monetización post-venta para infoproductores y e-commerce que quieren crecer con estructura, no con improvisación bajo estrategia visual de motion design.',
    primaryButtonLabel: 'Trabajemos juntos',
    secondaryButtonLabel: 'ver planes de trabajo',
  },
  visualDirection: {
    title: 'DIRECCIÓN VISUAL',
    videoCaption: 'calidad y dirección antes que efectos',
  },
  pricing: {
    title: 'Cómo colaboro con tu negocio',
    subtitle: 'construyo piezas visuales que elevan la percepción de valor\nde tu marca.',
  },
  projectCta: {
    title: 'Buscas algo más',
    titleHighlight: 'puntual?',
    subtitle:
      'También trabajo por proyecto cuando el\ncontexto lo justifica. VSLs, piezas clave o videos\nespecíficos que requieren un enfoque\nestratégico y cuidado visual.',
    boxLabel: 'describir proyecto',
    boxText:
      'Si tienes claro el objetivo y el video es\nparte central de tu negocio, escríbeme\ny lo evaluamos.',
    formUrl: 'https://tally.so/r/81dj8P',
  },
  contact: {
    title: 'Trabajo con un número',
    titleHighlight: 'limitado de marcas',
    description:
      'Solo colaboro activamente con 3 clientes al mismo tiempo.\nLo hago por enfoque.\nSi trabajamos juntos, me integro a tu sistema: analizo métricas, reviso rendimiento y\noptimizo de forma constante.',
    subtitle:
      'Si buscas dirección visual real orientada a métricas,\neste es el siguiente paso.\nCuéntame qué estás construyendo, qué estás vendiendo y dónde estás perdiendo rendimiento.\nSi veo que puedo aportar impacto real, trabajamos.\nSi no, te lo diré con honestidad.',
    whatsappLabel: 'Chat en WhatsApp',
    emailLabel: 'Enviar Email',
    socialText: '¿quieres saber más de mí?',
  },
}

export type PlanSeed = {
  title: string
  description: string
  introLabel: string
  features: { text: string }[]
  buttonLabel: string
  whatsappMessage: string
  highlighted: boolean
}

export const defaultPlans: PlanSeed[] = [
  {
    title: 'Optimización Estratégica de VSL',
    description: 'Me integro a tu VSL o webinar para intervenir donde realmente se pierden ventas.',
    introLabel: 'Trabajo sobre:',
    features: [
      { text: 'Estructura visual alineada al mensaje persuasivo.' },
      { text: 'Mejora de retención en momentos críticos.' },
      {
        text: 'Refuerzo estratégico de oferta y bonos Edición enfocada en conversión, no en estética.',
      },
      { text: 'Claridad visual.' },
    ],
    buttonLabel: 'Potenciar VSls',
    whatsappMessage:
      'Hola fisdamn! Estoy interesado en el plan de optimización de VSL.\nTe comentaré mi caso.',
    highlighted: false,
  },
  {
    title: 'Dirección Visual Continua (Contenido Orgánico Mensual)',
    description:
      'Para marcas personales e-commerce que entienden que el contenido no es relleno, es posicionamiento.',
    introLabel: 'Trabajo de forma mensual integrándome como:',
    features: [
      { text: 'Motion designer y estratega visual de contenido orgánico.' },
      { text: 'Supervisor de coherencia visual.' },
      { text: 'Adaptación a tendencias sin perder identidad.' },
      { text: 'Optimización del contenido para retención y claridad.' },
    ],
    buttonLabel: 'Adquirir plan',
    whatsappMessage:
      'Hola fisdamn! Estoy interesado en el plan de Dirección Visual Continua.\nTe comentaré lo siguiente:',
    highlighted: true,
  },
  {
    title: 'Sistema de Creativos para Ads (Test A/B continuo)',
    description: 'Desarrollo variaciones visuales pensadas para testeo y optimización real.',
    introLabel: 'incluye:',
    features: [
      { text: 'Hooks visuales de alto impacto.' },
      { text: 'Optimización de los primeros segundos.' },
      { text: 'Claridad inmediata del beneficio.' },
      { text: 'Estructura visual que guía la atención.' },
      { text: 'Motion estratégico cuando aporta rendimiento.' },
      { text: 'Percepción premium inmediata.' },
    ],
    buttonLabel: 'Ver sí encaja',
    whatsappMessage:
      'Hola fisdamn! Estoy interesado en el plan de Sistemas de creativos para Ads.\nQuiero más información.',
    highlighted: false,
  },
  {
    title: 'Arquitectura de Ascensión y Monetización',
    description: 'Me integro al embudo para optimizar la percepción y el valor post-compra.',
    introLabel: 'Trabajo en:',
    features: [
      { text: 'Videos de upsell y cross-sell' },
      { text: 'Bundles estratégicos' },
      { text: 'Refuerzo visual de oferta premium' },
      { text: 'Claridad en comparación de planes' },
      { text: 'Secuencias visuales post-compra' },
    ],
    buttonLabel: 'Ver si encaja',
    whatsappMessage:
      'Hola fisdamn! Estoy interesado en el plan Arquitectura de Ascencion y monetización.\nQuiero que formes parte de mi equipo.\nMi nombre es (escribir nombre)\nQuiero más información.',
    highlighted: false,
  },
]
