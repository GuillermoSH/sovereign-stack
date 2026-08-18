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
