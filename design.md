---
name: Sovereign Stack
description: Landing + blog de un homelab personal — estado real, no plantilla de status page
colors:
  ink-void: "#070a12"
  text-body: "#a8b6cc"
  text-heading: "#f8fbff"
  text-muted: "#7b8ba5"
  signal-periwinkle: "#8ea2ff"
  signal-periwinkle-strong: "#d1c5ff"
  signal-cyan: "#38bdf8"
  footer-ink: "#090d17"
  paper-light: "#eef3fb"
  ink-light: "#0c1730"
typography:
  display:
    fontFamily: "Sora, Aptos, sans-serif"
    fontSize: "clamp(2.2rem, 5.2vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Sora, Aptos, sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Sora, Aptos, sans-serif"
    fontSize: "clamp(1.08rem, 2.4vw, 1.3rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0.01em"
  label:
    fontFamily: "Fira Code, Consolas, monospace"
    fontSize: "0.78rem"
    fontWeight: 600
    letterSpacing: "0.05em"
  micro:
    fontFamily: "Fira Code, Consolas, monospace"
    fontSize: "0.62rem – 0.74rem"
    fontWeight: 600
    letterSpacing: "0.04em – 0.06em"
  small:
    fontFamily: "Manrope, Segoe UI, sans-serif"
    fontSize: "0.82rem – 0.96rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  xs: "2px – 6px"
  sm: "10px"
  md: "14px"
  lg: "20px"
  full: "999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.5rem"
  6: "2rem"
components:
  button-theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.sm}"
  pill-tag:
    backgroundColor: "{colors.ink-void}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
  link-accent:
    textColor: "{colors.signal-periwinkle}"
---

# Design System: Sovereign Stack

## 1. Overview

**Creative North Star: "El cuaderno de bitácora"**

Sovereign Stack documenta el estado *real* de un homelab personal — no vende nada, no
convierte a nadie, no necesita gradientes de urgencia. Es un cuaderno técnico: denso en
contenido concreto (specs, servicios, fechas), escaso en decoración. Cada sección es una
entrada de cuaderno amplia, no una tarjeta de producto. El tono es "técnico sin ser frío":
mono para lo factual (fechas, tags, comandos), sans para la prosa, un acento periwinkle que
sugiere consola sin caer en el cliché hacker de verde-sobre-negro.

El sistema rechaza explícitamente la estética "SaaS status-page genérica": grids de
bento-cards idénticas, marcadores numerados (`01 / Hardware`, `02 / Stack`) delante de cada
sección, y el combo borde-fino + sombra-ancha-difusa que delata generación por IA. También
rechaza el tema hacker-cliché (verde matrix, ASCII forzado) y — aunque el portfolio del
mismo autor (guillermosh.com) tiene una identidad fuerte propia con escena espacial y
paralaje — no se copia esa narrativa cinematográfica aquí: este sitio enseña estado, no
cuenta una historia con ilustración.

**Key Characteristics:**
- Secciones amplias y editoriales; las cards son la excepción, no la plantilla por defecto.
- Dark-first: el oscuro es el sistema primario, el claro una variante de los mismos tokens.
- Jerarquía tipográfica hace el trabajo que antes hacían los marcadores numerados.
- Un único acento de color (periwinkle) con el cian reservado solo a metadatos.
- Movimiento discreto pero real: nunca decoración sin motivo, siempre con alternativa
  `prefers-reduced-motion`.

## 2. Colors

Paleta restringida: un fondo casi negro con textura sutil de malla, un acento periwinkle
como única señal de interactividad, y cian reservado en exclusiva para metadatos técnicos
(fechas, eyebrows). El resto es escala de grises fríos.

### Primary
- **Signal Periwinkle** (`#8ea2ff` dark / `#4f5cff` light): único acento de interacción —
  links, foco, bordes activos, hover de nav. Nunca decorativo por sí solo; siempre ligado a
  un estado (hover, focus, activo).
- **Signal Periwinkle Strong** (`#d1c5ff` dark / `#4251eb` light): variante para hover sobre
  el acento primario y para `h3` de soporte (subtítulos dentro de paneles).

### Secondary
- **Signal Cyan** (`#38bdf8` dark / `#0891b2` light): exclusivo de metadatos — fechas de
  bitácora/blog, eyebrows puntuales. Nunca se usa como acento de acción (eso es trabajo del
  periwinkle).

