# Design.md — Sovereign Stack

Documento vivo de decisiones de diseño. No es una spec cerrada: se actualiza a medida
que decidimos cosas. Cuando cambiemos algo del sistema visual, este archivo se edita
en el mismo PR/commit que el cambio.

**Alcance:** este documento tiene dos capas. La sección 2 (principios) y buena parte
de la 3 (tokens: color base, tipografías, uso de `clamp`) están pensadas como una
**base personal reutilizable de proyecto en proyecto** — se copia como punto de partida
y se permiten deltas sutiles por proyecto, no un sistema nuevo cada vez. El resto
(secciones 4–7) es específico de *este* sitio: el homelab.

## 1. Qué es el sitio

Landing/status page de un homelab personal (Intel NUC11ATKC4). Objetivo: un punto único,
simple y visual para mostrar la infraestructura propia — hardware, stack, red y
operación — con un estado que refleja lo que hay *ahora mismo*, no un histórico.

El histórico de cambios (lo que hoy vive en la sección "Bitácora") tiene vocación de
mudarse a un **blog aparte** — la landing muestra el presente; el blog cuenta cómo se
llegó ahí. Ver sección 6.

Audiencia: principalmente el propio autor y visitantes técnicos (reclutadores, otros
self-hosters) que llegan desde el portfolio/redes.

## 2. Principios de diseño (base personal — confirmados)

- **Técnico sin ser frío.** Tipografía mono para metadatos (fechas, tags, valores,
  y cualquier fragmento de código — la documentación técnica va a tener code snippets
  seguro), sans/heading para contenido. El acento de color sugiere "consola" sin ser
  un tema hacker-cliché.
- **Dark-first.** El tema oscuro es el diseño primario; el claro es una variante de
  los mismos tokens, no un sistema aparte.
- **Estado real, no histórico mezclado.** La landing documenta el estado actual del
  servidor/stack. Las actualizaciones y la narrativa de cómo se llegó a ese estado
  van al blog, no a la misma vista. Si algo no existe todavía (backups, red final),
  se dice explícitamente en vez de inventarlo.
- **Movimiento discreto.** Parallax del hero, flotación de la imagen, hover en cards:
  todo sutil, todo respeta `prefers-reduced-motion`.
- **Sin dependencias de UI.** CSS a mano, sin librería de componentes. Mantiene el
  bundle pequeño y coherente con el espíritu "self-hosted, controlo mi stack".

## 3. Sistema de diseño — dirección confirmada

### Color

Confirmado, pendiente de fijar valores exactos al iterar en el navegador:

- **Azul actual como acento primario** — se mantiene (`--accent` / familia `#8ea2ff`
  dark, `#4f5cff` light). Es la seña de identidad de la marca visual.
- **Fondo dark: un "carbón" oscuro**, no negro puro — variación tonal del `--bg`
  actual (`#070a12`), a explorar con algo más de temperatura/textura que un negro plano.
- **Fondo light: un blanco roto**, no `#ffffff` puro — en línea con el `--bg` claro
  actual (`#eef3fb`), ajustar tono si hace falta.
- `--cyan` como acento secundario para metadatos (fechas, eyebrow) — se mantiene salvo
  que al iterar visualmente no encaje.

### Tipografía

Necesitamos tres familias con roles claros (a elegir/probar, no cerradas todavía):

1. **Cuerpo** — legible en párrafos largos, prioridad sobre lo decorativo. Manrope hoy;
   evaluar alternativas si no convence en el rediseño.
2. **Metadatos** (fechas, eyebrows, labels, tags) — puede ser la misma mono o una sans
   condensada; a decidir en la iteración visual.
3. **Code — obligatoria.** El sitio va a documentar cosas (bloques de comandos,
   configs, nombres de servicio), así que una monoespaciada de código seria (hoy Fira
   Code) no es opcional.

### Escalado

- Uso de `clamp()` para tamaños fluidos: **aprobado, seguir así**.

### Layout

- Sin cerrar todavía — se van a probar varias versiones.
- Referencia de partida: el layout del portfolio personal (mismo autor) — no copiar
  literal, pero tomar como referencia de tono para que ambos sitios se sientan de la
  misma familia.
- Objetivo explícito: llegar a una **identidad visual propia** del homelab, no un
  template genérico de "status page".

## 4. Sistema de diseño — snapshot del código actual (`src/index.css`)

Para referencia mientras iteramos (esto describe lo que HAY, no lo que se decidió):

