import config from '@payload-config'
import { getPayload } from 'payload'

import { defaultHome, defaultPlans, defaultSettings } from '@/content/defaults'
import type { Media, Plan } from '@/payload-types'
import type { PlanCard } from '@/lib/links'

export { whatsappLink, type PlanCard } from '@/lib/links'

type DeepDefaults<T> = { [K in keyof T]: T[K] extends object ? DeepDefaults<T[K]> : T[K] }

/** Usa el valor del CMS, o el texto por defecto si el campo está vacío. */
function withDefaults<T extends Record<string, unknown>>(defaults: T, data: unknown): DeepDefaults<T> {
  const src = (data ?? {}) as Record<string, unknown>
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(defaults)) {
    const def = defaults[key]
    const val = src[key]
    if (def && typeof def === 'object' && !Array.isArray(def)) {
      out[key] = withDefaults(def as Record<string, unknown>, val)
    } else if (Array.isArray(def)) {
      out[key] = Array.isArray(val) && val.length ? val : def
    } else {
      out[key] = typeof val === 'string' ? val.trim() || def : (val ?? def)
    }
  }
  return out as DeepDefaults<T>
}

const mediaUrl = (m: unknown) => (m && typeof m === 'object' && 'url' in m ? ((m as Media).url ?? null) : null)

export async function getContent() {
  const payload = await getPayload({ config })

  const [home, settings, plans] = await Promise.all([
    payload.findGlobal({ slug: 'home', depth: 1 }),
    payload.findGlobal({ slug: 'site-settings', depth: 0 }),
    payload.find({ collection: 'plans', sort: '_order', limit: 50, depth: 0 }),
  ])

  const planCards: PlanCard[] = plans.docs.length
    ? plans.docs.map((p: Plan) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        introLabel: p.introLabel,
        features: (p.features ?? []).map((f) => ({ text: f.text })),
        buttonLabel: p.buttonLabel,
        whatsappMessage: p.whatsappMessage,
        highlighted: Boolean(p.highlighted),
      }))
    : defaultPlans.map((p, i) => ({ id: `default-${i}`, ...p }))

  return {
    home: withDefaults(defaultHome, home),
    video: {
      src: mediaUrl(home.visualDirection?.video) ?? '/video/intro.mp4',
      poster: mediaUrl(home.visualDirection?.poster),
    },
    settings: withDefaults(defaultSettings, settings),
    plans: planCards,
  }
}

export type SiteContent = Awaited<ReturnType<typeof getContent>>

