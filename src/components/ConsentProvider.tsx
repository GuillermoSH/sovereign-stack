import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearConsent,
  disableAnalytics,
  readConsent,
  writeConsent,
  type Consent,
} from '../consent'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

type ConsentContextValue = {
  consent: Consent | null
  /** Banner visible when unset, or when the user reopens preferences. */
  bannerOpen: boolean
  accept: () => void
  reject: () => void
  openPreferences: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(() => readConsent())
  const [bannerOpen, setBannerOpen] = useState(() => readConsent() === null)

  const accept = useCallback(() => {
    writeConsent('accepted')
    setConsent('accepted')
    setBannerOpen(false)
  }, [])

  const reject = useCallback(() => {
    writeConsent('rejected')
    setConsent('rejected')
    setBannerOpen(false)
    disableAnalytics(GA_ID)
  }, [])

  const openPreferences = useCallback(() => {
    clearConsent()
    setConsent(null)
    setBannerOpen(true)
    disableAnalytics(GA_ID)
  }, [])

  const value = useMemo(
    () => ({ consent, bannerOpen, accept, reject, openPreferences }),
    [consent, bannerOpen, accept, reject, openPreferences],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error('useConsent must be used within ConsentProvider')
  }
  return ctx
}
