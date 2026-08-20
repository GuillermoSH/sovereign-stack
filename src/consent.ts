export type Consent = 'accepted' | 'rejected'

export const CONSENT_STORAGE_KEY = 'cookie-consent'

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (v === 'accepted' || v === 'rejected') return v
  } catch {
    /* ignore */
  }
  return null
}

export function writeConsent(value: Consent): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value)
  } catch {
    /* ignore */
  }
}

export function clearConsent(): void {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

/** Stop GA after withdrawal and drop typical GA cookies on this host. */
export function disableAnalytics(measurementId?: string): void {
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void
    [key: string]: unknown
  }
  if (measurementId) {
    w[`ga-disable-${measurementId}`] = true
  }
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
    })
  }

  const cookies = document.cookie.split(';')
  for (const raw of cookies) {
    const name = raw.split('=')[0]?.trim()
    if (!name) continue
    if (name === '_ga' || name === '_gid' || name.startsWith('_ga_') || name.startsWith('_gat')) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
    }
  }
}
