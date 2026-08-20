import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { strings, type Lang } from '../i18n'
import { useTheme } from '../useTheme'
import Footer from './Footer'
import Header from './Header'
import '../App.css'

function readLang(): Lang {
  try {
    const v = localStorage.getItem('lang')
    if (v === 'en' || v === 'es') return v
  } catch {
    /* ignore */
  }
  return 'es'
}

export default function BlogLayout() {
  const { theme, toggleTheme } = useTheme()
  const [lang, setLang] = useState<Lang>(readLang)
  const t = strings[lang]
  const location = useLocation()

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>

      <Header
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'es' ? 'en' : 'es'))}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main id="main">
        <div className="layout-shell page-enter" key={location.pathname}>
          <Outlet />
        </div>
      </main>

      <Footer lang={lang} />
    </>
  )
}
