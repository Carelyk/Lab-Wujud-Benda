import type { Wujud } from '../../../types'
import s from './art.module.css'

interface Props {
  wujud: Wujud
  uap: number
}

export function ChocolateArt({ wujud }: Props) {
  const cair = wujud !== 'padat'

  return (
    <svg viewBox="0 0 240 220" className={s.svg} aria-hidden="true">
      <ellipse cx="120" cy="190" rx="76" ry="12" fill="#DCE9F2" />

      {/* melted chocolate */}
      <g className={`${s.layer} ${cair ? s.tampil : s.sembunyi}`}>
        <ellipse cx="120" cy="182" rx="58" ry="15" fill="#6F4225" stroke="#59331B" strokeWidth="3" />
        <ellipse cx="104" cy="179" rx="13" ry="4" fill="#8B5A3C" opacity="0.9" />
        <path className={s.drip} d="M88 162c0 0 6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z" fill="#6F4225" />
      </g>

      {/* solid bar */}
      <g className={`${s.layer} ${cair ? s.sembunyi : s.tampil}`}>
        <rect x="80" y="88" width="80" height="86" rx="10" fill="#8B5A3C" stroke="#59331B" strokeWidth="4.5" />
        <path d="M120 88v86M80 131h80" stroke="#59331B" strokeWidth="3.5" />
        <rect x="88" y="96" width="22" height="22" rx="5" fill="#A9714C" />
        <rect x="130" y="96" width="22" height="22" rx="5" fill="#A9714C" />
        <rect x="88" y="140" width="22" height="24" rx="5" fill="#A9714C" />
        <rect x="130" y="140" width="22" height="24" rx="5" fill="#A9714C" />
        <path d="M84 174h72" stroke="#59331B" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  )
}
