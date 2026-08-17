import { Link } from 'react-router-dom'
import { formatPostDate, posts } from '../blog'
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
      <ol ref={reveal} className="blog-list reveal" aria-label="Entradas del blog">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card__head">
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
              <h2 className="blog-card__title">{post.title}</h2>
              {post.excerpt ? <p className="blog-card__excerpt">{post.excerpt}</p> : null}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
