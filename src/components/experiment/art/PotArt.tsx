import type { Wujud } from '../../../types'
import s from './art.module.css'

interface Props {
  wujud: Wujud
  uap: number
}

export function PotArt({ wujud, uap }: Props) {
  const kekuatanUap = wujud === 'gas' ? 1 : wujud === 'cair' ? uap : 0.08

  return (
    <svg viewBox="0 0 240 220" className={s.svg} aria-hidden="true">
      <defs>
        <clipPath id="panciDalam">
          <rect x="62" y="116" width="116" height="56" rx="14" />
        </clipPath>
      </defs>

      {/* steam from the pot */}
      <g className={s.steam} style={{ opacity: kekuatanUap }}>
        <path
          className={s.wisp}
          d="M96 96c-9-12 6-17 0-28"
          stroke="#BFE6FA"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className={s.wisp}
          d="M120 88c-10-14 7-20 0-32"
          stroke="#CFEEFB"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className={s.wisp}
          d="M144 96c-9-12 6-17 0-28"
          stroke="#BFE6FA"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* pot body */}
      <path
        d="M56 122h128v26a22 22 0 0 1-22 22H78a22 22 0 0 1-22-22Z"
        fill="#D7E4EE"
        stroke="#93AFC4"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      <g clipPath="url(#panciDalam)">
        {/* liquid water */}
        <g className={`${s.layer} ${wujud === 'gas' ? s.sembunyi : s.tampil}`}>
          <path d="M60 134c10 6 20-6 30 0s20 6 30 0 20-6 30 0 20 6 30 0v60H60Z" fill="#7CC9FF" opacity="0.85" />
        </g>

        {/* frozen water */}
        <g className={`${s.layer} ${wujud === 'padat' ? s.tampil : s.sembunyi}`}>
          <rect x="62" y="128" width="116" height="46" fill="#CBECFD" opacity="0.95" />
          <path d="M86 138l18 12-14 10" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9" />
          <path d="M140 134l-12 14 16 10" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9" />
        </g>

        {wujud === 'gas' ? (
          <g fill="#DFF4FF" opacity="0.95">
            <circle className={s.bubble} cx="88" cy="162" r="5" />
            <circle className={s.bubble} cx="112" cy="166" r="7" />
            <circle className={s.bubble} cx="140" cy="160" r="5.5" />
            <circle className={s.bubble} cx="160" cy="164" r="4" />
          </g>
        ) : null}
      </g>

      {/* rim and handles on top of the pot so the water looks inside */}
      <rect x="48" y="108" width="144" height="18" rx="9" fill="#E4EEF6" stroke="#93AFC4" strokeWidth="4.5" />
      <path d="M48 117H34a8 8 0 0 1 0-16" stroke="#93AFC4" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M192 117h14a8 8 0 0 0 0-16" stroke="#93AFC4" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M70 134c0 10 0 18 2 26" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}