| Token | Dark | Light | Uso |
|---|---|---|---|
| `--bg` | `#070a12` | `#eef3fb` | fondo de página |
| `--text` / `--text-h` | `#a8b6cc` / `#f8fbff` | `#475a74` / `#0c1730` | cuerpo / headings |
| `--accent` | `#8ea2ff` | `#4f5cff` | acento primario (links, focus, bordes) |
| `--cyan` | `#38bdf8` | `#0891b2` | eyebrow, fechas |
| `--focus-ring` | = `--accent` | anillo de foco, accesible |

- Tipografías actuales: Manrope (sans), Sora (heading), Fira Code (mono).
- Espaciado: `--space-1`…`--space-6` definidas pero usadas de forma inconsistente
  (muchos componentes usan `rem` sueltos).
- Radios: `--radius-sm` 10px, `--radius-md` 14px, `--radius-lg` 20px.
- `--content-max: 1200px`, contenedor único `.layout-shell`.
- Breakpoints repetidos con valores distintos (960px/1024px) sin consolidar.

### Componentes existentes

- Header sticky con blur, nav con subrayado animado, toggle de tema, toggle de idioma,
  menú móvil en panel fullscreen.
- Hero con imagen flotante (parallax por scroll + animación CSS) y stats en pills.
- Paneles de hardware (sin card chrome, borde izquierdo de acento).
- Grid de servicios (pills mono).
- Feed de bitácora (`UpdateEntry`) — candidato a moverse al futuro blog.
- "Bento" cards reutilizadas en red/ops/historia — mismo componente, distintas grids.
- Footer con identidad + redes sociales + barra de copyright.

## 5. Backlog UI/UX

Sin priorizar todavía — se va rellenando y marcando aquí a medida que avanzamos.

- [ ] Consolidar breakpoints repetidos en variables o un set único.
- [ ] Adoptar `--space-*` de forma consistente en vez de valores `rem` sueltos.
- [ ] Revisar jerarquía tipográfica (h2 vs `.lede`).
- [ ] Elegir fuente de cuerpo / metadatos / code definitivas.
- [ ] Explorar 2–3 direcciones de layout distintas antes de fijar una.
- [ ] Auditoría de accesibilidad: contraste en tema claro, foco en menú móvil,
      anuncios de cambio de idioma/tema.
- [ ] Definir tratamiento de imágenes (el NUC "cutout" + drop-shadow) como patrón
      reutilizable.

## 6. Arquitectura de contenido: landing vs. blog

Decisión de dirección: separar la landing (estado actual) del blog (histórico de
cambios). Pendiente de definir:

- [ ] ¿Blog dentro del mismo proyecto (ruta `/blog`) o repo/subdominio aparte?
- [ ] ¿Se sigue escribiendo en TS (`updates.ts`) o pasa a Markdown/MDX?
- [ ] Migrar las entradas actuales de `src/updates.ts` como primeros posts.
- [ ] Sustituir/retirar la entrada `mock` de red una vez haya contenido real.

Ver `content-notes.md` para la materia prima de la que van a salir tanto el contenido
de la landing como los posts del blog.

## 7. Requisitos del sitio

- [ ] **v1** — vista base con estado general, imágenes y estructura inicial *(ya cubierto)*.
- [ ] **v2** — ¿servicios con estado real (up/down vía API de Uptime Kuma) o
      estático/manual?
- [ ] **v3** — mejoras visuales, contenido dinámico, más detalle técnico.
- [ ] Blog de actualizaciones (ver sección 6).
- [ ] **Despliegue: detrás de Tailscale**, coherente con la filosofía del propio sitio
      (nada de puertos públicos). ⚠️ Nota a resolver: si el objetivo es que reclutadores
      o visitantes externos lo vean, un despliegue solo-tailnet limita el acceso a
      dispositivos en tu red Tailscale. Si quieres que sea públicamente visible mientras
      se sirve desde tu propia infra, la opción natural es **Tailscale Funnel** (expone
      el servicio con TLS gestionado por Tailscale, sin abrir puertos en el router).
      Aclarar cuál de los dos escenarios es el que quieres.
- [ ] ¿Analítica? (self-hosted tipo Plausible, o ninguna).
- [ ] ¿SEO / OG tags / favicon set completo?

---

**Próximo paso:** cuando quieras, empezamos a iterar visualmente (colores/tipografía/
layout) en el navegador sobre estas direcciones. Mientras, puedes ir rellenando
`content-notes.md` con todo lo que sabes del homelab.
