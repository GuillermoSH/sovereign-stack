import type { SVGProps } from 'react'

/** Consistent 24x24 stroke icon set for section/nav iconography — no external library. */
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function CpuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.2" />
      <rect x="10" y="10" width="4" height="4" rx="0.6" />
      <path d="M9 3v2.4M12 3v2.4M15 3v2.4M9 18.6V21M12 18.6V21M15 18.6V21M3 9h2.4M3 12h2.4M3 15h2.4M18.6 9H21M18.6 12H21M18.6 15H21" />
    </svg>
  )
}

export function MemoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="6" width="17" height="12" rx="1.2" />
      <path d="M7 6V3.6M11 6V3.6M15 6V3.6M7 20.4V18M11 20.4V18M15 20.4V18" />
      <path d="M7.5 10h3M7.5 13h3" />
    </svg>
  )
}

export function DiskIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  )
}

export function TerminalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1.6" />
      <path d="m7 9 3 3-3 3M12.5 15h4.5" />
    </svg>
  )
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 5 6v5.4c0 4.2 2.9 7.4 7 8.6 4.1-1.2 7-4.4 7-8.6V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function ActivityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h4l2 7 4-14 2 7h6" />
    </svg>
  )
}

export function CloudOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M17.5 18H7a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.4-2.1A4.5 4.5 0 0 1 17.5 18Z" strokeDasharray="3.2 3.2" />
      <path d="M3 3l18 18" />
    </svg>
  )
}

export function RouterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="14" width="18" height="6" rx="1.2" />
      <path d="M7 14v-2a5 5 0 0 1 10 0v2" />
      <path d="M7 17h.01M11 17h.01" />
    </svg>
  )
}

export function WifiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5a12 12 0 0 1 16 0M7 13a8 8 0 0 1 10 0M10.3 16.4a3.4 3.4 0 0 1 3.4 0" />
      <path d="M12 19.5h.01" />
    </svg>
  )
}

export function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" />
    </svg>
  )
}

export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.7 4.9-4.9 1.7 1.7-4.9 4.9-1.7Z" />
    </svg>
  )
}

export function MapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  )
}

export function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.6 4.9a3.6 3.6 0 1 1 5.1 5.1L16 11.7M13 17.5l-1.6 1.6a3.6 3.6 0 1 1-5.1-5.1L8 12.3" />
    </svg>
  )
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  )
}

export function ScanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="m19 19-4.35-4.35" />
    </svg>
  )
}

export function MonitorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="12" rx="1.4" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  )
}

export function WalletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="13" rx="1.6" />
      <path d="M3 10.5h18" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
    </svg>
  )
}

export function GpuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="7" width="19" height="10" rx="1.4" />
      <circle cx="8" cy="12" r="2.2" />
      <circle cx="14.5" cy="12" r="2.2" />
      <path d="M19 7V4.5h2.5" />
    </svg>
  )
}

export function FanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="1.8" />
      <path d="M12 12c0-3.2 2-5.2 5-5.2M12 12c3.2 0 5.2 2 5.2 5M12 12c0 3.2-2 5.2-5 5.2M12 12c-3.2 0-5.2-2-5.2-5" />
    </svg>
  )
}

export function TowerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="1.4" />
      <path d="M9 6.5h.01M9 9.5h.01" />
      <circle cx="14" cy="15" r="2.3" />
    </svg>
  )
}

export function PhotoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.6" />
      <circle cx="8.3" cy="9.5" r="1.6" />
      <path d="m4 17 5-5 3.5 3.5L17 11l3.5 3.5" />
    </svg>
  )
}

export function FlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 3v18" />
      <path d="M5 4.5c2-1.4 4-1.4 6 0s4 1.4 6 0v8c-2 1.4-4 1.4-6 0s-4-1.4-6 0Z" />
    </svg>
  )
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V10" />
      <path d="M10 20.5V15h4v5.5" />
    </svg>
  )
}

export function NetworkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="4.6" r="1.8" />
      <circle cx="5" cy="19" r="1.8" />
      <circle cx="19" cy="19" r="1.8" />
      <path d="M12 6.4v4.5M12 10.9 5 17.2M12 10.9l7 6.3" />
    </svg>
  )
}

export function ArchiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9.5 6 4h12l3 5.5" />
      <rect x="3" y="9.5" width="18" height="10.5" rx="1.2" />
      <path d="M9.5 13.5h5" />
    </svg>
  )
}

export function TagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h7l9 9-7 7-9-9V4Z" />
      <path d="M8 8h.01" />
    </svg>
  )
}

export function ListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  )
}

export function GridIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </svg>
  )
}

export function CoffeeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 8h11v7.2A3.8 3.8 0 0 1 12.2 19H8.8A3.8 3.8 0 0 1 5 15.2V8Z" />
      <path d="M16 10h1.4A2.6 2.6 0 0 1 20 12.6v0A2.6 2.6 0 0 1 17.4 15H16" />
      <path d="M8 5.2c.35-.7.35-1.4 0-2.1" />
      <path d="M11 5.2c.35-.7.35-1.4 0-2.1" />
      <path d="M4 21h13" />
    </svg>
  )
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </svg>
  )
}
