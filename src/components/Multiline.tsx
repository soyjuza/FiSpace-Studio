import { Fragment } from 'react'

/**
 * Muestra un texto del CMS respetando sus saltos de línea.
 * Antes de cada <br> va un espacio: si el CSS oculta los saltos (br { display: none })
 * las palabras no quedan pegadas.
 */
export function Multiline({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && (
            <>
              {' '}
              <br />
            </>
          )}
        </Fragment>
      ))}
    </>
  )
}
