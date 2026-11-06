import type { Wujud } from '../../../types'
import s from './art.module.css'

interface Props {
  wujud: Wujud
  uap: number
}

export function CamphorArt({ wujud, uap }: Props) {
  const habis = wujud === 'gas'

  return (
    <svg viewBox="0 0 240 220" className={s.svg} aria-hidden="true">
      <ellipse cx="120" cy="190" rx="80" ry="12" fill="#DCE9F2" />

      {/* Camphor solid block */}
      {!habis && (
        <g className={s.layer}>
          <rect x="92" y="126" width="56" height="56" rx="12" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="4.5" />
          <rect x="102" y="136" width="36" height="36" rx="8" fill="#E2E8F0" />
        </g>
      )}

      {/* Gas wave lines rising when heating / subliming */}
      {uap > 0 && (
        <g className={s.layer} opacity={Math.min(1, uap / 50)}>
          <path d="M110 110 Q120 90 110 70 T120 30" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M130 120 Q140 100 130 80 T135 40" stroke="#38BDF8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}
