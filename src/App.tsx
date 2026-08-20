import { useEffect, useState, type KeyboardEvent, type TransitionEvent } from 'react'
import { Link } from 'react-router-dom'
import { strings, type Lang, parseRich } from './i18n'
import { formatPostDate, getPosts, type Post } from './blog'
import {
  BeszelIcon,
  DockgeIcon,
  N8nIcon,
  NginxProxyManagerIcon,
  TelegramIcon,
  PiholeIcon,
  TailscaleIcon,
  UptimeKumaIcon,
  VaultwardenIcon,
} from './icons/brands'
import {
  ActivityIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloudOffIcon,
  CompassIcon,
  CpuIcon,
  DiskIcon,
  FanIcon,
  FileIcon,
  GpuIcon,
  LayersIcon,
  LinkIcon,
  MapIcon,
  MemoryIcon,
  MonitorIcon,
  RouterIcon,
  ScanIcon,
  ShieldIcon,
  TerminalIcon,
  TowerIcon,
  WalletIcon,
  WifiIcon,
} from './icons/ui'
import Footer from './components/Footer'
import Header from './components/Header'
import { BackgroundField, HeroField, SectionField, SectionWaves } from './components/BackgroundField'
import { useTheme } from './useTheme'
import { useReveal } from './useReveal'
import { SITE_NAME, usePageSeo } from './seo'
import './App.css'

function getServiceGroups(t: (typeof strings)[Lang]) {
  return [
    {
      label: t.svcGroupNetwork,
      items: [
        { name: 'Pi-hole', Icon: PiholeIcon, tag: t.svcTagDns },
        { name: 'Nginx Proxy Manager', Icon: NginxProxyManagerIcon, tag: t.svcTagProxy },
        { name: 'Tailscale', Icon: TailscaleIcon, tag: t.svcTagRemote },
      ],
    },
    {
      label: t.svcGroupManagement,
      items: [
        { name: 'Dockge', Icon: DockgeIcon, tag: t.svcTagCompose },
        { name: 'n8n', Icon: N8nIcon, tag: t.svcTagAutomation },
      ],
    },
    {
      label: t.svcGroupMonitoring,
      items: [
        { name: 'Uptime Kuma', Icon: UptimeKumaIcon, tag: t.svcTagMonitoring },
        { name: 'Beszel', Icon: BeszelIcon, tag: t.svcTagMetrics },
      ],
    },
    {
      label: t.svcGroupSecurity,
      items: [
        { name: 'fail2ban', Icon: ShieldIcon, tag: t.svcTagIntrusion },
        { name: 'rkhunter', Icon: ScanIcon, tag: t.svcTagRootkit },
        { name: 'Vaultwarden', Icon: VaultwardenIcon, tag: t.svcTagPasswords },
      ],
    },
    {
      label: t.svcGroupUtilities,
      items: [
        { name: 'RustDesk', Icon: MonitorIcon, tag: t.svcTagRemoteDesktop },
        { name: 'Actual Budget', Icon: WalletIcon, tag: t.svcTagFinance },
        { name: 'Stirling PDF', Icon: FileIcon, tag: t.svcTagPdfTools },
        { name: 'ocrmypdf', Icon: FileIcon, tag: t.svcTagOcr },
      ],
    },
  ] as const
}

const LYNIS_SCORE = 67
const LATEST_POSTS = 3

const SECTION_IDS = ['overview', 'hardware', 'stack', 'updates', 'network', 'ops', 'story'] as const

const CAROUSEL_MS = 5500

