import { useEffect, useRef } from 'react'

/**
 * Añade una entrada suave cuando el elemento entra en viewport. El contenido es
 * visible por defecto siempre (sin JS, con `prefers-reduced-motion`, o si el observer
 * nunca dispara) — las clases que ocultan solo las añade este hook en tiempo de
 * ejecución, nunca el marcado estático.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.classList.add('reveal-pending')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('reveal-pending')
          el.classList.add('reveal-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
