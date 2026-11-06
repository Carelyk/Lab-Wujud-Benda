import { PENJELASAN_WUJUD } from '../../data/labels'
import type { Benda, NamaProses, Wujud } from '../../types'
import { StateBadge } from '../ui/StateBadge'
import { Panel } from '../ui/Panel'
import { Artwork } from './art/Artwork'
import { ProcessToast } from './ProcessToast'
import s from './Bench.module.css'

interface Props {
  benda: Benda
  wujud: Wujud
  uap: number
  suhu?: number
  toast: { proses: NamaProses; urutan: number } | null
  onPanas: () => void
  onDingin: () => void
}

function Matahari() {
  return (
    <svg viewBox="0 0 64 64" width="42" height="42" aria-hidden="true">
      <g stroke="#F5A524" strokeWidth="4" strokeLinecap="round">
        <path d="M32 5v7M32 52v7M5 32h7M52 32h7M12 12l5 5M47 47l5 5M52 12l-5 5M17 47l-5 5" />
      </g>
      <circle cx="32" cy="32" r="14" fill="#FFD166" stroke="#F5A524" strokeWidth="4" />
      <circle cx="27" cy="30" r="2.4" fill="#2D3142" />
      <circle cx="37" cy="30" r="2.4" fill="#2D3142" />
      <path
        d="M27.5 37q4.5 4 9 0"
        stroke="#2D3142"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function GunungEs() {
  return (
    <svg viewBox="0 0 64 64" width="42" height="42" aria-hidden="true">
      <path
        d="M4 51 20 17l12 14 8-8 20 28Z"
        fill="#D7F0FC"
        stroke="#5CC8F5"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M20 17 28 33l-6 4 9 14"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M4 51h56" stroke="#2A9AD8" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

export function Bench({ benda, wujud, uap, suhu, toast, onPanas, onDingin }: Props) {
  return (
    <Panel className={s.panel} judul={benda.nama} aksi={<StateBadge wujud={wujud} />}>
      <p className={s.ciri}>{PENJELASAN_WUJUD[wujud]}</p>
      {benda.id === 'lilin' ? (
        <p className={s.catatanLilin}>
          Lilin mencair karena panas. Jangan main api sendiri ya. Ini hanya di layar.
        </p>
      ) : null}

      <div className={s.panggung}>
        <button
          type="button"
          className={`${s.pemicu} ${s.dingin}`}
          onClick={onDingin}
          title="Dinginkan benda"
        >
          <GunungEs />
          <span className={s.pemicuTeks}>Dingin</span>
        </button>

        <button
          type="button"
          className={`${s.pemicu} ${s.panas}`}
          onClick={onPanas}
          title="Panaskan benda"
        >
          <Matahari />
          <span className={s.pemicuTeks}>Panas</span>
        </button>

        <div className={s.artikel}>
          <Artwork bendaId={benda.id} wujud={wujud} uap={uap} suhu={suhu} />
        </div>

        <div className={s.meja} aria-hidden="true" />

        {toast ? <ProcessToast key={toast.urutan} proses={toast.proses} /> : null}
      </div>
    </Panel>
  )
}
