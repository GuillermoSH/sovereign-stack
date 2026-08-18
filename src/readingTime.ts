import { createElement, type ComponentType } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const WORDS_PER_MINUTE = 200

// Vendido a su propio módulo (en vez de vivir en blog.ts) porque App.tsx importa
// blog.ts en el bundle eager de la home para el carrusel de últimos posts — arrastrar
// react-dom/server ahí infla ese bundle sin necesidad. Este módulo solo lo importa
// BlogPost.tsx, que ya está code-split.
//
// El plugin de MDX intercepta cualquier import de un .mdx (incluido `?raw`) y lo
// compila igualmente, así que no hay forma limpia de leer el markdown fuente para
// contar palabras. En su lugar se renderiza el componente ya compilado a HTML
// estático (sin DOM, en memoria) y se cuenta el texto plano resultante.
export function estimateReadingMinutes(Component: ComponentType): number {
  const html = renderToStaticMarkup(createElement(Component))
  const text = html.replace(/<[^>]+>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
