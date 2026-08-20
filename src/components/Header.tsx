import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { strings, type Lang, type Theme } from '../i18n'
import { MoonIcon, SunIcon } from '../icons'
import { ClockIcon, CompassIcon, CpuIcon, LayersIcon, RouterIcon, ShieldIcon } from '../icons/ui'

const SECTION_IDS = ['hardware', 'stack', 'updates', 'network', 'ops', 'story'] as const

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

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  )
}

type HeaderProps = {
  lang: Lang
  onToggleLang: () => void
  theme: Theme
  onToggleTheme: () => void
  activeSection?: string
}

export default function Header({ lang, onToggleLang, theme, onToggleTheme, activeSection }: HeaderProps) {
  const t = strings[lang]
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isBlog = location.pathname.startsWith('/blog')

  type MegaMode = 'closed' | 'hover' | 'pinned'
  const [megaMode, setMegaMode] = useState<MegaMode>('closed')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)
  const megaOpen = megaMode !== 'closed'
  const megaPinned = megaMode === 'pinned'
  const megaBtnRef = useRef<HTMLButtonElement>(null)
  const megaPanelRef = useRef<HTMLDivElement>(null)
  const hoverCloseTimer = useRef(0)

  const clearHoverClose = () => {
    window.clearTimeout(hoverCloseTimer.current)
  }

  const closeMega = () => setMegaMode('closed')

  const canHoverOpen = () => window.matchMedia('(any-hover: hover)').matches

  const openByHover = () => {
    if (!canHoverOpen()) return
    clearHoverClose()
    setMegaMode((m) => (m === 'closed' ? 'hover' : m))
  }

  const scheduleHoverClose = () => {
    clearHoverClose()
    hoverCloseTimer.current = window.setTimeout(() => {
      setMegaMode((m) => (m === 'hover' ? 'closed' : m))
    }, 120)
  }

  const onTriggerClick = () => {
    clearHoverClose()
    setMegaMode((m) => {
      if (m === 'hover') return 'pinned'
      if (m === 'pinned') return 'closed'
      return 'pinned'
    })
  }

  // Reset any open menu when the route changes, computed during render (not an
  // effect) so a stale panel never flashes open for a frame after navigation.
  const [prevPathname, setPrevPathname] = useState(location.pathname)
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname)
    setMegaMode('closed')
    setMobileOpen(false)
  }

  const sectionLinks = SECTION_IDS.map((id) => {
    const meta = {
      hardware: { label: t.navHardware, desc: t.navHardwareDesc, Icon: CpuIcon },
      stack: { label: t.navStack, desc: t.navStackDesc, Icon: LayersIcon },
      updates: { label: t.navUpdates, desc: t.navUpdatesDesc, Icon: ClockIcon },
      network: { label: t.navNetwork, desc: t.navNetworkDesc, Icon: RouterIcon },
      ops: { label: t.navOps, desc: t.navOpsDesc, Icon: ShieldIcon },
      story: { label: t.navStory, desc: t.navStoryDesc, Icon: CompassIcon },
    }[id]
    return { id, ...meta }
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    return () => window.clearTimeout(hoverCloseTimer.current)
  }, [])

  useEffect(() => {
    if (!megaOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMega()
        megaBtnRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (megaPanelRef.current?.contains(target) || megaBtnRef.current?.contains(target)) return
      closeMega()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [megaOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false)
    closeMega()
    if (!isHome) return
    event.preventDefault()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`)

  return (
    <>
      <header
        className={`site-header ${scrolled || megaOpen ? 'is-scrolled' : ''}`}
        onMouseEnter={clearHoverClose}
        onMouseLeave={scheduleHoverClose}
      >
        <div className="layout-shell site-header__inner">
          <Link to="/" className="brand brand--link" onClick={handleBrandClick}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-text">Sovereign Stack</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-site-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <nav className="site-nav" aria-label={t.navAria}>
            <ul className="nav-list">
              <li>
                <button
                  type="button"
                  ref={megaBtnRef}
                  className={`nav-trigger ${isHome ? 'is-current' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  aria-controls="nav-mega-panel"
                  onClick={onTriggerClick}
                  onMouseEnter={openByHover}
                >
                  {t.navHomeItem}
                  <ChevronIcon className={`nav-trigger__chevron ${megaOpen ? 'is-open' : ''}`} />
                </button>
              </li>
              <li>
                <Link to="/blog" aria-current={isBlog ? 'page' : undefined}>
                  {t.navBlogItem}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-tools">
            <button
              type="button"
              className={`lang-toggle lang-toggle--${lang}`}
              onClick={onToggleLang}
              aria-label={`${lang === 'es' ? 'Es' : 'En'} — ${lang === 'es' ? t.langSwitchToEn : t.langSwitchToEs}`}
            >
              <span className="lang-toggle__label">{lang === 'es' ? 'Es' : 'En'}</span>
            </button>
            <button
              type="button"
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        <div
          id="nav-mega-panel"
          ref={megaPanelRef}
          className={`nav-mega ${megaOpen ? 'is-open' : ''} ${megaPinned ? 'is-pinned' : ''}`}
          role="region"
          aria-label={t.navMenuLabel}
          inert={!megaOpen}
          onMouseEnter={openByHover}
        >
          <div className="nav-mega__inner layout-shell">
            <ul className="nav-mega__grid">
              {sectionLinks.map((s) => (
                <li key={s.id}>
                  <a
                    href={sectionHref(s.id)}
                    className="nav-mega__link"
                    aria-current={isHome && activeSection === s.id ? 'page' : undefined}
                    onClick={closeMega}
                  >
                    <s.Icon className="nav-mega__link-icon" aria-hidden="true" />
                    <span className="nav-mega__link-text">
                      <span className="nav-mega__link-title">{s.label}</span>
                      <span className="nav-mega__link-desc">{s.desc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div
        className={`nav-mega-backdrop ${megaPinned ? 'is-open' : ''}`}
        onClick={closeMega}
        aria-hidden="true"
      />

      <div
        className={`mobile-nav-backdrop ${mobileOpen ? 'is-open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <nav
        id="mobile-site-nav"
        className={`mobile-nav-panel ${mobileOpen ? 'is-open' : ''}`}
        aria-label={t.navAria}
        inert={!mobileOpen}
      >
        <div className="mobile-nav-header">
          <Link to="/" className="brand brand--link mobile-nav-brand" onClick={handleBrandClick}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-text">Sovereign Stack</span>
          </Link>
          <button
            type="button"
            className="menu-toggle mobile-nav-close"
            aria-label={t.navCloseMenu}
            onClick={() => setMobileOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-nav-body">
          <p className="mobile-nav-group-label">{t.navHomeItem}</p>
          <ul className="mobile-nav-list">
            {sectionLinks.map((s) => (
              <li key={s.id}>
                <a
                  href={sectionHref(s.id)}
                  aria-current={isHome && activeSection === s.id ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  <s.Icon className="mobile-nav-list__icon" aria-hidden="true" />
                  {s.label}
                </a>
              </li>
            ))}
            <li className="mobile-nav-list__blog">
              <Link to="/blog" aria-current={isBlog ? 'page' : undefined} onClick={() => setMobileOpen(false)}>
                {t.navBlogItem}
              </Link>
            </li>
          </ul>
          <div className="mobile-nav-tools">
            <button
              type="button"
              className={`lang-toggle lang-toggle--${lang}`}
              onClick={onToggleLang}
              aria-label={`${lang === 'es' ? 'Es' : 'En'} — ${lang === 'es' ? t.langSwitchToEn : t.langSwitchToEs}`}
            >
              <span className="lang-toggle__label">{lang === 'es' ? 'Es' : 'En'}</span>
            </button>
            <button
              type="button"
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
