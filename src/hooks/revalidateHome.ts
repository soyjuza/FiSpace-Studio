import { revalidatePath } from 'next/cache'

/**
 * Regenera la página de inicio cuando se guarda algo en el panel,
 * para que los cambios se vean sin volver a desplegar.
 */
export const revalidateHome = ({ doc, req }: { doc?: unknown; req: { context: Record<string, unknown> } }) => {
  // Durante el seed (o scripts) no hay servidor de Next corriendo.
  if (!req.context.disableRevalidate) {
    try {
      revalidatePath('/')
    } catch {
      // Fuera de Next (CLI de Payload) revalidatePath no está disponible.
    }
  }
  return doc
}