### Neutral
- **Void Ink** (`#070a12`): fondo dark primario, sólido. No es negro puro. La textura
  de página es el campo de circuito tiled (`BackgroundField`, traces + nodos a baja
  opacidad). El hero lleva además un **signal-plane** a viewport completo (planos
  angulares periwinkle/cian + traces que cruzan la pantalla), con máscara que se
  desvanece hacia el void. Se descartan los gradientes radiales tipo "mesh".
- **Cool Slate** (`#a8b6cc`): texto de cuerpo en dark.
- **Off-White Heading** (`#f8fbff`): titulares en dark.
- **Muted Fog** (`#7b8ba5`): texto secundario/deshabilitado, labels de apoyo.
- **Broken White** (`#eef3fb`): fondo light primario — nunca `#ffffff` puro.
- **Deep Ink** (`#0c1730`): titulares en light.
- **Footer Ink** (`#090d17` dark / `#e8edf3` light): fondo del footer, un tono por debajo
  del body para marcar cierre de página sin usar un borde grueso.

### Semantic (excepción al Accent Rule)
- **Status Online** (`#34d399` dark / `#059669` light): único uso fuera de periwinkle/cian
  — un punto pulsante junto a "en línea" / "online" en el readout del hero. Es una señal
  semántica de estado (verde = online), no un acento decorativo; no se reutiliza para nada
  que no sea "esto está en marcha ahora mismo".

### Named Rules
**The One Accent Rule.** Periwinkle es el único color que dispara una acción (link, foco,
hover). Si algo no es interactivo, no lleva ese color — se resuelve en gris o en cian solo
si es metadato. La excepción es el color semántico de estado (ver arriba).

**The No Ghost-Card Rule.** Prohibido combinar borde de 1px + `box-shadow` con blur ≥16px en
el mismo elemento en reposo (el "ghost card" que delata IA). Un contenedor usa borde sólido
*o* un tinte de fondo distinto del lienzo — nunca ambos apilados con una sombra difusa
encima.

**Nota — colores literales fuera de paleta.** `#000`/`#ffffff` aparecen solo como utilidad
(`mask-image` de luminancia, `color-mix()` para aclarar un borde) y `#a78bfa` solo como
tercer stop del gradiente de `.brand-mark` — ninguno es un color semántico reutilizable, así
que no llevan token. Si un color literal empieza a repetirse fuera de estos tres casos, sí
es deriva real y hay que darle nombre.

## 3. Typography

**Display Font:** Sora (con fallback Aptos, sans-serif)
**Body Font:** Manrope (con fallback Segoe UI, sans-serif)
**Label/Mono Font:** Fira Code (con fallback Consolas, monospace)

**Character:** Sora aporta el filo geométrico para titulares — condensado, seguro, técnico.
Manrope lleva el peso de la lectura larga sin cansar. Fira Code marca lo factual (fechas,
tags, comandos) como distinto de la prosa a simple vista, sin necesitar una etiqueta que lo
diga.

### Hierarchy
- **Display** (700, `clamp(2.2rem, 5.2vw, 3.6rem)`, line-height 1.05): título del hero
  únicamente (`Sovereign Stack`).
- **Headline** (600, `clamp(1.6rem, 3.2vw, 2.3rem)`, line-height 1.15): título de cada
  sección de la landing (`Servicios en marcha`, `Bitácora`, título del índice de blog).
  Sustituye al marcador numerado como señal de jerarquía — el tamaño solo ya dice "esto
  empieza una sección nueva".
- **Title** (600, `clamp(1.08rem, 2.4vw, 1.3rem)`, line-height 1.25): subtítulos dentro de
  una sección (título de un panel, de una entrada de bitácora, de un post en el índice).
- **Body** (400, 17px, line-height 1.65, `letter-spacing: 0.01em`): prosa. Máximo 65-72ch
  por línea (ya aplicado en `.section-intro` y `.blog-post__body`).
- **Label** (600, 0.78rem, `letter-spacing: 0.05em`, uppercase donde aplica): fechas, tags,
  metadatos de bitácora/blog. Siempre en Fira Code.
