export type Lang = 'en' | 'es'

export type Theme = 'light' | 'dark'

export const strings = {
  en: {
    skipLink: 'Skip to main content',
    navAria: 'Page sections',
    navOverview: 'Overview',
    navHardware: 'Hardware',
    navStack: 'Stack',
    navNetwork: 'Network',
    navOps: 'Operations',
    navStory: 'Story',
    langGroup: 'Language',
    langSwitchToEn: 'Switch interface to English',
    langSwitchToEs: 'Switch interface to Spanish',
    themeLight: 'Switch to light theme',
    themeDark: 'Switch to dark theme',
    eyebrow: 'Self-hosted homelab · NUC11',
    heroTitleSuffix: ' · Ubuntu · Compose',
    lede:
      'This page is a snapshot of my home lab—a place to run my own stack, keep DNS and filtering on the LAN, and watch when something misbehaves. Everything lives in containers behind a reverse proxy, deployed from one compose workflow; from outside I connect over Tailscale instead of punching holes in the firewall.',
    highlightsLabel: 'Highlights',
    statDocker: 'Dockge',
    statDockerSub: 'Compose control',
    statDns: 'Pi-hole',
    statDnsSub: 'Whole-house DNS',
    statEdge: 'Tailscale',
    statEdgeSub: 'Remote, no public ports',
    hwTitle: 'Hardware',
    hwBody:
      'Intel NUC11ATKC4: **N5105**, **16 GB** RAM, **500 GB** NVMe. Enough headroom for this stack without pretending to be a datacenter.',
    baseOsTitle: 'Base system',
    baseOsBody:
      '**Ubuntu Server 24.04 LTS**, headless. Workloads are Docker Compose stacks managed from Dockge.',
    stackTitle: "What's running",
    stackIntro:
      'All of these are Compose stacks in Dockge — same workflow for deploys, logs, and updates.',
    networkSectionTitle: 'Access & network',
    networkSectionIntro: 'How I connect, and where the LAN is heading.',
    networkAccessTitle: 'Remote access & proxy',
    networkAccessBody:
      'Tailscale is how I reach the NUC from outside; I do not rely on opening admin ports on the public firewall. At home, Nginx Proxy Manager terminates TLS and routes to services behind your domain.',
    networkEvolutionTitle: 'Network evolution',
    networkEvolutionBody:
      'In progress: ISP modem in **bridge mode**, traffic through a **MikroTik hEX** with **VLANs** to separate environments, plus **two TP-Link Archer AX58** access points so Wi‑Fi and policy are not tied to the ISP router.',
    opsSectionTitle: 'Operations & security',
    opsMonitoringTitle: 'Monitoring',
    opsMonitoringBody:
      '**Uptime Kuma** and **Beszel** cover availability and host metrics. That is the ops picture today.',
    opsBackupsTitle: 'Backups',
    opsBackupsBody:
      'No formal backup system yet — honest gap while monitoring is in place. Next priority once the stack settles.',
    opsSecurityTitle: 'Security',
    opsSecurityBody:
      '**SSH** is the main surface for now; planning to move it off port **22**, add **fail2ban**, and tighten authentication and host hardening.',
    storySectionTitle: 'Why & what’s next',
    storyWhyTitle: 'Why this lab',
    storyWhyBody:
      'I have always felt at home with hardware and the sysadmin side of things — self-taught, learning as I go. The first serious workload was hosting the **API and database** for my DAM capstone project, **Gastromind**.',
    roadmapTitle: 'Roadmap',
    roadmapBody:
      'Eyeing **Dell** gear to run **k3s** or **Kubernetes** and learn orchestration for real. Finishing the network with the new APs and a cleaner edge between home and ISP.',
    closingHidden: 'Closing',
    closing:
      'Homelab snapshot: infra I run, how I reach it, and what I am learning — not a tutorial, just where things stand.',
    footer: '© 2026 GuillermoSH · Built with React, Tailwind and coffee.',
    nucAlt: 'Intel NUC 11 Pro mini PC, compact square chassis',
  },
  es: {
    skipLink: 'Saltar al contenido principal',
    navAria: 'Navegación principal',
    navOverview: 'Vista general',
    navHardware: 'Hardware',
    navStack: 'Stack',
    navNetwork: 'Red',
    navOps: 'Operación',
    navStory: 'Historia',
    langGroup: 'Idioma',
    langSwitchToEn: 'Cambiar interfaz a inglés',
    langSwitchToEs: 'Cambiar interfaz a español',
    themeLight: 'Activar tema claro',
    themeDark: 'Activar tema oscuro',
    eyebrow: 'Homelab propio · NUC11',
    heroTitleSuffix: ' · Ubuntu · Compose',
    lede:
      'Esta página resume un laboratorio en casa: un sitio donde monto mi propio stack, llevo el DNS y el filtrado en la LAN y me entero cuando algo se tuerce. Todo va en contenedores detrás de un proxy inverso, desplegado desde un mismo flujo de Compose; desde fuera entro por Tailscale, sin exponer servicios al internet público.',
    highlightsLabel: 'Resumen',
    statDocker: 'Dockge',
    statDockerSub: 'Compose central',
    statDns: 'Pi-hole',
    statDnsSub: 'DNS en toda la casa',
    statEdge: 'Tailscale',
    statEdgeSub: 'Remoto, sin puertos públicos',
    hwTitle: 'Hardware',
    hwBody:
      'Intel NUC11ATKC4: **N5105**, **16 GB** de RAM y **500 GB** NVMe. Cabe este stack sin pretender ser un CPD.',
    baseOsTitle: 'Sistema base',
    baseOsBody:
      '**Ubuntu Server 24.04 LTS**, sin interfaz gráfica. Las cargas van en stacks de Docker Compose gestionados desde Dockge.',
    stackTitle: 'Servicios en marcha',
    stackIntro:
      'Todo esto va como stacks de Compose en Dockge: mismo flujo para desplegar, ver logs y actualizar.',
    networkSectionTitle: 'Acceso y red',
    networkSectionIntro: 'Cómo me conecto y hacia dónde va la LAN.',
    networkAccessTitle: 'Acceso remoto y proxy',
    networkAccessBody:
      'Tailscale es cómo llego al NUC desde fuera; no abro puertos de administración en el cortafuegos público. En casa, Nginx Proxy Manager termina TLS y enruta hacia los servicios detrás de tu dominio.',
    networkEvolutionTitle: 'Evolución de la red',
    networkEvolutionBody:
      'En curso: modem del ISP en **modo bridge**, tráfico por un **MikroTik hEX** con **VLANs** para separar entornos, y **dos TP-Link Archer AX58** para que el Wi‑Fi y las políticas no dependan del router del operador.',
    opsSectionTitle: 'Operación y seguridad',
    opsMonitoringTitle: 'Monitorización',
    opsMonitoringBody:
      '**Uptime Kuma** y **Beszel** cubren disponibilidad y métricas del host. Hoy la operación es eso.',
    opsBackupsTitle: 'Copias de seguridad',
    opsBackupsBody:
      'Aún no hay un sistema de copias formal: laguna consciente mientras el monitoreo está montado. Siguiente prioridad cuando el stack estabilice.',
    opsSecurityTitle: 'Seguridad',
    opsSecurityBody:
      '**SSH** es la superficie principal por ahora; en el plan: mover el servicio fuera del puerto **22**, añadir **fail2ban** y reforzar autenticación y endurecimiento del sistema.',
    storySectionTitle: 'Por qué y qué sigue',
    storyWhyTitle: 'Por qué existe este laboratorio',
    storyWhyBody:
      'Siempre me ha gustado el hardware y el mundo del administrador de sistemas; aprendo por mi cuenta. El primer uso serio fue alojar la **API y la base de datos** del proyecto final DAM **Gastromind**.',
    roadmapTitle: 'Próximos pasos',
    roadmapBody:
      'Barajando equipos **Dell** para montar **k3s** o **Kubernetes** y aprender orquestación en serio. Cerrar la red con los nuevos APs y un borde más claro entre casa e ISP.',
    closingHidden: 'Cierre',
    closing:
      'Instantánea del homelab: qué ejecuto, cómo entro y qué estoy aprendiendo — no es un manual, solo el estado actual.',
    footer: '© 2026 GuillermoSH · Hecho con React, Tailwind y cafe.',
    nucAlt: 'Mini PC Intel NUC 11 Pro, caja compacta',
  },
} as const

/** Inline `**bold**` segments → fragments for <strong> */
export function parseRich(raw: string): Array<string | { bold: string }> {
  const parts: Array<string | { bold: string }> = []
  const re = /\*\*([^*]+)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) parts.push(raw.slice(last, m.index))
    parts.push({ bold: m[1] })
    last = m.index + m[0].length
  }
  if (last < raw.length) parts.push(raw.slice(last))
  return parts
}