function LogSlide({
  post,
  lang,
  t,
}: {
  post: Post
  lang: Lang
  t: (typeof strings)[Lang]
}) {
  return (
    <Link to={`/blog/${post.slug}`} className="log-slide">
      <div className="log-slide__meta">
        <time className="log-slide__date" dateTime={post.date}>
          {formatPostDate(post.date, lang)}
        </time>
        {post.tags && post.tags.length > 0 ? (
          <ul className="log-slide__tags" aria-label={t.updatesTagsLabel}>
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="log-slide__body">
        <h3 className="log-slide__title">{post.title}</h3>
        {post.excerpt ? <p className="log-slide__excerpt">{post.excerpt}</p> : null}
        <span className="log-slide__go">{t.updatesRead}</span>
      </div>
    </Link>
  )
}

function LogCarousel({
  posts,
  lang,
  t,
}: {
  posts: Post[]
  lang: Lang
  t: (typeof strings)[Lang]
}) {
  const n = posts.length
  const loop = n > 1
  const [offset, setOffset] = useState(loop ? 1 : 0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const [epoch, setEpoch] = useState(0)

  const go = (dir: -1 | 1) => {
    if (!loop) return
    setAnimate(true)
    setOffset((o) => o + dir)
    setEpoch((e) => e + 1)
  }

  useEffect(() => {
    if (!loop || paused) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    const tick = () => {
      if (document.hidden) return
      setAnimate(true)
      setOffset((o) => o + 1)
    }
    const id = window.setInterval(tick, CAROUSEL_MS)
    return () => window.clearInterval(id)
  }, [loop, paused, epoch])

  useEffect(() => {
    if (animate) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true))
    })
    return () => cancelAnimationFrame(id)
  }, [animate, offset])

  const onTransitionEnd = (e: TransitionEvent<HTMLUListElement>) => {
    if (!loop) return
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (offset === 0) {
      setAnimate(false)
      setOffset(n)
    } else if (offset === n + 1) {
      setAnimate(false)
      setOffset(1)
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    }
  }

  const slides = loop ? [posts[n - 1], ...posts, posts[0]] : posts
  const count = slides.length

  return (
    <div
      className="log-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
      }}
      onKeyDown={onKeyDown}
    >
      <div className="log-carousel__nav">
        <button type="button" className="log-carousel__btn" onClick={() => go(-1)} aria-label={t.updatesPrev}>
          <ArrowLeftIcon aria-hidden="true" />
        </button>
        <button type="button" className="log-carousel__btn" onClick={() => go(1)} aria-label={t.updatesNext}>
          <ArrowRightIcon aria-hidden="true" />
        </button>
      </div>
      <div className="log-carousel__viewport">
        <ul
          className={animate ? 'log-carousel__track' : 'log-carousel__track log-carousel__track--instant'}
          style={{
            width: `${count * 100}%`,
            transform: `translate3d(-${(offset * 100) / count}%, 0, 0)`,
          }}
          aria-label={t.updatesFeedLabel}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((post, i) => {
            const clone = loop && (i === 0 || i === slides.length - 1)
            return (
              <li
                key={clone ? `clone-${i}-${post.slug}` : post.slug}
                {...(clone ? { 'data-clone': '', 'aria-hidden': true, inert: true } : {})}
              >
                <LogSlide post={post} lang={lang} t={t} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

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

function HwFigure({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <figure className="hw-figure">
      <img
        className="hw-figure__img"
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
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

function App() {
  const { theme, toggleTheme } = useTheme()
  const [lang, setLang] = useState<Lang>(readLang)
  const [activeSection, setActiveSection] = useState('overview')
  const t = strings[lang]
  const serviceGroups = getServiceGroups(t)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  usePageSeo({
    title: `${SITE_NAME} · Homelab`,
    description: t.metaDescription,
    path: '/',
  })

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => s instanceof HTMLElement)
    if (!sections.length) return

    let raf = 0
    const ioVisible = new Set<string>()

    const pickByScroll = () => {
      const topOffset = 132
      let current = sections[0].id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= topOffset) {
          current = section.id
        } else {
          break
        }
      }
      setActiveSection(current)
    }

    const schedulePick = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (ioVisible.size === 0) {
          pickByScroll()
        }
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (entry.isIntersecting) ioVisible.add(id)
          else ioVisible.delete(id)
        }

        const visible = sections
          .filter((section) => ioVisible.has(section.id))
          .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)
        if (visible[0]) {
          setActiveSection(visible[0].id)
          return
        }
        pickByScroll()
      },
      {
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
        rootMargin: '-18% 0px -62% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
    window.addEventListener('scroll', schedulePick, { passive: true })
    window.addEventListener('resize', schedulePick, { passive: true })
    pickByScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedulePick)
      window.removeEventListener('resize', schedulePick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }))
      }
    }
  }, [])

  const hardwareReveal = useReveal<HTMLElement>()
  const stackReveal = useReveal<HTMLElement>()
  const updatesReveal = useReveal<HTMLElement>()
  const networkReveal = useReveal<HTMLElement>()
  const opsReveal = useReveal<HTMLElement>()
  const storyReveal = useReveal<HTMLElement>()

  return (
    <>
      <BackgroundField />

      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>

      <Header
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'es' ? 'en' : 'es'))}
        theme={theme}
        onToggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      <main id="main">
        <section id="overview" className="hero" aria-labelledby="hero-title">
          <HeroField />
          <div className="layout-shell hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">{t.eyebrow}</p>
              <h1 id="hero-title">Sovereign Stack</h1>
              <h2 className="hero-lede">{t.closing}</h2>
            </div>

            <div className="hero-readout" role="group" aria-label={t.heroReadoutLabel}>
              <p className="hero-readout__meta">
                <span className="status-dot" aria-hidden="true" />
                <span className="hero-readout__online">{t.heroStatusOnline}</span>
                <span className="hero-readout__host">{t.heroHostLine}</span>
              </p>
              <ul className="hero-readout__facts">
                <li>
                  <DockgeIcon className="hero-readout__icon" aria-hidden="true" />
                  <span>
                    <strong>{t.statDocker}</strong> — {t.statDockerSub}
                  </span>
                </li>
                <li>
                  <PiholeIcon className="hero-readout__icon" aria-hidden="true" />
                  <span>
                    <strong>{t.statDns}</strong> — {t.statDnsSub}
                  </span>
                </li>
                <li>
                  <TailscaleIcon className="hero-readout__icon" aria-hidden="true" />
                  <span>
                    <strong>{t.statEdge}</strong> — {t.statEdgeSub}
                  </span>
                </li>
              </ul>
            </div>

            <Link to="/blog" className="hero-cta">
              {t.heroCta}
            </Link>
          </div>
        </section>

        <div className="layout-shell">
          <section
            id="hardware"
            ref={hardwareReveal}
            className="section hardware-section reveal"
            aria-labelledby="hw-title"
          >
            <div className="section-head section-head--tight">
              <h2 id="hw-title">{t.hwTitle}</h2>
            </div>
            <div className="info-block">
              <h3 className="info-block__title">NUC11ATKC4</h3>
              <p className="section-intro">{t.hwIntro}</p>
              <div className="hw-layout">
                <HwFigure
                  src="/imgs/hardware/nuc_solo_sin_fondo.png"
                  alt="Intel NUC11ATKC4"
                  width={900}
                  height={675}
                />
                <ul className="spec-list spec-list--grid">
                  <li>
                    <CpuIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwSpecCpuLabel}</span>
                      <span className="spec-list__value">{t.hwSpecCpuValue}</span>
                    </span>
                  </li>
                  <li>
                    <MemoryIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwSpecRamLabel}</span>
                      <span className="spec-list__value">{t.hwSpecRamValue}</span>
                    </span>
                  </li>
                  <li>
                    <DiskIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwSpecStorageLabel}</span>
                      <span className="spec-list__value">{t.hwSpecStorageValue}</span>
                    </span>
                  </li>
                  <li className="spec-list__item--span">
                    <TerminalIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwSpecOsLabel}</span>
                      <span className="spec-list__value">{t.hwSpecOsValue}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="info-block">
              <h3 className="info-block__title">{t.hwMainTitle}</h3>
              <p className="section-intro">{t.hwMainIntro}</p>
              <div className="hw-layout">
                <HwFigure
                  src="/imgs/hardware/pc_principal_sin_fondo.png"
                  alt={t.hwMainTitle}
                  width={900}
                  height={1200}
                />
                <ul className="spec-list spec-list--grid">
                  <li>
                    <GpuIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwMainGpuLabel}</span>
                      <span className="spec-list__value">{t.hwMainGpuValue}</span>
                    </span>
                  </li>
                  <li>
                    <CpuIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwMainCpuLabel}</span>
                      <span className="spec-list__value">{t.hwMainCpuValue}</span>
                    </span>
                  </li>
                  <li>
                    <MemoryIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwMainRamLabel}</span>
                      <span className="spec-list__value">{t.hwMainRamValue}</span>
                    </span>
                  </li>
                  <li>
                    <DiskIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwMainStorageLabel}</span>
                      <span className="spec-list__value">{t.hwMainStorageValue}</span>
                    </span>
                  </li>
                  <li>
                    <FanIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwMainCoolingLabel}</span>
                      <span className="spec-list__value">{t.hwMainCoolingValue}</span>
                    </span>
                  </li>
                  <li>
                    <TowerIcon className="spec-list__icon" aria-hidden="true" />
                    <span className="spec-list__text">
                      <span className="spec-list__label">{t.hwMainCaseLabel}</span>
                      <span className="spec-list__value">{t.hwMainCaseValue}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section
            id="stack"
            ref={stackReveal}
            className="section services-section section--band reveal"
            aria-labelledby="svc-title"
          >
            <SectionField motif="services" />
            <SectionWaves />
            <div className="section-head">
              <h2 id="svc-title">{t.stackTitle}</h2>
              <p className="section-intro">{t.stackIntro}</p>
            </div>
            <div className="svc-inventory">
              {serviceGroups.map((group, i) => (
                <div className={i === 0 ? 'svc-band svc-band--core' : 'svc-band'} key={group.label}>
                  <p className="svc-band__cat">{group.label}</p>
                  <ul className="svc-band__list">
                    {group.items.map(({ name, Icon, tag }) => (
                      <li key={name} className="svc-item">
                        <Icon className="svc-item__icon" aria-hidden="true" />
                        <span className="svc-item__text">
                          <span className="svc-item__name">{name}</span>
                          <span className="svc-item__tag">{tag}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section
            id="updates"
            ref={updatesReveal}
            className="section updates-section reveal"
            aria-labelledby="updates-section-title"
          >
            <div className="section-head">
              <h2 id="updates-section-title">{t.updatesSectionTitle}</h2>
              <p className="section-intro">{t.updatesSectionIntro}</p>
            </div>
            <LogCarousel posts={getPosts(lang).slice(0, LATEST_POSTS)} lang={lang} t={t} />
            <Link to="/blog" className="updates-see-all">
              {t.updatesSeeAll}
            </Link>
          </section>

          <section
            id="network"
            ref={networkReveal}
            className="section section--band reveal"
            aria-labelledby="net-section-title"
          >
            <SectionField motif="network" />
            <SectionWaves />
            <div className="section-head section-head--tight">
              <h2 id="net-section-title">{t.networkSectionTitle}</h2>
              <p className="section-intro">{t.networkSectionIntro}</p>
            </div>
            <div className="info-block info-block--icon">
              <LinkIcon className="info-block__icon" aria-hidden="true" />
              <div>
                <h3 className="info-block__title">{t.networkAccessTitle}</h3>
                <p>{t.networkAccessBody}</p>
              </div>
            </div>

            <div className="flow">
              <h3 className="info-block__title">{t.networkEvolutionTitle}</h3>
              <p className="flow__intro">{t.networkEvolutionIntro}</p>
              <ol className="flow-steps">
                <li className="flow-step flow-step--done">
                  <span className="flow-step__marker">
                    <RouterIcon aria-hidden="true" />
                  </span>
                  <div className="flow-step__body">
                    <h4>{t.networkStep1Title}</h4>
                    <p>{t.networkStep1Desc}</p>
                  </div>
                </li>
                <li className="flow-step flow-step--done">
                  <span className="flow-step__marker">
                    <RouterIcon aria-hidden="true" />
                  </span>
                  <div className="flow-step__body">
                    <h4>{t.networkStep2Title}</h4>
                    <p>{t.networkStep2Desc}</p>
                  </div>
                </li>
                <li className="flow-step flow-step--pending">
                  <span className="flow-step__marker">
                    <LayersIcon aria-hidden="true" />
                  </span>
                  <div className="flow-step__body">
                    <h4>
                      {t.networkStep3Title} <span className="gap-badge">{t.opsBackupsBadge}</span>
                    </h4>
                    <p>{t.networkStep3Desc}</p>
                  </div>
                </li>
                <li className="flow-step flow-step--done">
                  <span className="flow-step__marker">
                    <WifiIcon aria-hidden="true" />
                  </span>
                  <div className="flow-step__body">
                    <h4>{t.networkStep4Title}</h4>
                    <p>{t.networkStep4Desc}</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section id="ops" ref={opsReveal} className="section reveal" aria-labelledby="ops-section-title">
            <div className="section-head section-head--tight">
              <h2 id="ops-section-title">{t.opsSectionTitle}</h2>
            </div>
            <div className="ops-layout">

              <div className="ops-live">
                <div className="info-block info-block--icon">
                  <ActivityIcon className="info-block__icon" aria-hidden="true" />
                  <div>
                    <h3 className="info-block__title">{t.opsMonitoringTitle}</h3>
                    <p>{t.opsMonitoringBody}</p>
                    <ul className="inline-badges">
                      <li>
                        <UptimeKumaIcon aria-hidden="true" />
                        Uptime Kuma
                      </li>
                      <li>
                        <BeszelIcon aria-hidden="true" />
                        Beszel
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="info-block info-block--icon">
                  <N8nIcon className="info-block__icon" aria-hidden="true" />
                  <div>
                    <h3 className="info-block__title">{t.opsAutomationTitle}</h3>
                    <p>{t.opsAutomationBody}</p>
                    <ul className="inline-badges">
                      <li>
                        <N8nIcon aria-hidden="true" />
                        n8n
                      </li>
                      <li>
                        <TelegramIcon aria-hidden="true" />
                        Telegram
                      </li>
                    </ul>
                  </div>
                </div>
              </div>


              <div className="info-block info-block--icon ops-security">
                <ShieldIcon className="info-block__icon" aria-hidden="true" />
                <div>
                  <h3 className="info-block__title">{t.opsSecurityTitle}</h3>
                  <p>{t.opsSecurityIntro}</p>
                  <div className="lynis">
                    <p className="lynis__label">{t.opsSecurityLynis}</p>
                    <div
                      className="lynis__track"
                      role="meter"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={LYNIS_SCORE}
                      aria-label={t.opsSecurityLynis}
                    >
                      <span className="lynis__fill" style={{ width: `${LYNIS_SCORE}%` }} />
                    </div>
                  </div>
                  <p className="checklist-lead">{t.opsSecurityNext}</p>
                  <ul className="checklist">
                    <li>{t.opsSecurityItem1}</li>
                  </ul>
                </div>
              </div>

              <div className="info-block info-block--icon info-block--gap">
                <CloudOffIcon className="info-block__icon" aria-hidden="true" />
                <div>
                  <h3 className="info-block__title">
                    {t.opsBackupsTitle} <span className="gap-badge">{t.opsBackupsBadge}</span>
                  </h3>
                  <p>{t.opsBackupsBody}</p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="story"
            ref={storyReveal}
            className="section section--band section--band--close reveal"
            aria-labelledby="story-section-title"
          >
            <SectionField motif="story" />
            <SectionWaves close />
            <div className="section-head section-head--tight">
              <h2 id="story-section-title">{t.storySectionTitle}</h2>
            </div>
            <div className="info-grid info-grid--story">
              <div className="info-block info-block--icon">
                <CompassIcon className="info-block__icon" aria-hidden="true" />
                <div>
                  <h3 className="info-block__title">{t.storyWhyTitle}</h3>
                  <RichParagraph text={t.storyWhyBody} />
                  <Link to="/blog/mikrotik-sin-internet" className="updates-see-all">
                    {t.storyReadMore}
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="info-block__title">{t.roadmapTitle}</h3>
                <ol className="flow-steps flow-steps--compact">
                  {[
                    { title: t.roadmapItem1Title, desc: t.roadmapItem1Desc },
                    { title: t.roadmapItem2Title, desc: t.roadmapItem2Desc },
                    { title: t.roadmapItem3Title, desc: t.roadmapItem3Desc },
                    { title: t.roadmapItem4Title, desc: t.roadmapItem4Desc },
                  ].map((item) => (
                    <li key={item.title} className="flow-step">
                      <span className="flow-step__marker">
                        <MapIcon aria-hidden="true" />
                      </span>
                      <div className="flow-step__body">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  )
}

export default App