- **Micro** (600, `0.62rem–0.74rem`, Fira Code): un paso por debajo de Label para metadatos
  todavía más densos — labels de spec-sheet (`CPU`, `RAM`), categorías de `.svc-band`, tags
  de chip. Fluye dentro de esa banda por componente en vez de fijarse a un único valor; es
  el motivo real de la mayoría de `font-size` fuera de la rampa documentada, no deriva.
- **Small** (400, `0.82rem–0.96rem`, Manrope): un paso entre Label y Body para prosa
  secundaria/densa — valores de spec, filas de `.svc-item`, ítems de checklist. Igual que
  Micro, flexiona en banda por componente, no es un valor único.

### Named Rules
**The Size-Not-Number Rule.** La jerarquía entre secciones la da el salto Headline → Title
→ Body, no un contador delante del título. Ningún `01 / Nombre` antes de un `<h2>`.

### Iconografía
Los servicios del stack (Pi-hole, Dockge, Uptime Kuma, Nginx Proxy Manager, n8n,
Vaultwarden, Beszel) y los highlights del hero (Dockge, Pi-hole, Tailscale) llevan icono de
marca — trazados de Simple Icons vendorizados en `src/icons/brands.tsx` (nunca cargados de
un CDN externo: contradiría el ethos self-hosted del propio sitio). Dockge y Beszel no
existen en Simple Icons; llevan un glifo genérico propio (pila de capas / línea de pulso) al
mismo grosor de trazo que el resto, no una ilustración.

## 4. Elevation

Sistema plano por defecto. La profundidad no viene de sombras difusas sino de tinte de
superficie (`--surface`, un azul-tinta translúcido sobre el void) y de bordes de 1px. Las
sombras existen pero se reservan para estados de interacción reales (hover), nunca en
reposo, y con blur contenido — no la sombra ancha de 44-56px que usaban antes los
bento-cards.

### Corner Scale
`--radius-sm/md/lg` (10/14/20px) cubren botones y cards. Elementos pequeños y densos
(marcadores de flow-step, barra de progreso de Lynis, badges) usan un paso más chico,
`2px–6px` (`rounded.xs`) — nunca el mismo 10px de un botón en un elemento de 20px de alto.
Los pills totalmente redondeados (`gap-badge`, chips) usan `999px` (`rounded.full`).

### Shadow Vocabulary
- **hover-lift** (`box-shadow: 0 8px 20px -8px rgba(2, 6, 23, 0.5)`): único uso de sombra —
  al hacer hover sobre un elemento interactivo (card de blog, entrada de bitácora enlazada).
  Blur contenido a propósito; nunca aparece en reposo.

### Named Rules
**The Flat-At-Rest Rule.** Ningún contenedor lleva sombra en su estado por defecto. La
sombra es siempre una respuesta a hover/focus, nunca decoración estática.

## 5. Components

### Buttons / Toggles
- **Shape:** esquinas suaves (10px, `--radius-sm`).
- **Primary (theme/lang toggle):** fondo transparente, icono/texto en `text-heading`, sin
  borde visible en reposo.
- **Hover / Focus:** `background: var(--nav-hover-bg)` en hover; anillo de foco de 2px en
  `--focus-ring` con `outline-offset: 2-3px` — nunca se suprime el foco.

### Chips / Tags
- **Style:** fondo `--pill-bg`, borde 1px `--pill-border`, texto mono en mayúsculas,
  `letter-spacing: 0.04-0.06em`. Sin sombra.
- **State:** hover cambia fondo a `--accent-bg` y borde a `--accent-border`; no hay estado
  "seleccionado" — son metadatos, no filtros.

### Cards / Containers (uso restringido)
- **Cuándo usarlas:** solo para colecciones reales de ítems paralelos y navegables (posts de
  blog, entradas de bitácora enlazadas). Nunca para partir en tres una sección que en
  realidad es un solo bloque de prosa (Red, Operación, Historia dejan de usar bento-grid de
  3 columnas idénticas; pasan a bloques editoriales de ancho variable).
- **Corner Style:** 14px (`--radius-md`).
- **Background:** tinte de superficie sólido (`--surface` o similar), nunca gradiente
  `linear-gradient` de 155deg decorativo sin motivo.
- **Shadow Strategy:** ninguna en reposo; `hover-lift` solo si la card es un link.
- **Border:** 1px `--surface-border`. Si hay sombra en hover, no se sube también la
  intensidad del borde a la vez (evita el "doble refuerzo" que grita ghost-card).

