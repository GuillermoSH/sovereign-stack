import type { ComponentType } from 'react'

export interface PostFrontmatter {
  title: string
  date: string
  excerpt?: string
  tags?: string[]
}

interface PostModule {
  default: ComponentType
  frontmatter: PostFrontmatter
}

const modules = import.meta.glob<PostModule>('./content/blog/*.mdx', { eager: true })

export interface Post extends PostFrontmatter {
  slug: string
  Component: ComponentType
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.replace('./content/blog/', '').replace(/\.mdx$/, '')
    return {
      slug,
      Component: mod.default,
      ...mod.frontmatter,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

/** Slug de anchor determinista para encabezados del cuerpo del post (usado por el índice). */
export function slugifyHeading(text: string): string {
  const diacritics = new RegExp('[\\u0300-\\u036f]', 'g')
  const slug = text
    .normalize('NFD')
    .replace(diacritics, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  // Un id que empieza por dígito es válido en HTML pero rompe selectores CSS
  // (querySelector, :target styling) — se prefija por si algo lo necesita.
  return /^[0-9]/.test(slug) ? `s-${slug}` : slug
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function formatPostDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`)
  return new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}
