import { useId } from 'react'
import { Link } from 'react-router-dom'
import { strings } from '../i18n'
import { useHtmlLang } from '../useHtmlLang'
import { useConsent } from './ConsentProvider'

function CookieIcon() {
  const biteId = useId().replace(/:/g, '')
  const maskId = `cookie-bite-${biteId}`

  return (
    <svg className="cookie-banner__icon" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect width="64" height="64" fill="#fff" />
          {/* Scalloped bite — several overlapping “teeth” along the rim */}
          <circle cx="38" cy="14" r="5.4" fill="#000" />
          <circle cx="44" cy="16" r="5.8" fill="#000" />
          <circle cx="49" cy="21" r="5.6" fill="#000" />
          <circle cx="51.5" cy="28" r="5.3" fill="#000" />
          <circle cx="51" cy="34.5" r="4.6" fill="#000" />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        <circle className="cookie-banner__icon-glow" cx="30" cy="34" r="24" />
        <circle className="cookie-banner__icon-body" cx="30" cy="34" r="22" />
        <circle
          className="cookie-banner__icon-rim"
          cx="30"
          cy="34"
          r="20.5"
          fill="none"
          strokeWidth="2.2"
        />
        <ellipse className="cookie-banner__icon-chip" cx="20.5" cy="27" rx="3.4" ry="2.9" transform="rotate(-18 20.5 27)" />
        <ellipse className="cookie-banner__icon-chip" cx="33" cy="38.5" rx="4.1" ry="3.3" transform="rotate(22 33 38.5)" />
        <ellipse className="cookie-banner__icon-chip" cx="24" cy="43" rx="2.6" ry="2.2" transform="rotate(-8 24 43)" />
        <ellipse className="cookie-banner__icon-chip" cx="37.5" cy="29" rx="2.4" ry="2.9" transform="rotate(35 37.5 29)" />
        <ellipse className="cookie-banner__icon-chip" cx="16.5" cy="36.5" rx="2.1" ry="1.7" transform="rotate(12 16.5 36.5)" />
        <ellipse className="cookie-banner__icon-chip" cx="29" cy="24" rx="1.8" ry="2.2" transform="rotate(-40 29 24)" />
      </g>
    </svg>
  )
}

export default function CookieBanner() {
  const lang = useHtmlLang()
  const t = strings[lang]
  const { bannerOpen, accept, reject } = useConsent()

  if (!bannerOpen) return null

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="layout-shell cookie-banner__shell">
        <div className="cookie-banner__card">
          <CookieIcon />
          <div className="cookie-banner__copy">
            <p id="cookie-banner-title" className="cookie-banner__title">
              {t.cookieTitle}
            </p>
            <p id="cookie-banner-desc" className="cookie-banner__text">
              {t.cookieBody}{' '}
              <Link to="/cookies">{t.cookieMore}</Link>
            </p>
          </div>
          <div className="cookie-banner__actions">
            <button type="button" className="cookie-banner__btn cookie-banner__btn--reject" onClick={reject}>
              {t.cookieReject}
            </button>
            <button type="button" className="cookie-banner__btn cookie-banner__btn--accept" onClick={accept}>
              {t.cookieAccept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
