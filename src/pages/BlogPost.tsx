import { Link, Navigate, useParams } from 'react-router-dom'
import { formatPostDate, getPost } from '../blog'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

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
          {post.tags && post.tags.length > 0 ? (
            <ul className="update-entry__tags" aria-label="Etiquetas">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <span className="update-entry__tag">{tag}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <h1 id="blog-post-title" className="blog-post__title">
          {post.title}
        </h1>
      </header>
      <div className="blog-post__body">
        <Component />
      </div>
    </article>
  )
}
