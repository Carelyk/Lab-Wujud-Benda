import React from 'react'
import s from './Scene.module.css'

export const SceneRenderer: React.FC<{ id: string; progress: number; reducedMotion?: boolean }> = ({
  id,
  progress,
  reducedMotion,
}) => {
  const p = reducedMotion ? 1 : progress

  let scale = 1
  let textLabel = 'Mulai'

  if (p < 0.35) {
    textLabel = 'Keadaan Awal'
    scale = 1
  } else if (p < 0.85) {
    textLabel = 'Proses Perubahan'
    scale = 1 + Math.sin(p * Math.PI * 4) * 0.05
  } else {
    textLabel = 'Keadaan Akhir'
    scale = 1
  }

  return (
    <div className={s.sceneContainer} aria-hidden="true">
      <svg viewBox="0 0 300 160" className={s.svgCanvas} preserveAspectRatio="xMidYMid meet">
        <rect width="300" height="160" rx="16" fill="var(--latar)" />
        
        <circle cx="250" cy="30" r="18" fill="var(--panas)" opacity={0.8} />
        <path d="M250 8L250 2M250 52L250 58M228 30L222 30M272 30L278 30" stroke="var(--panas)" strokeWidth="3" strokeLinecap="round" />

        <path d="M90 120 L210 120 L200 140 L100 140 Z" fill="var(--aksen)" opacity={0.3} />

        {id === 'es-krim' && (
          <g transform={`translate(150, 95) scale(${scale})`}>
            <polygon points="-20,-10 20,-10 0,40" fill="#D97706" />
            <circle cx="0" cy={-20 + p * 10} r={22 - p * 4} fill="#F472B6" />
            <circle cx="-8" cy={-30 + p * 8} r={16} fill="#FBCFE8" />
            {p > 0.5 && <path d="M-10 0 Q 0 15 10 5" fill="none" stroke="#F472B6" strokeWidth="6" strokeLinecap="round" />}
          </g>
        )}

        {id === 'hujan' && (
          <g>
            <rect x="50" y="115" width="200" height="25" rx="6" fill="#3B82F6" />
            <path d={`M100 ${110 - p * 50} Q110 ${90 - p * 50} 100 ${70 - p * 50}`} fill="none" stroke="#93C5FD" strokeWidth="3" opacity={1 - p} />
            <path d={`M180 ${115 - p * 60} Q170 ${95 - p * 60} 180 ${75 - p * 60}`} fill="none" stroke="#93C5FD" strokeWidth="3" opacity={1 - p} />
            <path d="M120 40 Q140 25 160 40 Q180 35 190 50 Q205 50 200 65 Q115 65 120 40" fill="#9CA3AF" opacity={p} />
            {p > 0.6 && (
              <g stroke="#3B82F6" strokeWidth="2" strokeLinecap="round">
                <line x1="140" y1="70" x2="135" y2="85" opacity={(p - 0.6) * 2.5} />
                <line x1="165" y1="70" x2="160" y2="85" opacity={(p - 0.6) * 2.5} />
                <line x1="180" y1="70" x2="175" y2="85" opacity={(p - 0.6) * 2.5} />
              </g>
            )}
          </g>
        )}

        {id !== 'es-krim' && id !== 'hujan' && (
          <g transform={`translate(150, 90) scale(${scale})`}>
            <circle cx="0" cy="0" r={30 + p * 10} fill="var(--bintang)" opacity={0.8} />
            <text x="0" y="5" textAnchor="middle" fill="#1F2937" fontSize="12" fontWeight="bold">
              {Math.round(p * 100)}%
            </text>
          </g>
        )}

        <rect x="15" y="15" width="90" height="24" rx="12" fill="var(--teks)" opacity={0.8} />
        <text x="60" y="31" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
          {textLabel}
        </text>
      </svg>
    </div>
  )
}
