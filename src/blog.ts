import type { ComponentType } from 'react'
import type { Lang } from './i18n'

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

const modules = import.meta.glob<PostModule>('./content/blog/*.{es,en}.mdx', { eager: true })

export interface Post extends PostFrontmatter {
  slug: string
  lang: Lang
  Component: ComponentType
}

function parsePath(path: string): { slug: string; lang: Lang } | null {
  const match = path.match(/\.\/content\/blog\/(.+)\.(es|en)\.mdx$/)
  if (!match) return null
  return { slug: match[1], lang: match[2] as Lang }
}

const allPosts: Post[] = Object.entries(modules)
  .map(([path, mod]) => {
    const parsed = parsePath(path)
    if (!parsed) return null
    return {
      slug: parsed.slug,
      lang: parsed.lang,
      Component: mod.default,
      ...mod.frontmatter,
    }
  })
  .filter((p): p is Post => p !== null)
  .sort((a, b) => b.date.localeCompare(a.date))

/** Posts for a language; falls back to the other locale when a translation is missing. */
export function getPosts(lang: Lang): Post[] {
  const bySlug = new Map<string, Post>()
  const preferred = allPosts.filter((p) => p.lang === lang)
  const fallback = allPosts.filter((p) => p.lang !== lang)

  for (const post of preferred) bySlug.set(post.slug, post)
  for (const post of fallback) {
    if (!bySlug.has(post.slug)) bySlug.set(post.slug, post)
  }

  return Array.from(bySlug.values()).sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string, lang: Lang): Post | undefined {
  return (
    allPosts.find((p) => p.slug === slug && p.lang === lang) ??
    allPosts.find((p) => p.slug === slug)
  )
}

/** Deterministic heading slug for post body anchors (used by the TOC). */
export function slugifyHeading(text: string): string {
  const diacritics = new RegExp('[\\u0300-\\u036f]', 'g')
  const slug = text
    .normalize('NFD')
    .replace(diacritics, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return /^[0-9]/.test(slug) ? `s-${slug}` : slug
}

export function formatPostDate(iso: string, lang: Lang = 'es'): string {
  const d = new Date(`${iso}T12:00:00`)
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}
