import { useEffect } from 'react'

export const SITE_NAME = 'Sovereign Stack'
/** Default social image — drop your asset at `public/og.png` (1200×630). */
export const DEFAULT_OG_IMAGE = '/og.png'

export type PageSeo = {
  title: string
  description: string
  /** Path only, e.g. `/blog/foo` — used for canonical + og:url */
  path: string
  image?: string
  noIndex?: boolean
  type?: 'website' | 'article'
}

export function getSiteUrl(): string {
  const fromEnv = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin
  return ''
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function applyPageSeo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = 'website',
}: PageSeo) {
  const site = getSiteUrl()
  const url = site ? `${site}${path.startsWith('/') ? path : `/${path}`}` : path
  const imageUrl = image.startsWith('http') ? image : site ? `${site}${image}` : image

  document.title = title
  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')

  upsertLink('canonical', url || path)

  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', url || path)
  upsertMeta('property', 'og:image', imageUrl)

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', imageUrl)
}

/** Keep document head in sync with the active route. */
export function usePageSeo(seo: PageSeo) {
  useEffect(() => {
    applyPageSeo(seo)
  }, [seo.title, seo.description, seo.path, seo.image, seo.noIndex, seo.type])
}
