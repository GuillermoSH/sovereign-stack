import type { Lang } from '../i18n'

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

type FooterProps = {
  lang: Lang
  footerText: string
}

export default function Footer({ lang, footerText }: FooterProps) {
  return (
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
          <p>{footerText}</p>
        </div>
      </div>
    </footer>
  )
}
