import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { formatPostDate, getPost, slugifyHeading } from '../blog'
import { estimateReadingMinutes } from '../readingTime'
import { getTagIcon } from '../tagIcons'

interface TocItem {
  id: string
  text: string
  depth: 2 | 3
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined
  const bodyRef = useRef<HTMLDivElement>(null)
  const [toc, setToc] = useState<TocItem[]>([])
  const readingMinutes = useMemo(
    () => (post ? estimateReadingMinutes(post.Component) : 0),
    [post],
  )

  useEffect(() => {
    const container = bodyRef.current
    if (!container) return

    const headings = Array.from(container.querySelectorAll<HTMLHeadingElement>('h2, h3'))
    const used = new Set<string>()
    const items = headings.map((el) => {
      const text = el.textContent?.trim() ?? ''
      const base = slugifyHeading(text) || 'seccion'
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
  }, [post?.slug])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { Component } = post

  return (
    <article className="section blog-post-section" aria-labelledby="blog-post-title">
      <Link to="/blog" className="blog-back-link">
        ← Todas las entradas
      </Link>
      <header className="blog-post__head">
        <div className="blog-post__meta">
          <time className="update-entry__date" dateTime={post.date}>
            {formatPostDate(post.date)}
          </time>
          <span className="blog-post__meta-sep" aria-hidden="true">·</span>
          <span className="blog-post__reading-time">{readingMinutes} min de lectura</span>
        </div>
        <h1 id="blog-post-title" className="blog-post__title">
          {post.title}
        </h1>
        {post.tags && post.tags.length > 0 ? (
          <ul className="update-entry__tags blog-post__tags" aria-label="Etiquetas">
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
        <nav className="blog-post__toc" aria-label="Índice del artículo">
          <p className="blog-post__toc-label">Índice</p>
          <ol className="blog-post__toc-list">
            {toc.map((item) => (
              <li
                key={item.id}
                className={
                  item.depth === 3 ? 'blog-post__toc-item blog-post__toc-item--sub' : 'blog-post__toc-item'
                }
              >
                <a href={`#${item.id}`}>{item.text}</a>
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
