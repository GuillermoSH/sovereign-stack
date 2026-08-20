import { useOutletContext } from 'react-router-dom'
import type { BlogOutletContext } from '../components/BlogLayout'
import { useConsent } from '../components/ConsentProvider'
import { getLegalDoc, type LegalKind } from '../content/legal'
import { strings } from '../i18n'
import { SITE_NAME, usePageSeo } from '../seo'

type LegalPageProps = {
  kind: LegalKind
}

const LEGAL_PATH: Record<LegalKind, string> = {
  legal: '/legal',
  privacy: '/privacy',
  cookies: '/cookies',
}

export default function LegalPage({ kind }: LegalPageProps) {
  const { lang } = useOutletContext<BlogOutletContext>()
  const t = strings[lang]
  const { openPreferences } = useConsent()
  const doc = getLegalDoc(kind, lang)
  const updatedLabel = lang === 'es' ? 'Última actualización' : 'Last updated'
  const path = LEGAL_PATH[kind]
  const description =
    doc.sections[0]?.paragraphs[0] ??
    (lang === 'es'
      ? `${doc.title} de Sovereign Stack.`
      : `${doc.title} for Sovereign Stack.`)

  usePageSeo({
    title: `${doc.title} · ${SITE_NAME}`,
    description,
    path,
  })

  return (
    <article className="section legal-page" aria-labelledby="legal-page-title">
      <header className="legal-page__head">
        <h1 id="legal-page-title">{doc.title}</h1>
        <p className="legal-page__updated">
          {updatedLabel}: {doc.updated}
        </p>
      </header>

      <div className="legal-page__body">
        {doc.sections.map((section) => (
          <section key={section.heading} className="legal-page__section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 64)}>{p}</p>
            ))}
          </section>
        ))}

        {doc.cookieTable ? (
          <section className="legal-page__section" aria-labelledby="cookie-table-caption">
            <h2 id="cookie-table-caption">{doc.cookieTable.caption}</h2>
            <div className="cookie-table-wrap">
              <table className="cookie-table">
                <thead>
                  <tr>
                    {doc.cookieTable.headers.map((h) => (
                      <th key={h} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {doc.cookieTable.rows.map((row) => (
                    <tr key={row.name}>
                      <td>
                        <code>{row.name}</code>
                      </td>
                      <td>{row.purpose}</td>
                      <td>{row.duration}</td>
                      <td>{row.type}</td>
                      <td>{row.provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {kind === 'cookies' ? (
          <p className="legal-page__prefs">
            <button type="button" className="legal-page__prefs-btn" onClick={openPreferences}>
              {t.cookiePreferences}
            </button>
          </p>
        ) : null}
      </div>
    </article>
  )
}
