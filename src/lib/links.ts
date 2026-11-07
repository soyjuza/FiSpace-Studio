// Utilidades sin dependencias de servidor: se pueden usar en componentes cliente.

export type PlanCard = {
  id: string | number
  title: string
  description: string
  introLabel?: string | null
  features: { text: string }[]
  buttonLabel: string
  whatsappMessage?: string | null
  highlighted: boolean
}

export const whatsappLink = (number: string, message?: string | null) =>
  `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
