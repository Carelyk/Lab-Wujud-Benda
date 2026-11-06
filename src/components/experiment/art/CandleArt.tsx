import type { Wujud } from '../../../types'
import s from './art.module.css'

interface Props {
  wujud: Wujud
  uap: number
  suhu?: number
}

export function CandleArt({ wujud, suhu }: Props) {
  const cair = wujud !== 'padat'
  // Flame shows once the candle starts melting (55 °C), and grows with heat.
  const panas = cair
  const t = suhu ?? 28
  const faktor = Math.max(0.7, Math.min(1.7, 0.7 + ((t - 55) / 45) * 1.0))

  return (
    <svg viewBox="0 0 240 220" className={s.svg} aria-hidden="true">
      <ellipse cx="120" cy="190" rx="80" ry="12" fill="#DCE9F2" />

      {/* wax pool */}
      <g className={`${s.layer} ${cair ? s.tampil : s.sembunyi}`}>
        <ellipse cx="120" cy="183" rx="62" ry="14" fill="#FFE7B8" stroke="#E7C98A" strokeWidth="3.5" />
        <ellipse cx="104" cy="181" rx="14" ry="4" fill="#FFF6DE" />
      </g>

      {/* still solid candle */}
      <g className={`${s.layer} ${cair ? s.sembunyi : s.tampil}`}>
        <rect x="98" y="86" width="44" height="94" rx="9" fill="#FFF3DC" stroke="#E7C98A" strokeWidth="4.5" />
        <rect x="106" y="96" width="10" height="66" rx="5" fill="#FFFDF6" opacity="0.9" />
        <path d="M120 86V72" stroke="#6B5340" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M98 104c-5 4-5 12 0 16" stroke="#F3DBA8" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>

      {/* melted candle: short body, wick tilted */}
      <g className={`${s.layer} ${cair ? s.tampil : s.sembunyi}`}>
        <rect x="102" y="146" width="36" height="34" rx="8" fill="#FFF3DC" stroke="#E7C98A" strokeWidth="4.5" />
        <path d="M120 146v-11" stroke="#6B5340" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M120 135l7-6" stroke="#6B5340" strokeWidth="3.5" strokeLinecap="round" />
        <path className={s.drip} d="M138 152c0 0 5 6 5 9a5 5 0 0 1-10 0c0-3 5-9 5-9Z" fill="#FFE7B8" />
      </g>

      {/* Cute flame (appears when heated / melted) */}
      {panas && (
        <g transform={`translate(127, 128) scale(${faktor})`} data-testid="candle-flame">
          {/* outer orange glow */}
          <path
            d="M0 -18 C12 -6 14 6 0 12 C-14 6 -12 -6 0 -18 Z"
            fill="#FFA726"
            stroke="#FB8C00"
            strokeWidth="2"
            className={s.api}
          />
          {/* inner yellow core */}
          <path
            d="M0 -10 C6 -3 7 3 0 7 C-7 3 -6 -3 0 -10 Z"
            fill="#FFEE58"
          />
          {/* pink cheeks */}
          <circle cx="-5" cy="1" r="1.6" fill="#FF8A80" opacity="0.8" />
          <circle cx="5" cy="1" r="1.6" fill="#FF8A80" opacity="0.8" />
          {/* eyes */}
          <circle cx="-3" cy="-2" r="1.2" fill="#3E2723" />
          <circle cx="3" cy="-2" r="1.2" fill="#3E2723" />
          {/* smile */}
          <path d="M-1.5 2 Q0 4 1.5 2" stroke="#3E2723" strokeWidth="1" strokeLinecap="round" fill="none" />
        </g>
      )}
    </svg>
  )
}
