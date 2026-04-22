import type { Lang } from './i18n'

/**
 * Dated lab log entry. Add new objects at the top; keep `date` ISO (YYYY-MM-DD).
 * `body` supports `**inline bold**` like i18n strings. Optional `bullets` = same per lang.
 */
export type LabUpdate = {
  id: string
  /** Display order uses this; newest first. */
  date: string
  title: { en: string; es: string }
  body: { en: string; es: string }
  bullets?: { en: string[]; es: string[] }
  /** Short labels, language-agnostic (e.g. stack, network) */
  tags?: string[]
}

export const LAB_UPDATES: LabUpdate[] = [
  {
    id: 'u-2026-04-20-network-wip',
    date: '2026-04-20',
    title: {
      en: 'Network edge: WIP (mock)',
      es: 'Borde de red: en curso (mock)',
    },
    body: {
      en:
        'Sketching the path from **ISP modem (bridge)** → **MikroTik hEX** → **LAN + VLANs**; Wi‑Fi still on an **Archer** until the new APs land. This entry is a **mock** to exercise the log format.',
      es:
        'Bocetando el camino **módem ISP (bridge)** → **MikroTik hEX** → **LAN + VLANs**; el Wi‑Fi sigue en un **Archer** hasta colocar los AP nuevos. Entrada **mock** para probar el formato del diario.',
    },
    bullets: {
      en: [
        'Document the real C6/AX model names when you copy-paste this.',
        'Next: VLAN list + which SSID lives where.',
      ],
      es: [
        'Anotar el modelo real C6/AX al sustituir este mock.',
        'Siguiente: listado de VLANs y en qué SSID cae cada cosa.',
      ],
    },
    tags: ['network', 'mock'],
  },
  {
    id: 'u-2026-03-28-compose-baseline',
    date: '2026-03-28',
    title: {
      en: 'Compose baseline on the NUC',
      es: 'Línea base con Compose en el NUC',
    },
    body: {
      en:
        '**Dockge** is the control plane: same flow for **deploy, logs, updates** across Pi-hole, proxy, and the rest. Still iterating on file layout, but the workflow is the anchor.',
      es:
        '**Dockge** es el plano de control: el mismo flujo de **despliegue, logs y actualizaciones** en Pi-hole, el proxy y el resto. El árbol de archivos aún se afina, pero el flujo ya es el ancla.',
    },
    bullets: {
      en: ['One repo per stack or one folder per stack: pick and stay boring.'],
      es: ['Un repo por stack o una carpeta por stack: elegir y aburrir.'],
    },
    tags: ['stack', 'dockge'],
  },
  {
    id: 'u-2026-03-02-first-boot',
    date: '2026-03-02',
    title: {
      en: 'Ubuntu 24.04 LTS: headless host up',
      es: 'Ubuntu 24.04 LTS: anfitrión headless en marcha',
    },
    body: {
      en:
        'Fresh **Ubuntu Server 24.04 LTS** on the NUC, no DE. **SSH** in, **Docker** first-class, and room on disk for a few fat images before worrying about spring cleaning.',
      es:
        '**Ubuntu Server 24.04 LTS** en el NUC, sin entorno gráfico. **SSH** para administrar, **Docker** a la orden del día, y holgura en disco para unas imágenes gordas antes de pasar a limpieza de primavera.',
    },
    tags: ['host', 'os'],
  },
]

export function updatesSorted(): LabUpdate[] {
  return [...LAB_UPDATES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export function formatUpdateDate(iso: string, lang: Lang): string {
  const d = new Date(`${iso}T12:00:00`)
  return new Intl.DateTimeFormat(lang === 'es' ? 'es' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}
