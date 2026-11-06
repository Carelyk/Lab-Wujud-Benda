import { useEffect } from 'react'
import type { ContohUntungRugiAnimasi } from '../../data/untungRugiAnimasi'
import { useTimeline } from '../../hooks/useTimeline'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { StateBadge } from '../ui/StateBadge'
import { SceneRenderer } from './scenes/SceneRenderer'
import { mainkan } from '../../utils/sound'
import s from './UntungRugiPopup.module.css'

interface Props {
  contoh: ContohUntungRugiAnimasi
  onTutup: () => void
}

export function UntungRugiPopup({ contoh, onTutup }: Props) {
  const kurangiGerak = useReducedMotion()
  const { progress, berjalan, putar } = useTimeline({
    durasiMs: contoh.durasiMs,
    autoPlay: !kurangiGerak,
  })

  // Sound effect trigger when playing
  useEffect(() => {
    if (berjalan) {
      void mainkan('suhu')
    }
  }, [berjalan])

  // Current active stage
  const tahapAktif =
    contoh.tahap.slice().reverse().find((t) => progress >= t.mulai) ?? contoh.tahap[0]

  return (
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={contoh.judul}>
      <div className={s.modal}>
        <div className={s.kepala}>
          <h2 className={s.judul}>{contoh.judul}</h2>
          <span className={`${s.kategori} ${s[contoh.kategori]}`}>
            {contoh.kategori === 'untung' ? '✨ Menguntungkan' : '⚠️ Merugikan'}
          </span>
        </div>

        <div className={s.areaAnimasi}>
          <SceneRenderer id={contoh.id} progress={progress} reducedMotion={kurangiGerak} />
        </div>

        <div className={s.barisTahap} aria-label="Tahap perubahan wujud">
          {contoh.tahap.map((t, idx) => {
            const aktif = tahapAktif.wujud === t.wujud && (t.proses ? tahapAktif.proses === t.proses : true)
            return (
              <div key={idx} className={`${s.tahapItem} ${aktif ? s.tahapAktif : ''}`}>
                <StateBadge wujud={t.wujud} kecil />
                <span className={s.tahapTeks}>{t.proses ? `${t.wujud} (${t.proses})` : t.wujud}</span>
              </div>
            )
          })}
        </div>

        <div className={s.infoBox}>
          <p className={s.prosesLabel}>Proses: <strong>{contoh.proses}</strong></p>
          <p className={s.deskripsi}>{contoh.deskripsi}</p>
          <div className={s.pesanTetes}>
            <span role="img" aria-label="Tetes">💧</span>
            <p>{contoh.pesanTetes}</p>
          </div>
        </div>

        <div className={s.aksiBawah}>
          {!kurangiGerak && (
            <button
              type="button"
              className={s.tombolPutar}
              onClick={putar}
              disabled={berjalan}
            >
              🔄 Putar lagi
            </button>
          )}
          <button type="button" className={s.tombolTutup} onClick={onTutup}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
