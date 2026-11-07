interface Props {
  size?: number
  className?: string
}

// IconBenda (es, air, lilin, kapur-barus, cokelat, panci-air)
export const IconEs = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="6" y="6" width="20" height="20" rx="4" fill="#E0F2FE" stroke="#2D3142" strokeWidth="2.5" />
    <path d="M10 10L14 14" stroke="#2D3142" strokeWidth="2" strokeLinecap="round" />
    <circle cx="22" cy="10" r="1.5" fill="#2D3142" />
  </svg>
)

export const IconAir = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M16 4C16 4 8 15 8 20C8 24.4183 11.5817 28 16 28C20.4183 28 24 24.4183 24 20C24 15 16 4 16 4Z" fill="#38BDF8" stroke="#2D3142" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
)

export const IconLilin = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M16 4C16 4 13 9 13 12H19C19 9 16 4 16 4Z" fill="#FBBF24" stroke="#2D3142" strokeWidth="2" />
    <rect x="11" y="12" width="10" height="16" rx="2" fill="#F43F5E" stroke="#2D3142" strokeWidth="2.5" />
    <line x1="16" y1="8" x2="16" y2="12" stroke="#2D3142" strokeWidth="2" />
  </svg>
)

export const IconKapurBarus = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="10" fill="#F1F5F9" stroke="#2D3142" strokeWidth="2.5" />
    <circle cx="13" cy="13" r="2" fill="#CBD5E1" />
  </svg>
)

export const IconCokelat = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="5" y="7" width="22" height="18" rx="3" fill="#854D0E" stroke="#2D3142" strokeWidth="2.5" />
    <line x1="5" y1="16" x2="27" y2="16" stroke="#2D3142" strokeWidth="2" />
    <line x1="16" y1="7" x2="16" y2="25" stroke="#2D3142" strokeWidth="2" />
  </svg>
)

export const IconPanci = ({ size = 24, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M6 12H26L24 24H8L6 12Z" fill="#94A3B8" stroke="#2D3142" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M4 12H28" stroke="#2D3142" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 6H20" stroke="#2D3142" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

// IconProses (membeku, mencair, menguap, mendidih, mengembun, menyublim, mengkristal)
export const IconMembeku = ({ size = 20, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 2V22M2 12H22M5 5L19 19M5 19L19 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

export const IconMencair = ({ size = 20, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 3C12 3 6 10 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 10 12 3 12 3Z" fill="currentColor" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const IconMenguap = ({ size = 20, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M6 16C6 14 8 13 10 14C12 15 14 13 14 11C14 9 12 8 10 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M10 20C10 18 12 17 14 18C16 19 18 17 18 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

export const IconMendidih = ({ size = 20, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="8" cy="8" r="2" fill="currentColor" />
    <circle cx="16" cy="12" r="3" fill="currentColor" />
    <path d="M4 18H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

export const IconMengembun = ({ size = 20, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M8 8H16V16H8V8Z" fill="currentColor" rx="2" />
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
)

export const IconMenyublim = ({ size = 20, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 4L19 12H13V20H11V12H5L12 4Z" fill="currentColor" />
  </svg>
)

export const IconMengkristal = ({ size = 20, className }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <polygon points="12,2 15,10 22,12 15,14 12,22 9,14 2,12 9,10" fill="currentColor" />
  </svg>
)

// Helper renderer
export const renderIconBenda = (bendaId: string, size = 24, className?: string) => {
  switch (bendaId) {
    case 'es': return <IconEs size={size} className={className} />
    case 'air': return <IconAir size={size} className={className} />
    case 'lilin': return <IconLilin size={size} className={className} />
    case 'kapur-barus': return <IconKapurBarus size={size} className={className} />
    case 'cokelat': return <IconCokelat size={size} className={className} />
    case 'panci': return <IconPanci size={size} className={className} />
    default: return <IconAir size={size} className={className} />
  }
}

export const renderIconProses = (proses: string, size = 18, className?: string) => {
  switch (proses) {
    case 'membeku': return <IconMembeku size={size} className={className} />
    case 'mencair': return <IconMencair size={size} className={className} />
    case 'menguap': return <IconMenguap size={size} className={className} />
    case 'mendidih': return <IconMendidih size={size} className={className} />
    case 'mengembun': return <IconMengembun size={size} className={className} />
    case 'menyublim': return <IconMenyublim size={size} className={className} />
    case 'mengkristal': return <IconMengkristal size={size} className={className} />
    default: return <IconMencair size={size} className={className} />
  }
}
