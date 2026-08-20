import { useEffect } from 'react'
import { useConsent } from './ConsentProvider'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

function injectGtag(id: string) {
  const flag = window as unknown as Record<string, boolean>
  flag[`ga-disable-${id}`] = false

  if (!document.getElementById('ga4-gtag')) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
    const script = document.createElement('script')
    script.id = 'ga4-gtag'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
    document.head.appendChild(script)
  }

  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
  }

  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })
}

/** Loads GA4 only after explicit cookie acceptance. */
export default function Analytics() {
  const { consent } = useConsent()

  useEffect(() => {
    if (!GA_ID || consent !== 'accepted') return
    injectGtag(GA_ID)
  }, [consent])

  return null
}
