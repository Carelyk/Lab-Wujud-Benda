import { useState } from 'react'
import { TAHAP_SIKLUS_LIST } from '../data/waterCycle'
import { Bubble, Mascot } from '../components/mascot/Mascot'
import { BigButton } from '../components/ui/BigButton'
import { Panel } from '../components/ui/Panel'
import { ParticleLens } from '../components/experiment/ParticleLens'
import { mainkan } from '../utils/sound'
import type { Progress, Wujud } from '../types'
import s from './SiklusAirScreen.module.css'

interface Props {
  progress: Progress
  onBack: () => void
  onSelesai: () => Promise<Progress>
  tandaiPartikel: (wujud: Wujud) => Promise<Progress>
}

const WUJUD_PILIH: Wujud[] = ['padat', 'cair', 'gas']

export function SiklusAirScreen({ progress, onBack, onSelesai, tandaiPartikel }: Props) {
  const [wujud, setWujud] = useState<Wujud>('cair')
  const [suhu, setSuhu] = useState(25)
  const [sibuk, setSibuk] = useState(false)

  const selesai = async () => {
    if (sibuk || progress.siklus.selesai) return
    setSibuk(true)
    void mainkan('buka')
    await onSelesai()
    setSibuk(false)
  }

  return (
    <div className={s.halaman}>
      <header className={s.header}>
        <button type="button" className={s.backBtn} onClick={onBack}>
          ← Beranda
        </button>
        <h1>☁️ Siklus Air</h1>
        <div className={s.badgeCounter}>
          {progress.siklus.selesai ? 'Selesai' : 'Belum selesai'}
        </div>
      </header>

      <Panel judul="Tahapan Siklus Air" ikon={null}>
        <div className={s.daftar}>
          {TAHAP_SIKLUS_LIST.map((tahap) => (
            <div key={tahap.id} className={s.kartu}>
              <span className={s.nama}>{tahap.nama}</span>
              <p className={s.deskripsi}>{tahap.deskripsi}</p>
              <span className={s.suhu}>Suhu rata-rata: {tahap.suhuRata}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel judul="Kaca Pembesar Partikel" ikon={null}>
        <p className={s.petunjuk}>
          Pilih wujud, lalu lihat partikelnya. Lihat ketiga wujud untuk membuka lencana Mata Ilmuwan.
        </p>
        <div className={s.pilihWujud}>
          {WUJUD_PILIH.map((w) => (
            <button
              key={w}
              type="button"
              className={w === wujud ? `${s.tombolWujud} ${s.aktif}` : s.tombolWujud}
              onClick={() => {
                setWujud(w)
                void tandaiPartikel(w)
                void mainkan('klik')
              }}
            >
              {w}
            </button>
          ))}
        </div>
        <div className={s.suhuBaris}>
          <label htmlFor="suhu-siklus">Suhu: {suhu} °C</label>
          <input
            id="suhu-siklus"
            type="range"
            min={-20}
            max={120}
            value={suhu}
            onChange={(e) => setSuhu(Number(e.target.value))}
          />
        </div>
        <ParticleLens wujud={wujud} suhu={suhu} />
      </Panel>

      <div className={s.aksi}>
        <BigButton
          ikon={null}
          onClick={() => void selesai()}
          disabled={progress.siklus.selesai || sibuk}
        >
          {progress.siklus.selesai ? 'Sudah selesai' : 'Tandai siklus selesai'}
        </BigButton>
      </div>

      <div className={s.footerMascot}>
        <Mascot mood="senang" size={70} />
        <Bubble>
          Air berubah wujud berulang-ulang. Itulah siklus air yang menjaga bumi tetap segar.
        </Bubble>
      </div>
    </div>
  )
}