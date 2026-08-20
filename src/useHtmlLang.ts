import { useEffect, useState } from 'react'
import type { Lang } from './i18n'

function readHtmlLang(): Lang {
  try {
    const stored = localStorage.getItem('lang')
    if (stored === 'en' || stored === 'es') return stored
  } catch {
    /* ignore */
  }
  const html = document.documentElement.lang
  return html === 'en' ? 'en' : 'es'
}

/** Tracks `document.documentElement.lang` so chrome outside App/BlogLayout stays in sync. */
export function useHtmlLang(): Lang {
  const [lang, setLang] = useState<Lang>(readHtmlLang)

  useEffect(() => {
    const el = document.documentElement
    const sync = () => setLang(el.lang === 'en' ? 'en' : 'es')
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(el, { attributes: true, attributeFilter: ['lang'] })
    return () => obs.disconnect()
  }, [])

  return lang
}
