import { LABEL_WUJUD } from '../../data/labels'
import type { Benda, Wujud } from '../../types'
import { Panel } from '../ui/Panel'
import { StateBadge } from '../ui/StateBadge'
import { IconCentang, IconSilang, IconTetes } from '../ui/Icons'
import s from './PredictionCard.module.css'

const PILIHAN: Wujud[] = ['padat', 'cair', 'gas']

interface Props {
  benda: Benda
  jawaban?: Wujud
  hasil: { tepat: boolean; jawaban: Wujud } | null
  onJawab: (w: Wujud) => void
}

export function PredictionCard({ benda, jawaban, hasil, onJawab }: Props) {
  const benar = benda.prediksi.benar

  return (
    <Panel stiker="Prediksi" judul="Tebakan Tetes" ikon={<IconTetes size={22} />}>
      <p className={s.tanya}>{benda.prediksi.pertanyaan}</p>

      <div className={s.opsi} role="group" aria-label="Pilih tebakan">
        {PILIHAN.map((w) => (
          <button
            key={w}
            type="button"
            className={`${s.tombol} ${jawaban === w ? s.dipilih : ''}`}
            onClick={() => onJawab(w)}
            aria-pressed={jawaban === w}
          >
            <StateBadge wujud={w} kecil />
          </button>
        ))}
      </div>

      {jawaban ? (
        <p className={s.status}>
          {hasil
            ? 'Tebakanmu sudah diuji.'
            : 'Tebakan disimpan. Sekarang panaskan bendanya, ya!'}
        </p>
      ) : (
        <p className={s.status}>Pilih satu jawaban dulu sebelum bereksperimen.</p>
      )}

      {hasil ? (
        <p className={`${s.hasil} ${hasil.tepat ? s.benar : s.salah}`}>
          <span className={s.hasilIkon} aria-hidden="true">
            {hasil.tepat ? <IconCentang size={20} /> : <IconSilang size={20} />}
          </span>
          <span>
            <strong>{hasil.tepat ? 'Tepat sekali!' : 'Belum tepat.'}</strong>{' '}
            {benda.nama} berubah menjadi {LABEL_WUJUD[benar].toLowerCase()}
            {hasil.tepat ? '.' : `, bukan ${LABEL_WUJUD[hasil.jawaban].toLowerCase()}.`}
          </span>
        </p>
      ) : null}
    </Panel>
  )
}
