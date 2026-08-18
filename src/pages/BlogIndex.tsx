import { Link } from 'react-router-dom'
import { formatPostDate, posts } from '../blog'
import { getTagIcon } from '../tagIcons'
import { useReveal } from '../useReveal'

export default function BlogIndex() {
  const reveal = useReveal<HTMLOListElement>()

  return (
    <section className="section blog-index-section" aria-labelledby="blog-index-title">
      <div className="section-head">
        <h1 id="blog-index-title">Bitácora del homelab</h1>
        <p className="section-intro">
          Historial completo: hitos, cambios y sustos del homelab, con fecha. La portada
          solo enseña las últimas entradas — aquí está todo.
        </p>
      </div>
      <ol ref={reveal} className="blog-log reveal" aria-label="Entradas del blog">
        {posts.map((post) => (
          <li key={post.slug} className="blog-log__entry">
            <time className="blog-log__date" dateTime={post.date}>
              {formatPostDate(post.date)}
            </time>
            <div className="blog-log__rail" aria-hidden="true">
              <span className="blog-log__node" />
            </div>
            <Link to={`/blog/${post.slug}`} className="blog-card">
              {post.tags && post.tags.length > 0 ? (
                <ul className="update-entry__tags blog-card__tags" aria-label="Etiquetas">
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
    </section>
  )
}
