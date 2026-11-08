import type { Wujud } from '../../../types'
import s from './art.module.css'

export function CrystalArt({ wujud }: { wujud: Wujud }) {
  const kristal = wujud === 'padat'

  return (
    <svg viewBox="0 0 240 220" className={s.svg} aria-hidden="true">
      <ellipse cx="120" cy="190" rx="80" ry="12" fill="#DCE9F2" />

      <g className={`${s.layer} ${kristal ? s.sembunyi : s.tampil}`} fill="none" strokeLinecap="round">
        <path d="M78 161c-18-18 18-25 0-45s17-28 0-48" stroke="#BFE6FA" strokeWidth="9" />
        <path d="M120 169c-21-23 21-31 0-57s21-34 0-62" stroke="#75C8F5" strokeWidth="11" />
        <path d="M162 161c-18-18 18-25 0-45s17-28 0-48" stroke="#BFE6FA" strokeWidth="9" />
      </g>

      <g className={`${s.layer} ${kristal ? s.tampil : s.sembunyi}`}>
        <path d="M120 62v112M72 90l96 56M72 146l96-56" stroke="#58BCEB" strokeWidth="8" strokeLinecap="round" />
        <path d="M120 62l-13 16m13-16 13 16M120 174l-13-16m13 16 13-16M72 90l20 2M72 90l8 18M168 146l-20-2m20 2-8-18M72 146l20-2m-20 2 8-18M168 90l-20 2m20-2-8 18" stroke="#58BCEB" strokeWidth="6" strokeLinecap="round" />
        <circle cx="120" cy="118" r="18" fill="#EAFBFF" stroke="#2D3142" strokeWidth="3" />
        <path d="M113 117h14M116 124q4 4 8 0" stroke="#2D3142" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}