### Inputs / Fields
No hay formularios en el sitio actualmente; si se añaden, seguir el mismo par borde 1px +
tinte de fondo, sin sombra en reposo.

### Navigation
- **Style:** header sticky con blur (`backdrop-filter`), nav con subrayado animado bajo el
  item activo, mono no se usa aquí (nav es sans, Manrope).
- **Active state:** `aria-current="page"` + acento periwinkle bajo el link.
- **Mobile:** panel fullscreen deslizante, mismo estilo de lista que el nav desktop.

### Bitácora / Blog entry (componente de firma)
En la landing, las últimas entradas van en un carousel horizontal con `scroll-snap`
(peek de la siguiente, botones prev/next, teclado; sin autoplay). Con
`prefers-reduced-motion` pasa a stack / 3 columnas, sin snap. Fecha en mono-cian,
tags como chips, título en Title, excerpt en Body. Todo el bloque es un único `<Link>`
— el hover eleva con `hover-lift`, nunca con sombra ancha. El índice de `/blog` sigue
siendo una lista vertical.

## 6. Do's and Don'ts

### Do:
- **Do** usar Headline (`clamp(1.6rem, 3.2vw, 2.3rem)`) para todo título de sección — el
  tamaño reemplaza al marcador numerado como señal de jerarquía.
- **Do** dejar que una sección sea un bloque de prosa ancho cuando el contenido es narrativo
  (Historia, Red) — no forzarlo dentro de 2-3 cards idénticas.
- **Do** reservar el cian (`#38bdf8`) exclusivamente para fechas/metadatos.
- **Do** aplicar sombra (`hover-lift`, blur ≤20px) solo como respuesta a hover/focus.
- **Do** respetar `prefers-reduced-motion: reduce` en cada animación nueva.
- **Do** usar `.section { padding-block: clamp(3.4rem, 8vw, 6.2rem) }` como única fuente de
  ritmo vertical — no reintroducir padding ad-hoc por sección.
- **Do** listas de servicios como inventario tipo spec-sheet (`.svc-band`: categoría a la
  izquierda, filas icono+nombre+rol a la derecha) — el grupo de red lleva un poco más de
  presencia; nunca una caja alrededor del logo.
- **Do** un único choreographed load en el hero (eyebrow → título → lede → readout, CSS puro)
  y un reveal-on-scroll ligero por sección (`useReveal`) — nunca microanimaciones sueltas
  repetidas por toda la página.
- **Do** el hero a full-bleed (fuera del `.layout-shell`), con signal-plane a viewport y
  readout de estado a ancho de contenido (regla 1px + mono), no una ventana de terminal.

### Don't:
- **Don't** anteponer marcadores numerados (`01 / Hardware`, `02 / Stack`) a los títulos de
  sección — es el scaffold que el propio autor identificó como "huele a slop de IA".
- **Don't** combinar borde de 1px + `box-shadow` de blur ≥16px en el mismo elemento en
  reposo (ghost-card).
- **Don't** recortar el campo abstracto del hero al ancho de contenido — es viewport completo,
  con máscara hacia el void.
- **Don't** usar una consola falsa (`$ status`) como columna del hero.
- **Don't** usar grids de 3–4 cards idénticas como plantilla por defecto para agrupar
  contenido dispar (Red, Operación, Historia) — cada sección se diseña para su propio
  contenido, no se rellena en el mismo molde de bento.
- **Don't** usar `linear-gradient` de 155deg decorativo en el fondo de una card solo por
  textura — si hace falta profundidad, usar un tinte sólido de superficie.
- **Don't** replicar la escena espacial/paralaje cinematográfica de guillermosh.com aquí —
  ese registro es del portfolio, no del status page.
- **Don't** usar verde-sobre-negro ni ASCII art — cliché hacker explícitamente rechazado.
- **Don't** usar la retícula de fondo (`#root::before`, `--grid-line`) — se probó y se
  descartó junto con el mesh; el fondo de página es el campo de circuito tiled, no una malla.
- **Don't** meter un icono/chip en una caja con fondo y borde solo para mostrar un logo de
  servicio — icono a color de texto, en línea, sin chrome.
- **Don't** gatear la visibilidad de una sección detrás de una clase que solo añade JS
  (`useReveal` respeta esto: sin JS o sin querer, el contenido es visible igual).
