# Notes — Sovereign Stack

Backlog de proyecto y decisiones de arquitectura no-visuales. El sistema de diseño vive en
`DESIGN.md` (formato fijo, gestionado por el skill `impeccable`); este archivo es de
mantenimiento libre para todo lo demás.

## Backlog UI/UX pendiente

- [ ] Consolidar breakpoints repetidos (960px/1024px) en un set único.
- [ ] Adoptar `--space-*` de forma consistente en vez de valores `rem` sueltos.
- [ ] Auditoría de accesibilidad: contraste en tema claro, foco en menú móvil,
      anuncios de cambio de idioma/tema.
- [ ] Definir tratamiento de imágenes (el NUC "cutout" + drop-shadow) como patrón
      reutilizable.

## Arquitectura de contenido: landing vs. blog (decidido e implementado)

Landing y blog son piezas separadas, mismo proyecto — **landing = estado actual + índice
del blog** (últimos N posts como teaser con link a cada post completo), **blog = histórico
completo** en su propia ruta.

- [x] Blog dentro del mismo proyecto, ruta `/blog` (no repo/subdominio aparte).
- [x] Landing incluye sección "últimos posts" (reemplaza/absorbe la Bitácora completa en
      la landing — ya no vive el feed completo ahí, solo el teaser).
- [x] Posts en **MDX** (no TS, no MD plano). Motivo: permite embeber componentes React
      dentro del post (gráficas, callouts, tablas interactivas) sin salir de Markdown para
      el resto del texto. Loader: `@mdx-js/rollup` + `remark-frontmatter` /
      `remark-mdx-frontmatter` en `vite.config.ts`.
- [x] Routing con **React Router** (`/`, `/blog`, `/blog/:slug`). `App.tsx` (landing) queda
      intacto; blog vive en `src/pages/BlogIndex.tsx` + `BlogPost.tsx`, posts en
      `src/content/blog/*.mdx` cargados vía `import.meta.glob` (`src/blog.ts`).
- [x] Migradas las 4 entradas reales de `src/updates.ts` (borrado) a posts MDX en
      `src/content/blog/`, con contenido real sacado de `content-notes.md` (NUC + primer
      arranque, MikroTik y la caída de red, milestone Gastromind, cambio Portainer→Dockge).
      Se descartó la entrada `mock` de red — sustituida por la historia real.
- [x] Blog en **español e inglés** — posts MDX con sufijo `.es.mdx` / `.en.mdx`, misma
      slug; el loader (`getPosts` / `getPost`) elige por `lang` con fallback.
- [x] `BlogLayout` (`src/components/BlogLayout.tsx`) da header/footer mínimos + toggle de
      tema a `/blog` y `/blog/:slug`, compartiendo `useTheme` con la landing.

Ver `content-notes.md` para la materia prima de la que salen tanto el contenido de la
landing como los posts del blog.

## Requisitos del sitio / roadmap

- [x] **v1** — vista base con estado general, imágenes y estructura inicial.
- [ ] **v2** — ¿servicios con estado real (up/down vía API de Uptime Kuma) o
      estático/manual?
- [ ] **v3** — mejoras visuales, contenido dinámico, más detalle técnico.
- [x] Blog de actualizaciones (ver arriba).
- [x] **Despliegue: Vercel** (SPA Vite desde GitHub). No Tailscale para el sitio público —
      el lab sigue privado; esta web es la vitrina. En Vercel: Project → Settings →
      Environment Variables → `VITE_GA_MEASUREMENT_ID=G-…` (Production). Build: `pnpm
      build` / Output: `dist`. `vercel.json` reescribe rutas al `index.html` (React Router).
- [x] **Analítica:** Google Analytics 4 (`VITE_GA_MEASUREMENT_ID`) solo tras consentimiento
      explícito (banner Aceptar/Rechazar). Páginas `/legal`, `/privacy`, `/cookies`.
- [x] **SEO mínimo:** title/description por ruta, Open Graph + Twitter (`/og.png`),
      canonical, `robots.txt` + `sitemap.xml` en build (`VITE_SITE_URL`).
