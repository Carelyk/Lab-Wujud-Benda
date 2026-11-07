import type { ReactNode } from 'react'

interface Props {
  size?: number
  className?: string
}

function Svg({ size = 24, className, children }: Props & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  )
}

export const IconPanas = (p: Props) => (
  <Svg {...p}>
    <path d="M12 3c3.2 4 5.2 5.9 5.2 9.2a5.2 5.2 0 0 1-10.4 0c0-1.9.8-3.2 1.9-4.5C10 6.4 12 5.4 12 3z" />
    <path d="M12 20.2a2.5 2.5 0 0 0 2.5-2.5c0-1.6-1.4-2.4-2.5-4.7-1.1 2.3-2.5 3.1-2.5 4.7a2.5 2.5 0 0 0 2.5 2.5z" />
  </Svg>
)

export const IconDingin = (p: Props) => (
  <Svg {...p}>
    <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2 3.8 16.8" />
    <path d="M12 6.4 9.7 4.1M12 6.4l2.3-2.3M12 17.6l-2.3 2.3M12 17.6l2.3 2.3" />
  </Svg>
)

export const IconFlask = (p: Props) => (
  <Svg {...p}>
    <path d="M9.5 3h5M10.5 3v5.2L5.9 17.1A3 3 0 0 0 8.6 21h6.8a3 3 0 0 0 2.7-3.9L13.5 8.2V3" />
    <path d="M7.6 14.4h8.8" />
  </Svg>
)

export const IconBasket = (p: Props) => (
  <Svg {...p}>
    <path d="M3.4 9h17.2l-1.7 9a2.4 2.4 0 0 1-2.4 1.9H7.5a2.4 2.4 0 0 1-2.4-1.9z" />
    <path d="M8.2 9V7.4a3.8 3.8 0 0 1 7.6 0V9" />
    <path d="M9.6 12.6v3.6M14.4 12.6v3.6" />
  </Svg>
)

export const IconStar = (p: Props) => (
  <Svg {...p}>
    <path d="M12 3.4l2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.9-5.3 2.9 1-6L3.3 9.8l6-.9z" />
  </Svg>
)

export const IconCloud = (p: Props) => (
  <Svg {...p}>
    <path d="M7 18.5h9.6a3.6 3.6 0 0 0 .4-7.2 5.6 5.6 0 0 0-10.7-1.4A3.9 3.9 0 0 0 7 18.5z" />
  </Svg>
)

export const IconTetes = (p: Props) => (
  <Svg {...p}>
    <path d="M12 2.8s6.1 6.6 6.1 10.4a6.1 6.1 0 0 1-12.2 0C5.9 9.4 12 2.8 12 2.8z" />
  </Svg>
)

export const IconEs = (p: Props) => (
  <Svg {...p}>
    <path d="M12 2.8 20 7v10l-8 4.2L4 17V7z" />
    <path d="M4 7l8 4 8-4M12 11v10" />
  </Svg>
)

export const IconAir = (p: Props) => (
  <Svg {...p}>
    <path d="M12 2.8s6.1 6.6 6.1 10.4a6.1 6.1 0 0 1-12.2 0C5.9 9.4 12 2.8 12 2.8z" />
    <path d="M9.4 13.6a2.6 2.6 0 0 0 2.6 2.6" />
  </Svg>
)

export const IconLilin = (p: Props) => (
  <Svg {...p}>
    <path d="M9 21h6M10 21V10.5h4V21" />
    <path d="M12 10.5V8.6" />
    <path d="M12 8.6c1.2-1 .5-2.5-.2-3.4-.8 1-1.6 2.3-.4 3.3" />
  </Svg>
)

export const IconCokelat = (p: Props) => (
  <Svg {...p}>
    <rect x="5" y="4.5" width="14" height="15" rx="2.4" />
    <path d="M5 9.5h14M5 14.5h14M12 4.5v15" />
  </Svg>
)

export const IconMenguap = (p: Props) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
  </Svg>
)

export const IconSuaraNyala = (p: Props) => (
  <Svg {...p}>
    <path d="M4 9.6h3.2L12 6.2v11.6L7.2 14.4H4z" />
    <path d="M15.2 9.4a3.7 3.7 0 0 1 0 5.2M17.8 6.9a7.2 7.2 0 0 1 0 10.2" />
  </Svg>
)

export const IconSuaraMati = (p: Props) => (
  <Svg {...p}>
    <path d="M4 9.6h3.2L12 6.2v11.6L7.2 14.4H4z" />
    <path d="M15.6 9.4l5 5.2M20.6 9.4l-5 5.2" />
  </Svg>
)

export const IconCentang = (p: Props) => (
  <Svg {...p}>
    <path d="M4.5 12.6l5 5 10-11.2" />
  </Svg>
)

export const IconSilang = (p: Props) => (
  <Svg {...p}>
    <path d="M6.2 6.2l11.6 11.6M17.8 6.2 6.2 17.8" />
  </Svg>
)

export const IconKembali = (p: Props) => (
  <Svg {...p}>
    <path d="M19.5 12H4.5" />
    <path d="M10.6 5.6 4.2 12l6.4 6.4" />
  </Svg>
)

export const IconBuku = (p: Props) => (
  <Svg {...p}>
    <path d="M4.2 6.2A2.2 2.2 0 0 1 6.4 4h13.4v16H6.4a2.2 2.2 0 0 1-2.2-2.2z" />
    <path d="M8.4 4v16" />
    <path d="M11.8 8.6h4.4M11.8 12.6h4.4" />
  </Svg>
)

export const IconGembok = (p: Props) => (
  <Svg {...p}>
    <rect x="4.4" y="10.6" width="15.2" height="9.8" rx="2.6" />
    <path d="M8 10.6V7.9a4 4 0 0 1 8 0v2.7" />
  </Svg>
)

export const IconUlang = (p: Props) => (
  <Svg {...p}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20 3.8v5.4h-5.4" />
  </Svg>
)

export const IconZoom = (p: Props) => (
  <Svg {...p}>
    <circle cx="10.8" cy="10.8" r="6.4" />
    <path d="M15.6 15.6 21 21M8.4 10.8h4.8M10.8 8.4v4.8" />
  </Svg>
)

export const IconLencana = (p: Props) => (
  <Svg {...p}>
    <circle cx="12" cy="9.2" r="5.4" />
    <path d="M8.4 13.6 6.2 21l5.8-3.1L17.8 21l-2.2-7.4" />
    <path d="M12 6.6l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3z" />
  </Svg>
)

export const IconSiklus = (p: Props) => (
  <Svg {...p}>
    <path d="M19.4 8.6A8 8 0 0 0 5.2 7.4M4.6 15.4a8 8 0 0 0 14.2 1.2" />
    <path d="M19.6 4.2v4.6h-4.6M4.4 19.8v-4.6h4.6" />
    <path d="M12 10.2s2.6 2.8 2.6 4.4a2.6 2.6 0 0 1-5.2 0c0-1.6 2.6-4.4 2.6-4.4z" />
  </Svg>
)

export const IconMata = (p: Props) => (
  <Svg {...p}>
    <path d="M2.6 12S6 6.2 12 6.2 21.4 12 21.4 12 18 17.8 12 17.8 2.6 12 2.6 12z" />
    <circle cx="12" cy="12" r="3.2" />
  </Svg>
)
