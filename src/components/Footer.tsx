import { Link, useLocation } from 'react-router-dom'
import { strings, type Lang } from '../i18n'
import { CoffeeIcon } from '../icons/ui'
import { useReveal } from '../useReveal'

/** Swap these when reusing the footer shell on other sites. */
const PORTFOLIO_URL = 'https://guillermosh.com'
const EMAIL = 'siciliahernandezguillermo@gmail.com'
const GITHUB_URL = 'https://github.com/GuillermoSH'
const LINKEDIN_URL =
  'https://www.linkedin.com/in/guillermo-sicilia-hern%C3%A1ndez-95861523b/'
const MARQUEE_LOOPS = 4

const NAV_SECTIONS = [
  { id: 'hardware', labelKey: 'navHardware' },
  { id: 'stack', labelKey: 'navStack' },
  { id: 'updates', labelKey: 'navUpdates' },
  { id: 'network', labelKey: 'navNetwork' },
  { id: 'ops', labelKey: 'navOps' },
  { id: 'story', labelKey: 'navStory' },
] as const

function GitHubIcon() {
  return (
    <svg className="site-footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.476 2 2 6.59 2 12.252c0 4.53 2.865 8.372 6.839 9.727.5.095.683-.222.683-.492 0-.244-.01-1.048-.014-1.9-2.782.616-3.369-1.216-3.369-1.216-.455-1.186-1.11-1.5-1.11-1.5-.908-.638.069-.625.069-.625 1.004.072 1.532 1.056 1.532 1.056.892 1.566 2.34 1.114 2.91.852.091-.663.35-1.115.635-1.37-2.22-.26-4.555-1.14-4.555-5.074 0-1.122.39-2.039 1.03-2.758-.104-.26-.447-1.306.098-2.723 0 0 .84-.277 2.75 1.053A9.37 9.37 0 0 1 12 6.83c.85.004 1.705.117 2.504.344 1.909-1.33 2.748-1.053 2.748-1.053.547 1.417.203 2.463.1 2.723.64.719 1.028 1.636 1.028 2.758 0 3.944-2.339 4.811-4.566 5.066.359.318.679.942.679 1.899 0 1.37-.013 2.474-.013 2.811 0 .272.18.592.688.491C19.138 20.62 22 16.78 22 12.252 22 6.59 17.523 2 12 2Z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="site-footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.5 9.8h2.86v8.7H5.5V9.8Zm4.66 0H12.9v1.24h.04c.38-.73 1.31-1.5 2.7-1.5 2.88 0 3.41 1.92 3.41 4.42v4.54H16.2v-4.03c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.05-1.55 2.13v4.1h-2.85V9.8Z"
      />
    </svg>
  )
}

type FooterProps = {
  lang: Lang
}

export default function Footer({ lang }: FooterProps) {
  const t = strings[lang]
  const location = useLocation()
  const isHome = location.pathname === '/'
  const revealRef = useReveal<HTMLElement>()

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`)

  const marqueePhrase = [t.footerMarqueeBrand, t.footerMarqueeHomelab, t.footerMarqueeJoke]
  const marqueeSequence = Array.from({ length: MARQUEE_LOOPS }, () => marqueePhrase).flat()

  return (
    <footer className="site-footer" ref={revealRef}>
      <div className="site-footer__marquee" aria-hidden="true">
        <div className="site-footer__marquee-track">
          {marqueeSequence.map((phrase, i) => (
            <span key={`a-${i}`} className="site-footer__marquee-item">
              {phrase}
              <span className="site-footer__marquee-dot" />
            </span>
          ))}
          {marqueeSequence.map((phrase, i) => (
            <span key={`b-${i}`} className="site-footer__marquee-item">
              {phrase}
              <span className="site-footer__marquee-dot" />
            </span>
          ))}
        </div>
      </div>
      <p className="visually-hidden">{t.footerMarqueeBrand}</p>

      <div className="layout-shell site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__intro">
            <p className="site-footer__bio">{t.footerBio}</p>
          </div>

          <div className="site-footer__talk">
            <p className="site-footer__talk-label">{t.footerTalkLabel}</p>
            <p className="site-footer__email">{EMAIL}</p>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label={t.footerNavLabel}>
          <p className="site-footer__nav-label">{t.footerNavLabel}</p>
          <ul className="site-footer__links">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={sectionHref(section.id)}>{t[section.labelKey]}</a>
              </li>
            ))}
            <li>
              <Link to="/blog">{t.navBlogItem}</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="site-footer__bar">
        <div className="layout-shell site-footer__bar-inner">
          <p className="site-footer__legal">
            {t.footerCopyright}
            <span className="site-footer__credit-sep" aria-hidden="true">
              {' '}
              ·{' '}
            </span>
            {t.footerRights}
          </p>

          <div className="site-footer__socials" aria-label={t.footerSocialsLabel}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>

          <div className="site-footer__meta-end">
            <a
              className="site-footer__by"
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footerBy}
            </a>
            <p className="site-footer__credit-made">
              {t.footerCredit}
              <CoffeeIcon
                className="site-footer__coffee"
                aria-label={t.footerCoffeeLabel}
                role="img"
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
