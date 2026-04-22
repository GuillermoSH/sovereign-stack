import { useEffect, useRef, useState } from 'react'
import { strings, type Lang, type Theme, parseRich } from './i18n'
import './App.css'

const SERVICES = [
  'Pi-hole',
  'Dockge',
  'Uptime Kuma',
  'Nginx Proxy Manager',
  'n8n',
  'Vaultwarden',
  'Beszel',
] as const

function RichParagraph({ text }: { text: string }) {
  const parts = parseRich(text)
  return (
    <p>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <span key={i}>{p}</span>
        ) : (
          <strong key={i} className="on-surface">
            {p.bold}
          </strong>
        ),
      )}
    </p>
  )
}

function readTheme(): Theme {
  try {
    const v = localStorage.getItem('theme')
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* ignore */
  }
  return 'dark'
}

function readLang(): Lang {
  try {
    const v = localStorage.getItem('lang')
    if (v === 'en' || v === 'es') return v
  } catch {
    /* ignore */
  }
  return 'es'
}

function SunIcon() {
  return (
    <svg className="theme-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93ZM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121Zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121ZM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121ZM23 11v2h-3v-2h3ZM4 11v2H1v-2h3Z"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="theme-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.683-8.112 6.46-9.694a.75.75 0 01.818.162z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function App() {
  const heroSectionRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [lang, setLang] = useState<Lang>(readLang)
  const t = strings[lang]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = lang
    try {
      localStorage.setItem('theme', theme)
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [theme, lang])

  useEffect(() => {
    const el = parallaxRef.current
    const section = heroSectionRef.current
    if (!el || !section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    let raf = 0
    const baseRotate = -7

    const update = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const range = vh + rect.height
      const visible = Math.min(vh, Math.max(0, vh - rect.top))
      const tScroll = range > 0 ? visible / range : 0
      const eased = tScroll * tScroll * (3 - 2 * tScroll)
      const y = (eased - 0.5) * 36
      const rot = (eased - 0.5) * 5
      el.style.transform = `translate3d(0, ${y}px, 0) rotate(${baseRotate + rot}deg)`
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>

      <div className="page-bg" aria-hidden="true" />

      <header className="site-header">
        <div className="layout-shell site-header__inner">
          <a href="#overview" className="brand brand--link">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-text">Sovereign Stack</span>
          </a>
          <div className="header-cluster">
            <nav className="site-nav" aria-label={t.navAria}>
              <ul className="nav-list">
                <li>
                  <a href="#overview">{t.navOverview}</a>
                </li>
                <li>
                  <a href="#hardware">{t.navHardware}</a>
                </li>
                <li>
                  <a href="#stack">{t.navStack}</a>
                </li>
                <li>
                  <a href="#network">{t.navNetwork}</a>
                </li>
                <li>
                  <a href="#ops">{t.navOps}</a>
                </li>
                <li>
                  <a href="#story">{t.navStory}</a>
                </li>
              </ul>
            </nav>
            <div className="header-tools">
              <button
                type="button"
                className="lang-toggle"
                onClick={() => setLang((l) => (l === 'es' ? 'en' : 'es'))}
                aria-label={lang === 'es' ? t.langSwitchToEn : t.langSwitchToEs}
              >
                {lang === 'es' ? 'Es' : 'En'}
              </button>
              <button
                type="button"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="main">
        <div className="layout-shell">
          <section
            id="overview"
            ref={heroSectionRef}
            className="hero"
            aria-labelledby="hero-title"
          >
            <div className="hero-copy">
              <p className="eyebrow">{t.eyebrow}</p>
              <h1 id="hero-title">
                <span className="title-gradient">NUC11ATKC4</span>
                <span className="title-rest">{t.heroTitleSuffix}</span>
              </h1>
              <p className="lede">{t.lede}</p>
              <ul className="hero-stats" aria-label={t.highlightsLabel}>
                <li>
                  <span className="hero-stat-val">{t.statDocker}</span>
                  <span className="hero-stat-label">{t.statDockerSub}</span>
                </li>
                <li>
                  <span className="hero-stat-val">{t.statDns}</span>
                  <span className="hero-stat-label">{t.statDnsSub}</span>
                </li>
                <li>
                  <span className="hero-stat-val">{t.statEdge}</span>
                  <span className="hero-stat-label">{t.statEdgeSub}</span>
                </li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="hero-orb hero-orb--a" aria-hidden="true" />
              <div className="hero-orb hero-orb--b" aria-hidden="true" />
              <div ref={parallaxRef} className="hero-parallax motion-allow">
                <div className="hero-img-wrap motion-allow">
                  <picture>
                    <source srcSet="/nuc11.webp" type="image/webp" />
                    <img
                      src="/nuc11.png"
                      width={520}
                      height={520}
                      className="hero-img"
                      alt={t.nucAlt}
                      decoding="async"
                      fetchPriority="high"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </section>

          <section id="hardware" className="bento" aria-labelledby="hw-title">
            <article className="bento-card bento-card--wide">
              <h2 id="hw-title">{t.hwTitle}</h2>
              <RichParagraph text={t.hwBody} />
            </article>
            <article className="bento-card">
              <h2>{t.baseOsTitle}</h2>
              <RichParagraph text={t.baseOsBody} />
            </article>
          </section>

          <section
            id="stack"
            className="section services-section"
            aria-labelledby="svc-title"
          >
            <div className="section-head">
              <h2 id="svc-title">{t.stackTitle}</h2>
              <p className="section-intro">{t.stackIntro}</p>
            </div>
            <ul className="service-grid">
              {SERVICES.map((name) => (
                <li key={name}>
                  <span className="service-pill">{name}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="network" aria-labelledby="net-section-title">
            <div className="section-head section-head--tight">
              <h2 id="net-section-title">{t.networkSectionTitle}</h2>
              <p className="section-intro">{t.networkSectionIntro}</p>
            </div>
            <div className="bento bento--net">
              <article className="bento-card">
                <h3 className="bento-card__title">{t.networkAccessTitle}</h3>
                <p>{t.networkAccessBody}</p>
              </article>
              <article className="bento-card bento-card--accent">
                <h3 className="bento-card__title">{t.networkEvolutionTitle}</h3>
                <RichParagraph text={t.networkEvolutionBody} />
              </article>
            </div>
          </section>

          <section id="ops" aria-labelledby="ops-section-title">
            <div className="section-head section-head--tight">
              <h2 id="ops-section-title">{t.opsSectionTitle}</h2>
            </div>
            <div className="bento bento--ops">
              <article className="bento-card">
                <h3 className="bento-card__title">{t.opsMonitoringTitle}</h3>
                <RichParagraph text={t.opsMonitoringBody} />
              </article>
              <article className="bento-card">
                <h3 className="bento-card__title">{t.opsBackupsTitle}</h3>
                <p>{t.opsBackupsBody}</p>
              </article>
              <article className="bento-card bento-card--accent">
                <h3 className="bento-card__title">{t.opsSecurityTitle}</h3>
                <RichParagraph text={t.opsSecurityBody} />
              </article>
            </div>
          </section>

          <section id="story" aria-labelledby="story-section-title">
            <div className="section-head section-head--tight">
              <h2 id="story-section-title">{t.storySectionTitle}</h2>
            </div>
            <div className="bento bento--story">
              <article className="bento-card bento-card--wide">
                <h3 className="bento-card__title">{t.storyWhyTitle}</h3>
                <RichParagraph text={t.storyWhyBody} />
              </article>
              <article className="bento-card">
                <h3 className="bento-card__title">{t.roadmapTitle}</h3>
                <RichParagraph text={t.roadmapBody} />
              </article>
            </div>
          </section>

          <section className="section section--closing" aria-labelledby="closing-title">
            <h2 id="closing-title" className="visually-hidden">
              {t.closingHidden}
            </h2>
            <p className="closing">{t.closing}</p>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="layout-shell site-footer__inner">
          <p>{t.footer}</p>
        </div>
      </footer>
    </>
  )
}

export default App
