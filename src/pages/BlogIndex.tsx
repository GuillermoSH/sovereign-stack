import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { formatPostDate, getPosts } from '../blog'
import type { BlogOutletContext } from '../components/BlogLayout'
import { strings } from '../i18n'
import { SITE_NAME, usePageSeo } from '../seo'
import { getTagIcon, sortTagsByPriority } from '../tagIcons'
import { useRevealEach } from '../useReveal'
import { ArrowLeftIcon, ArrowRightIcon, GridIcon, ListIcon } from '../icons/ui'

type View = 'timeline' | 'grid'

const PAGE_SIZE = 9
const GRID_TAG_LIMIT = 3

function readView(): View {
  try {
    const v = localStorage.getItem('blog-view')
    if (v === 'timeline' || v === 'grid') return v
  } catch {
    /* ignore */
  }
  return 'grid'
}

export default function BlogIndex() {
  const { lang } = useOutletContext<BlogOutletContext>()
  const t = strings[lang]
  const posts = getPosts(lang)

  usePageSeo({
    title: `${t.blogIndexTitle} · ${SITE_NAME}`,
    description: t.blogIndexIntro,
    path: '/blog',
  })

  const [view, setView] = useState<View>(readView)
  const [page, setPage] = useState(0)

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
  const pageStart = page * PAGE_SIZE
  const pagePosts = posts.slice(pageStart, pageStart + PAGE_SIZE)

  const timelineRef = useRevealEach<HTMLLIElement>(posts.length)
  const gridRef = useRevealEach<HTMLLIElement>(pagePosts.length, page)

  const setViewAndPersist = (next: View) => {
    setView(next)
    try {
      localStorage.setItem('blog-view', next)
    } catch {
      /* ignore */
    }
  }

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(next, 0), totalPages - 1))
  }

  return (
    <section className="section blog-index-section" aria-labelledby="blog-index-title">
      <div className="section-head blog-index-head">
        <div>
          <h1 id="blog-index-title">{t.blogIndexTitle}</h1>
          <p className="section-intro">{t.blogIndexIntro}</p>
        </div>
        <div className="blog-view-toggle" role="group" aria-label={t.blogViewLabel}>
          <button
            type="button"
            className={view === 'timeline' ? 'blog-view-toggle__btn is-active' : 'blog-view-toggle__btn'}
            aria-pressed={view === 'timeline'}
            onClick={() => setViewAndPersist('timeline')}
          >
            <ListIcon aria-hidden="true" />
            {t.blogViewTimeline}
          </button>
          <button
            type="button"
            className={view === 'grid' ? 'blog-view-toggle__btn is-active' : 'blog-view-toggle__btn'}
            aria-pressed={view === 'grid'}
            onClick={() => setViewAndPersist('grid')}
          >
            <GridIcon aria-hidden="true" />
            {t.blogViewGrid}
          </button>
        </div>
      </div>

      {view === 'timeline' ? (
        <ol className="blog-log" aria-label={t.blogFeedLabel}>
          {posts.map((post, i) => (
            <li key={post.slug} className="blog-log__entry" ref={timelineRef(i)}>
              <time className="blog-log__date" dateTime={post.date}>
                {formatPostDate(post.date, lang)}
              </time>
              <div className="blog-log__rail" aria-hidden="true">
                <span className="blog-log__node" />
              </div>
              <Link to={`/blog/${post.slug}`} className="blog-card">
                {post.tags && post.tags.length > 0 ? (
                  <ul className="update-entry__tags blog-card__tags" aria-label={t.blogTagsLabel}>
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
                <h2 className="blog-card__title">{post.title}</h2>
                {post.excerpt ? <p className="blog-card__excerpt">{post.excerpt}</p> : null}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <>
          <ol className="blog-grid" aria-label={t.blogFeedLabel}>
            {pagePosts.map((post, i) => {
              const sortedTags = post.tags ? sortTagsByPriority(post.tags) : []
              const visibleTags = sortedTags.slice(0, GRID_TAG_LIMIT)
              const hiddenTagCount = sortedTags.length - visibleTags.length
              const tagsLabel =
                hiddenTagCount > 0 ? `${t.blogTagsLabel}: ${sortedTags.join(', ')}` : t.blogTagsLabel

              return (
                <li key={post.slug} ref={gridRef(i)}>
                  <Link to={`/blog/${post.slug}`} className="blog-grid-card">
                    <time className="blog-grid-card__date" dateTime={post.date}>
                      {formatPostDate(post.date, lang)}
                    </time>
                    {visibleTags.length > 0 ? (
                      <ul className="blog-grid-card__tags" aria-label={tagsLabel}>
                        {visibleTags.map((tag) => {
                          const Icon = getTagIcon(tag)
                          return (
                            <li key={tag}>
                              <Icon className="blog-grid-card__tag-icon" aria-hidden="true" />
                              <span>{tag}</span>
                            </li>
                          )
                        })}
                        {hiddenTagCount > 0 ? (
                          <li className="blog-grid-card__tags-more" aria-hidden="true">
                            +{hiddenTagCount}
                          </li>
                        ) : null}
                      </ul>
                    ) : null}
                    <h2 className="blog-card__title">{post.title}</h2>
                    {post.excerpt ? <p className="blog-card__excerpt">{post.excerpt}</p> : null}
                  </Link>
                </li>
              )
            })}
          </ol>

          {totalPages > 1 ? (
            <nav className="blog-pagination" aria-label={t.blogPaginationLabel}>
              <button
                type="button"
                className="blog-pagination__btn"
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                aria-label={t.blogPrevPage}
              >
                <ArrowLeftIcon aria-hidden="true" />
              </button>
              <ol className="blog-pagination__pages">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className={i === page ? 'is-active' : undefined}
                      aria-current={i === page ? 'page' : undefined}
                      onClick={() => goToPage(i)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="blog-pagination__btn"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages - 1}
                aria-label={t.blogNextPage}
              >
                <ArrowRightIcon aria-hidden="true" />
              </button>
            </nav>
          ) : null}
        </>
      )}
    </section>
  )
}
