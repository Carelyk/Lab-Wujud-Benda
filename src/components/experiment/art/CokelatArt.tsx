import type { Wujud } from '../../../types'
import s from './art.module.css'

interface Props {
  wujud: Wujud
  uap: number
}

export function CokelatArt({ wujud }: Props) {
  const cair = wujud !== 'padat'

  return (
    <svg viewBox="0 0 240 220" className={s.svg} aria-hidden="true">
      <ellipse cx="120" cy="190" rx="80" ry="12" fill="#DCE9F2" />

      {/* solid bar */}
      <g className={`${s.layer} ${cair ? s.sembunyi : s.tampil}`}>
        <rect x="88" y="118" width="64" height="46" rx="8" fill="#7B3F00" stroke="#5A2E00" strokeWidth="4" />
        <path d="M88 132h64M88 146h64M104 118v46M120 118v46M136 118v46" stroke="#5A2E00" strokeWidth="2" />
      </g>

      {/* melted puddle */}
      <g className={`${s.layer} ${cair ? s.tampil : s.sembunyi}`}>
        <ellipse cx="120" cy="178" rx="58" ry="16" fill="#7B3F00" stroke="#5A2E00" strokeWidth="3.5" />
        <ellipse cx="102" cy="176" rx="16" ry="5" fill="#A0522D" opacity="0.7" />
        <path className={s.drip} d="M140 164c0 0 5 8 5 11a5 5 0 0 1-10 0c0-3 5-11 5-11Z" fill="#7B3F00" />
      </g>
    </svg>
  )
}