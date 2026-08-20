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

/**
 * Variante de `useReveal` para listas: cada item observa su propio scroll y entra
 * por separado (en vez de un único fundido para todo el contenedor), útil cuando la
 * lista es más larga que el viewport. `resetKey` fuerza a reobservar cuando cambian
 * los items mostrados (p. ej. al cambiar de página o de vista) sin cambiar `count`.
 */
export function useRevealEach<T extends HTMLElement>(count: number, resetKey: unknown = count) {
  const itemRefs = useRef<(T | null)[]>([])
  itemRefs.current.length = count

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = itemRefs.current.filter((el): el is T => el !== null)
    if (!els.length) return

    els.forEach((el) => el.classList.add('reveal-pending'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending')
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [count, resetKey])

  return (index: number) => (el: T | null) => {
    itemRefs.current[index] = el
  }
}
