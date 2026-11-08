import type { Wujud } from '../../../types'
import s from './art.module.css'

interface Props {
  wujud: Wujud
  uap: number
  suhu?: number
}

export function CandleArt({ wujud, suhu }: Props) {
  const cair = wujud === 'cair'
  const t = suhu ?? 28
  const leleh = cair ? Math.max(0, Math.min(1, (t - 55) / 45)) : 0
  const tinggiBadan = 96 - leleh * 78
  const atasBadan = 180 - tinggiBadan
  const ujungSumbu = atasBadan - 14
  const faktorApi = 0.86 + leleh * 0.46

  return (
    <svg viewBox="0 0 240 220" className={s.svg} aria-hidden="true">
      <ellipse cx="120" cy="190" rx="80" ry="12" fill="#DCE9F2" />

      {/* The pool grows only after the body starts shrinking. */}
      <g className={s.layer} opacity={leleh}>
        <ellipse cx="120" cy="183" rx="62" ry="14" fill="#FFE7B8" stroke="#E7C98A" strokeWidth="3.5" />
        <ellipse cx="104" cy="181" rx="14" ry="4" fill="#FFF6DE" />
      </g>

      <rect
        x="98"
        y={atasBadan}
        width="44"
        height={tinggiBadan}
        rx="9"
        fill="#FFF3DC"
        stroke="#E7C98A"
        strokeWidth="4.5"
      />
      <rect x="106" y={atasBadan + 10} width="10" height={Math.max(20, tinggiBadan - 28)} rx="5" fill="#FFFDF6" opacity="0.9" />
      <path d={`M98 ${atasBadan + 18}c-5 4-5 12 0 16`} stroke="#F3DBA8" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path
        data-testid="candle-wick"
        d={`M120 ${atasBadan}V${ujungSumbu}`}
        stroke="#6B5340"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {leleh > 0.24 ? (
        <path className={s.drip} d={`M142 ${atasBadan + 8}c0 0 5 6 5 9a5 5 0 0 1-10 0c0-3 5-9 5-9Z`} fill="#FFE7B8" />
      ) : null}

      {/* The flame base is always translated to the current wick endpoint. */}
      {(
        <g transform={`translate(120 ${ujungSumbu}) scale(${faktorApi}) translate(0 -12)`}>
          <g className={s.api} data-testid="candle-flame">
          {/* outer orange glow */}
          <path
            d="M0 -18 C12 -6 14 6 0 12 C-14 6 -12 -6 0 -18 Z"
            fill="#FFA726"
            stroke="#FB8C00"
            strokeWidth="2"
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
        </g>
      )}
    </svg>
  )
}
