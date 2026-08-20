import type { ComponentType, SVGProps } from 'react'
import { DockerIcon, DockgeIcon, DockhandIcon, MinecraftIcon, TraefikIcon } from './icons/brands'
import { ArchiveIcon, FlagIcon, HomeIcon, LayersIcon, MapIcon, NetworkIcon, RouterIcon, TagIcon, TerminalIcon, TowerIcon } from './icons/ui'

type TagIconComponent = ComponentType<SVGProps<SVGSVGElement>>

const tagIcons: Record<string, TagIconComponent> = {
  milestone: FlagIcon,
  stack: LayersIcon,
  homelab: HomeIcon,
  roadmap: MapIcon,
  traefik: TraefikIcon,
  vlans: NetworkIcon,
  network: NetworkIcon,
  dockhand: DockhandIcon,
  dockge: DockgeIcon,
  minecraft: MinecraftIcon,
  docker: DockerIcon,
  backups: ArchiveIcon,
  mikrotik: RouterIcon,
  host: TowerIcon,
  os: TerminalIcon,
}

export function getTagIcon(tag: string): TagIconComponent {
  return tagIcons[tag] ?? TagIcon
}

// El orden de declaración de `tagIcons` dobla como ranking de prioridad: milestone
// y las etiquetas generales (stack, homelab, roadmap...) primero, tecnologías
// específicas después. Las etiquetas sin icono propio (p. ej. "cicd") van al final,
// en su orden original.
const tagPriority = Object.keys(tagIcons)

export function sortTagsByPriority(tags: string[]): string[] {
  return [...tags].sort((a, b) => {
    const ra = tagPriority.indexOf(a)
    const rb = tagPriority.indexOf(b)
    return (ra === -1 ? tagPriority.length : ra) - (rb === -1 ? tagPriority.length : rb)
  })
}
