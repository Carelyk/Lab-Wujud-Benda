import s from './ParticleLens.module.css'

interface Props {
  wujud: 'padat' | 'cair' | 'gas' | string
  suhu: number
}

export function ParticleLens({ wujud, suhu }: Props) {
  // Generate particle positions based on state
  const count = wujud === 'gas' ? 18 : wujud === 'cair' ? 22 : 24
  const speedFactor = Math.max(0.5, (suhu + 20) / 60)

  return (
    <div className={s.lensContainer} aria-label="Kaca Pembesar Partikel">
      <div className={s.lensHeader}>
        <span className={s.badge}>Mata Ilmuwan</span>
        <span className={s.info}>
          {wujud === 'padat' && 'Partikel rapat, teratur, dan bergetar di tempat.'}
          {wujud === 'cair' && 'Partikel lebih renggang dan saling bergeseran.'}
          {wujud === 'gas' && 'Partikel sangat renggang, bergerak bebas dan sangat cepat!'}
          {wujud !== 'padat' && wujud !== 'cair' && wujud !== 'gas' && 'Partikel kecil sekali.'}
        </span>
      </div>

      <div className={s.viewbox}>
        {Array.from({ length: count }).map((_, i) => {
          const randomX = (i * 37) % 85 + 10
          const randomY = (i * 53) % 85 + 10
          return (
            <div
              key={i}
              className={`${s.particle} ${s[wujud]}`}
              style={
                {
                  '--rx': `${randomX}%`,
                  '--ry': `${randomY}%`,
                  '--speed': `${1.5 / speedFactor}s`,
                  '--delay': `${(i * 0.15) % 2}s`,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>
      <p className={s.hint}>Suhu: {suhu}°C — Makin panas, partikel bergerak makin cepat!</p>
    </div>
  )
}
