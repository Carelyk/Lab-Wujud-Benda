import type { Wujud } from '../../../types'
import s from './art.module.css'

interface Props {
  wujud: Wujud
  uap: number
}

export function IceArt({ wujud, uap }: Props) {
  const kekuatanUap = wujud === 'gas' ? 1 : wujud === 'cair' ? uap : 0.14

  return (
    <svg viewBox="0 0 240 220" className={s.svg} aria-hidden="true">
      <defs>
        <linearGradient id="esMuka" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4FCFF" />
          <stop offset="1" stopColor="#CBECFD" />
        </linearGradient>
      </defs>

      {/* puddle: appears once the ice melts */}
      <g className={`${s.layer} ${wujud === 'padat' ? s.sembunyi : s.tampil}`}>
        <ellipse cx="120" cy="186" rx="84" ry="15" fill="#BFE6FA" />
        <ellipse cx="120" cy="184" rx="58" ry="9" fill="#DCF3FE" />
        <ellipse cx="95" cy="182" rx="13" ry="4" fill="#FFFFFF" opacity="0.85" />

        {wujud === 'cair' ? (
          <>
            <path className={s.drip} d="M72 150c0 0 5 6 5 9a5 5 0 0 1-10 0c0-3 5-9 5-9Z" fill="#8FD3F2" />
            <path className={s.drip} d="M168 142c0 0 4 5 4 8a4 4 0 0 1-8 0c0-3 4-8 4-8Z" fill="#8FD3F2" />
          </>
        ) : null}

        {wujud === 'gas' ? (
          <g fill="#8FD3F2" opacity="0.85">
            <circle className={s.bubble} cx="92" cy="176" r="5" />
            <circle className={s.bubble} cx="122" cy="178" r="6.5" />
            <circle className={s.bubble} cx="150" cy="175" r="4.5" />
          </g>
        ) : null}
      </g>

      {/* steam */}
      <g className={s.steam} style={{ opacity: kekuatanUap }}>
        <path
          className={s.wisp}
          d="M90 148c-11-13 7-19 0-33"
          stroke="#BFE6FA"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className={s.wisp}
          d="M120 140c-12-15 8-22 0-38"
          stroke="#CFEEFB"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className={s.wisp}
          d="M150 148c-11-13 7-19 0-33"
          stroke="#BFE6FA"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* solid cube */}
      <g className={`${s.layer} ${wujud === 'padat' ? s.tampil : s.sembunyi}`}>
        <ellipse cx="120" cy="186" rx="46" ry="9" fill="#BFE6FA" opacity="0.55" />
        <path
          d="M78 108 120 88l42 20v50l-42 22-42-22Z"
          fill="url(#esMuka)"
          stroke="#8FD3F2"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <path d="M78 108l42 20 42-20" stroke="#8FD3F2" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <path d="M120 128v52" stroke="#8FD3F2" strokeWidth="4" fill="none" />
        <ellipse
          cx="103"
          cy="112"
          rx="9"
          ry="4"
          fill="#FFFFFF"
          opacity="0.95"
          transform="rotate(-30 103 112)"
        />
        <circle cx="102" cy="152" r="2.6" fill="#FFFFFF" opacity="0.9" />
        <circle cx="138" cy="140" r="2" fill="#FFFFFF" opacity="0.9" />
        <circle cx="132" cy="168" r="2.4" fill="#FFFFFF" opacity="0.85" />
      </g>
    </svg>
  )
}
