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

function MenuIcon() {
  return (
    <svg className="theme-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 6.75A.75.75 0 0 1 4.75 6h14.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 6.75Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 12Zm.75 4.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H4.75Z"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="theme-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L10.94 12l-5.72 5.72a.75.75 0 1 0 1.06 1.06L12 13.06l5.72 5.72a.75.75 0 1 0 1.06-1.06L13.06 12l5.72-5.72a.75.75 0 1 0-1.06-1.06L12 10.94 6.28 5.22Z"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.53 3H20.6l-6.72 7.68L21.8 21h-6.2l-4.86-6.36L5.17 21H2.1l7.19-8.22L2 3h6.35l4.39 5.8L17.53 3Zm-1.09 16.1h1.7L7.43 4.8H5.6l10.84 14.3Z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.476 2 2 6.59 2 12.252c0 4.53 2.865 8.372 6.839 9.727.5.095.683-.222.683-.492 0-.244-.01-1.048-.014-1.9-2.782.616-3.369-1.216-3.369-1.216-.455-1.186-1.11-1.5-1.11-1.5-.908-.638.069-.625.069-.625 1.004.072 1.532 1.056 1.532 1.056.892 1.566 2.34 1.114 2.91.852.091-.663.35-1.115.635-1.37-2.22-.26-4.555-1.14-4.555-5.074 0-1.122.39-2.039 1.03-2.758-.104-.26-.447-1.306.098-2.723 0 0 .84-.277 2.75 1.053A9.37 9.37 0 0 1 12 6.83c.85.004 1.705.117 2.504.344 1.909-1.33 2.748-1.053 2.748-1.053.547 1.417.203 2.463.1 2.723.64.719 1.028 1.636 1.028 2.758 0 3.944-2.339 4.811-4.566 5.066.359.318.679.942.679 1.899 0 1.37-.013 2.474-.013 2.811 0 .272.18.592.688.491C19.138 20.62 22 16.78 22 12.252 22 6.59 17.523 2 12 2Z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.5 9.8h2.86v8.7H5.5V9.8Zm4.66 0H12.9v1.24h.04c.38-.73 1.31-1.5 2.7-1.5 2.88 0 3.41 1.92 3.41 4.42v4.54H16.2v-4.03c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.05-1.55 2.13v4.1h-2.85V9.8Z"
      />
    </svg>
  )
}

function App() {
  const heroSectionRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [lang, setLang] = useState<Lang>(readLang)
  const [activeSection, setActiveSection] = useState('overview')
  const [menuOpen, setMenuOpen] = useState(false)
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

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const ids = ['overview', 'hardware', 'stack', 'network', 'ops', 'story']
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => s instanceof HTMLElement)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.2, 0.35, 0.55, 0.7],
        rootMargin: '-28% 0px -54% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
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
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <div className="header-cluster">
            <nav className="site-nav" aria-label={t.navAria}>
              <ul className="nav-list">
                <li>
                  <a
                    href="#overview"
                    aria-current={activeSection === 'overview' ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.navOverview}
                  </a>
                </li>
                <li>
                  <a
                    href="#hardware"
                    aria-current={activeSection === 'hardware' ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.navHardware}
                  </a>
                </li>
                <li>
                  <a
                    href="#stack"
                    aria-current={activeSection === 'stack' ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.navStack}
                  </a>
                </li>
                <li>
                  <a
                    href="#network"
                    aria-current={activeSection === 'network' ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.navNetwork}
                  </a>
                </li>
                <li>
                  <a
                    href="#ops"
                    aria-current={activeSection === 'ops' ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.navOps}
                  </a>
                </li>
                <li>
                  <a
                    href="#story"
                    aria-current={activeSection === 'story' ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.navStory}
                  </a>
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
      <div
        className={`mobile-nav-backdrop ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav
        id="mobile-site-nav"
        className={`mobile-nav-panel ${menuOpen ? 'is-open' : ''}`}
        aria-label={t.navAria}
      >
        <div className="mobile-nav-header">
          <a href="#overview" className="brand brand--link mobile-nav-brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-text">Sovereign Stack</span>
          </a>
          <button
            type="button"
            className="menu-toggle mobile-nav-close"
            aria-label={lang === 'es' ? 'Cerrar menú' : 'Close menu'}
            onClick={() => setMenuOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-nav-body">
          <ul className="mobile-nav-list">
            <li>
              <a href="#overview" aria-current={activeSection === 'overview' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                {t.navOverview}
              </a>
            </li>
            <li>
              <a href="#hardware" aria-current={activeSection === 'hardware' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                {t.navHardware}
              </a>
            </li>
            <li>
              <a href="#stack" aria-current={activeSection === 'stack' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                {t.navStack}
              </a>
            </li>
            <li>
              <a href="#network" aria-current={activeSection === 'network' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                {t.navNetwork}
              </a>
            </li>
            <li>
              <a href="#ops" aria-current={activeSection === 'ops' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                {t.navOps}
              </a>
            </li>
            <li>
              <a href="#story" aria-current={activeSection === 'story' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                {t.navStory}
              </a>
            </li>
          </ul>
          <div className="mobile-nav-tools">
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
      </nav>

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
                <span className="title-accent">NUC11ATKC4</span>
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

          <section id="hardware" className="bento section-shell section-shell--hardware" aria-labelledby="hw-title">
            <article className="bento-card bento-card--wide section-shell__lead">
              <p className="section-marker">01 / Hardware</p>
              <h2 id="hw-title">{t.hwTitle}</h2>
              <RichParagraph text={t.hwBody} />
            </article>
            <article className="bento-card section-shell__side">
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
              <p className="section-marker">02 / Stack</p>
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
              <p className="section-marker">03 / Network</p>
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
              <p className="section-marker">04 / Ops</p>
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
              <p className="section-marker">05 / Story</p>
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
        <div className="layout-shell site-footer__main">
          <div className="site-footer__identity">
            <p className="site-footer__name">Guillermo Sicilia Hernandez</p>
            <p className="site-footer__subtitle">
              {lang === 'es'
                ? 'Puerto de la Cruz, Canarias · Desarrollador full-stack'
                : 'Puerto de la Cruz, Canary Islands · Full-stack developer'}
            </p>
          </div>
          <div className="site-footer__socials" aria-label={lang === 'es' ? 'Redes sociales' : 'Social links'}>
            <a href="https://twitter.com/guillermoshdez" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <XIcon />
            </a>
            <a href="https://github.com/GuillermoSH" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/guillermo-sicilia-hern%C3%A1ndez-95861523b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <div className="site-footer__bar">
          <div className="layout-shell site-footer__bar-inner">
            <p>{t.footer}</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
