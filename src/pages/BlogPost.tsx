import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useOutletContext, useParams } from 'react-router-dom'
import { formatPostDate, getPost, slugifyHeading } from '../blog'
import type { BlogOutletContext } from '../components/BlogLayout'
import { strings } from '../i18n'
import { estimateReadingMinutes } from '../readingTime'
import { SITE_NAME, usePageSeo } from '../seo'
import { getTagIcon } from '../tagIcons'
import { ListIcon } from '../icons/ui'

interface TocItem {
  id: string
  text: string
  depth: 2 | 3
}

export default function BlogPost() {
  const { lang } = useOutletContext<BlogOutletContext>()
  const t = strings[lang]
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug, lang) : undefined
  const bodyRef = useRef<HTMLDivElement>(null)
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')
  const readingMinutes = useMemo(
    () => (post ? estimateReadingMinutes(post.Component) : 0),
    [post],
  )

  usePageSeo({
    title: post ? `${post.title} · ${SITE_NAME}` : SITE_NAME,
    description: post?.excerpt?.trim() || t.metaDescription,
    path: slug ? `/blog/${slug}` : '/blog',
    type: 'article',
  })

  useEffect(() => {
    const container = bodyRef.current
    if (!container) return

    const headings = Array.from(container.querySelectorAll<HTMLHeadingElement>('h2, h3'))
    const used = new Set<string>()
    const items = headings.map((el) => {
      const text = el.textContent?.trim() ?? ''
      const base = slugifyHeading(text) || 'section'
      let id = base
      let n = 2
      while (used.has(id)) {
        id = `${base}-${n}`
        n += 1
      }
      used.add(id)
      el.id = id
      return { id, text, depth: el.tagName === 'H3' ? 3 : 2 } as TocItem
    })
    setToc(items)
  }, [post?.slug, post?.lang])

  useEffect(() => {
    if (toc.length < 2) return
    const headingEls = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement)
    if (!headingEls.length) return

    const topOffset = 96
    let raf = 0
    const pick = () => {
      raf = 0
      let current = headingEls[0].id
      for (const el of headingEls) {
        if (el.getBoundingClientRect().top <= topOffset) current = el.id
        else break
      }
      setActiveId(current)
    }
    const schedule = () => {
      if (raf) return
      raf = requestAnimationFrame(pick)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    pick()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [toc])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { Component } = post

  return (
    <article className="section blog-post-section" aria-labelledby="blog-post-title">
      <Link to="/blog" className="blog-back-link">
        {t.blogBackAll}
      </Link>
      <header className="blog-post__head">
        <div className="blog-post__meta">
          <time className="update-entry__date" dateTime={post.date}>
            {formatPostDate(post.date, lang)}
          </time>
          <span className="blog-post__meta-sep" aria-hidden="true">
            ·
          </span>
          <span className="blog-post__reading-time">
            {readingMinutes} {t.blogReadingTime}
          </span>
        </div>
        <h1 id="blog-post-title" className="blog-post__title">
          {post.title}
        </h1>
        {post.tags && post.tags.length > 0 ? (
          <ul className="update-entry__tags blog-post__tags" aria-label={t.blogTagsLabel}>
            {post.tags.map((tag) => {
              const Icon = getTagIcon(tag)
              return (
                <li key={tag}>
                  <span className="update-entry__tag">
                    <Icon className="update-entry__tag-icon" aria-hidden="true" />
                    {tag}
                  </span>
                </li>
              )
            })}
          </ul>
        ) : null}
      </header>

      {toc.length > 1 ? (
        <nav className="blog-post__toc" aria-label={t.blogTocLabel}>
          <p className="blog-post__toc-label">
            <ListIcon className="blog-post__toc-label-icon" aria-hidden="true" />
            {t.blogTocLabel}
          </p>
          <ol className="blog-post__toc-list">
            {toc.map((item) => (
              <li
                key={item.id}
                className={
                  item.depth === 3 ? 'blog-post__toc-item blog-post__toc-item--sub' : 'blog-post__toc-item'
                }
              >
                <a href={`#${item.id}`} aria-current={item.id === activeId ? 'location' : undefined}>
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="blog-post__body" ref={bodyRef}>
        <Component />
      </div>
    </article>
  )
}
