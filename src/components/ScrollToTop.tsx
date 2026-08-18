import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router's client-side navigation doesn't reset scroll position the way
// a full page load does — without this, navigating between pages keeps
// whatever scrollY the previous page was at.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
