import type { JalurAirId, LokasiHujanId, SumberAirId } from '../../data/waterCycle'

interface Props {
  progress: number
  reducedMotion: boolean
  sumber: SumberAirId
  lokasiHujan: LokasiHujanId
  jalur: JalurAirId
}

const SUMBER_POSISI: Record<SumberAirId, { x: number; y: number }> = {
  laut: { x: 500, y: 244 },
  sungai: { x: 350, y: 216 },
  danau: { x: 118, y: 237 },
}

const HUJAN_X: Record<LokasiHujanId, number> = {
  desa: 190,
  hutan: 92,
  pegunungan: 375,
}

export function WaterCycleArt({ progress, reducedMotion, sumber, lokasiHujan, jalur }: Props) {
  const p = reducedMotion ? 1 : progress
  const tahap = Math.min(3, Math.floor(p * 4))
  const awan = Math.max(0, Math.min(1, (p - 0.25) / 0.22))
  const hujan = Math.max(0, Math.min(1, (p - 0.5) / 0.2))
  const alir = Math.max(0, Math.min(1, (p - 0.75) / 0.25))
  const asal = SUMBER_POSISI[sumber]
  const hujanX = HUJAN_X[lokasiHujan]

  return (
    <svg
      viewBox="0 0 600 340"
      role="img"
      aria-label={`Diorama siklus air tahap ${tahap + 1}, dari ${sumber}, hujan di ${lokasiHujan}`}
    >
      <rect width="600" height="340" fill="#EAF6FF" />
      <circle cx="520" cy="55" r="34" fill="#FFD166" stroke="#2D3142" strokeWidth="3" />
      <g stroke="#F5A524" strokeWidth="4" strokeLinecap="round" opacity={tahap === 0 ? 1 : 0.55}>
        <path d="M520 9V0M570 55h13M480 55h-13M555 20l9-9M485 90l-9 9" />
      </g>

      <path d="M0 225h600v115H0z" fill="#BFE5C6" stroke="#2D3142" strokeWidth="3" />
      <path d="M300 226l82-158 100 158z" fill="#A9B8CC" stroke="#2D3142" strokeWidth="3" />
      <path d="M363 104l19-36 23 36z" fill="#FFFFFF" stroke="#2D3142" strokeWidth="3" />

      <path
        d="M410 260c55-22 118-21 190-7v87H390z"
        fill="#5CC8F5"
        stroke={sumber === 'laut' ? '#F5A524' : '#2D3142'}
        strokeWidth={sumber === 'laut' ? 7 : 3}
      />
      <text x="514" y="310" textAnchor="middle" fontSize="16" fontWeight="800" fill="#174F72">LAUT</text>

      <ellipse
        cx="118"
        cy="244"
        rx="70"
        ry="24"
        fill="#5CC8F5"
        stroke={sumber === 'danau' ? '#F5A524' : '#2D3142'}
        strokeWidth={sumber === 'danau' ? 7 : 3}
      />
      <text x="118" y="250" textAnchor="middle" fontSize="15" fontWeight="800" fill="#174F72">DANAU</text>

      <path
        d="M380 205c-30 14-46 17-67 33s-36 30-65 33-43-4-66 4"
        fill="none"
        stroke={sumber === 'sungai' ? '#F5A524' : '#2F9BFF'}
        strokeWidth={sumber === 'sungai' ? 12 : 8}
        strokeLinecap="round"
      />
      <text x="274" y="255" textAnchor="middle" fontSize="14" fontWeight="800" fill="#174F72">SUNGAI</text>

      <g opacity={lokasiHujan === 'desa' ? 1 : 0.38}>
        <path d="M152 218v-43h51v43M145 178l33-29 34 29" fill="#FFF4D9" stroke="#2D3142" strokeWidth="3" />
        <rect x="172" y="194" width="13" height="24" fill="#B77945" />
      </g>
      <g opacity={lokasiHujan === 'hutan' ? 1 : 0.38}>
        <path d="M60 226v-53M91 226v-66" stroke="#6E9B53" strokeWidth="7" />
        <circle cx="60" cy="165" r="23" fill="#65B866" stroke="#2D3142" strokeWidth="3" />
        <circle cx="91" cy="150" r="27" fill="#65B866" stroke="#2D3142" strokeWidth="3" />
      </g>

      <g transform={`translate(${hujanX - 245} 0)`} opacity={awan}>
        <path d="M205 82c18-25 52-20 62 4 28-14 53 10 46 35H180c-5-23 4-34 25-39z" fill="#B7C8DD" stroke="#2D3142" strokeWidth="3" />
        <g stroke="#2F9BFF" strokeWidth="5" strokeLinecap="round" opacity={hujan}>
          <path d="M214 136l-10 42M245 136l-8 52M278 136l-9 42" />
        </g>
      </g>

      <g stroke="#9BDFFF" strokeWidth="7" strokeLinecap="round" opacity={1 - awan}>
        <path d={`M${asal.x - 14} ${asal.y - 10}q10-28 0-55`} fill="none" />
        <path d={`M${asal.x + 18} ${asal.y - 5}q10-25 0-48`} fill="none" />
      </g>

      {jalur === 'sungai' ? (
        <path d="M190 224c45 42 92 74 180 68s110-20 150-10" fill="none" stroke="#2F9BFF" strokeWidth="9" strokeLinecap="round" strokeDasharray="15 10" strokeDashoffset={-alir * 80} opacity={alir} />
      ) : (
        <g opacity={alir}>
          <path d="M190 220v67c0 23 35 25 69 25h172" fill="none" stroke="#2F9BFF" strokeWidth="7" strokeLinecap="round" strokeDasharray="8 10" strokeDashoffset={-alir * 60} />
          <text x="286" y="330" textAnchor="middle" fontSize="14" fontWeight="800" fill="#174F72">AIR TANAH</text>
        </g>
      )}
    </svg>
  )
}
