# Product

## Register

brand

## Users

El propio autor (Guillermo Sicilia Hernández) y visitantes técnicos que llegan desde su
portfolio (guillermosh.com) o redes: reclutadores y otros self-hosters. Buscan una foto
rápida y creíble de la infraestructura personal del autor — qué hardware, qué stack, qué
tan en serio se toma la operación de su propio homelab.

## Product Purpose

Landing/status page de un homelab personal (Intel NUC11ATKC4). Muestra el estado *actual*
del hardware, stack y red — no un histórico. El histórico (hitos, cambios, sustos) vive
en un blog aparte (`/blog`); la landing es la portada con teaser de las últimas entradas.
Éxito = un visitante técnico entiende en segundos qué hay corriendo y cómo está montado,
sin sentir que está leyendo una plantilla genérica de "status page".

## Brand Personality

Técnico sin ser frío. Consola sin caer en el cliché hacker (fondo negro, texto verde,
matrix). Dark-first: el oscuro es el diseño primario, el claro una variante de los mismos
tokens. Honesto sobre lo que falta (si no hay backups, se dice explícitamente en vez de
maquillarlo).

## Anti-references

- Grids de "bento cards" repetidas e idénticas — la seña más clara de plantilla genérica.
- Marcadores numerados (`01 / Hardware`, `02 / Stack`...) delante de cada sección — leído
  por el propio autor como "huele a slop de IA".
- Estética SaaS-status-page gris y sin voz (Upptime/statuspage.io genéricos).
- Tema hacker-cliché (verde matrix, ASCII art forzado).
- Guillermosh.com (portfolio del mismo autor) tiene una identidad visual fuerte y propia
  (escena espacial con paralaje, riel de scroll, acentos naranja/cian) — no se traslada tal
  cual: sovereign-stack necesita transmitir *estado real*, no una narrativa cinematográfica.
  Lo que sí se adopta de ahí es el principio de fondo: secciones amplias con contenido
  editorial en vez de todo troceado en tarjetas.

## Design Principles

1. **Secciones amplias, no cards trituradas.** El contenido se organiza en bloques
   editoriales generosos; una card se usa solo cuando de verdad es la mejor forma de
   mostrar algo agrupable (nunca por defecto, nunca anidada, nunca repetida como plantilla).
2. **Movimiento con intención.** El sitio no es estático, pero cada animación tiene un
   motivo (parallax del hero, transiciones de estado) — nunca decorativo porque sí, y
   siempre con alternativa para `prefers-reduced-motion`.
3. **Estado real, no histórico mezclado.** La landing documenta el presente; el blog
   cuenta cómo se llegó ahí. Si algo no existe todavía, se dice, no se rellena.
4. **Un sistema, dos temas.** Los tokens de color/tipografía se definen una vez; light y
   dark son variantes del mismo sistema, no diseños separados.
5. **Técnico en el detalle.** Mono para metadatos/fechas/código, sans para prosa. La
   documentación técnica (comandos, configs) es ciudadano de primera clase visualmente.

## Accessibility & Inclusion

- Contraste mínimo AA (texto de cuerpo ≥4.5:1, texto grande ≥3:1) en ambos temas.
- Totalmente navegable por teclado — mantener skip-link, `aria-current` en nav, anillos de
  foco visibles (`focus-visible`).
- Todo movimiento debe respetar `prefers-reduced-motion: reduce` con alternativa (fade o
  instantáneo, nunca contenido oculto sin fallback).
- Sin requisitos de usuarios con necesidades específicas conocidas más allá de lo anterior.
