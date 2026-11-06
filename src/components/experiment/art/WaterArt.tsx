import type { Wujud } from '../../../types'
import s from './art.module.css'

interface Props {
  wujud: Wujud
  uap: number
}

export function WaterArt({ wujud, uap }: Props) {
  const kekuatanUap = wujud === 'gas' ? 1 : wujud === 'cair' ? uap : 0.1

  return (
    <svg viewBox="0 0 240 220" className={s.svg} aria-hidden="true">
      <defs>
        <clipPath id="gelasDalam">
          <path d="M76 66h88l-8 112a10 10 0 0 1-10 9H94a10 10 0 0 1-10-9Z" />
        </clipPath>
        <linearGradient id="airBiru" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7CC9FF" />
          <stop offset="1" stopColor="#2F9BFF" />
        </linearGradient>
      </defs>

      {/* steam above the glass */}
      <g className={s.steam} style={{ opacity: kekuatanUap }}>
        <path
          className={s.wisp}
          d="M100 56c-9-12 6-17 0-28"
          stroke="#BFE6FA"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className={s.wisp}
          d="M120 48c-10-14 7-20 0-32"
          stroke="#CFEEFB"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className={s.wisp}
          d="M140 56c-9-12 6-17 0-28"
          stroke="#BFE6FA"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* glass body */}
      <path
        d="M76 66h88l-8 112a10 10 0 0 1-10 9H94a10 10 0 0 1-10-9Z"
        fill="#F4FBFF"
        fillOpacity="0.7"
        stroke="#B9D6E9"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      <g clipPath="url(#gelasDalam)">
        {/* liquid water */}
        <g className={`${s.layer} ${wujud === 'gas' ? s.sembunyi : s.tampil}`}>
          <path
            d="M70 112c10 6 20-6 30 0s20 6 30 0 20-6 30 0 20 6 30 0v80H70Z"
            fill="url(#airBiru)"
            opacity="0.72"
          />
        </g>
        <g className={`${s.layer} ${wujud === 'padat' ? s.tampil : s.sembunyi}`}>
          <rect x="78" y="108" width="84" height="78" fill="#CBECFD" opacity="0.9" />
          <path d="M92 120l16 14-12 10 18 16" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9" />
          <circle cx="140" cy="132" r="3" fill="#FFFFFF" opacity="0.8" />
          <circle cx="112" cy="160" r="2.4" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* boiling bubbles */}
        {wujud === 'gas' ? (
          <g fill="#BFE6FA" opacity="0.9">
            <circle className={s.bubble} cx="98" cy="172" r="5" />
            <circle className={s.bubble} cx="120" cy="176" r="7" />
            <circle className={s.bubble} cx="142" cy="170" r="4.5" />
            <circle className={s.bubble} cx="110" cy="166" r="3.5" />
          </g>
        ) : null}
      </g>

      {/* glass rim and shine */}
      <ellipse cx="120" cy="66" rx="44" ry="7" fill="#EAF6FF" stroke="#B9D6E9" strokeWidth="4" />
      <path d="M88 82c0 28-3 56-4 84" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
    </svg>
  )
}
