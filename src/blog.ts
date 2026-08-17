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
