import s from './Thermometer.module.css'

interface Props {
  suhu: number
  min: number
  maks: number
  ambang: number[]
}

const ATAS = 42
const BAWAH = 212
const TINGGI = BAWAH - ATAS

/** Blue when cold, orange when hot. Purely decorative: the number is the truth. */
function warnaMerkuri(suhu: number): string {
  const f = Math.min(1, Math.max(0, suhu / 100))
  const dari = [92, 200, 245]
  const ke = [255, 90, 60]
  const c = dari.map((v, i) => Math.round(v + (ke[i] - v) * f))
  return `rgb(${c[0]} ${c[1]} ${c[2]})`
}

export function Thermometer({ suhu, min, maks, ambang }: Props) {
  const span = maks - min
  const f = span > 0 ? Math.min(1, Math.max(0, (suhu - min) / span)) : 0
  const yMerkuri = BAWAH - f * TINGGI
  const warna = warnaMerkuri(suhu)
  const angka = Math.round(suhu)

  return (
    <div className={s.wadah}>
      <p className={s.angka}>
        {angka}
        <span className={s.satuan}>°C</span>
      </p>

      <svg
        viewBox="0 0 78 248"
        className={s.svg}
        role="img"
        aria-label={`Termometer menunjukkan ${angka} derajat Celsius`}
      >
        <rect
          x="27"
          y="30"
          width="14"
          height="182"
          rx="7"
          fill="#FFFFFF"
          stroke="#B9D6E9"
          strokeWidth="3"
        />
        <rect x="30" y={yMerkuri} width="8" height={BAWAH - yMerkuri} rx="4" fill={warna} />
        <circle cx="34" cy="214" r="16" fill="#FFFFFF" stroke="#B9D6E9" strokeWidth="3" />
        <circle cx="34" cy="214" r="11" fill={warna} />

        {ambang.map((a) => {
          const fa = span > 0 ? Math.min(1, Math.max(0, (a - min) / span)) : 0
          const y = BAWAH - fa * TINGGI
          return (
            <g key={a}>
              <line
                x1="42"
                y1={y}
                x2="50"
                y2={y}
                stroke="#8A91A3"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text x="52" y={y + 3.5} fontSize="10" fontWeight="700" fill="#5A6072">
                {a}°
              </text>
            </g>
          )
        })}
      </svg>

      <span className={s.label}>Suhu</span>
    </div>
  )
}
