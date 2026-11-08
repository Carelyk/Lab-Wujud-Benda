import { useEffect, useMemo, useState } from 'react'
import { ParticleLens } from '../components/experiment/ParticleLens'
import { Bubble, Mascot } from '../components/mascot/Mascot'
import { WaterCycleArt } from '../components/siklus/WaterCycleArt'
import { BigButton } from '../components/ui/BigButton'
import { Panel } from '../components/ui/Panel'
import { renderIconProses } from '../components/ui/SvgIcons'
import {
  PILIHAN_HUJAN,
  PILIHAN_JALUR,
  PILIHAN_SUMBER,
  TAHAP_SIKLUS_LIST,
} from '../data/waterCycle'
import type { JalurAirId, LokasiHujanId, SumberAirId } from '../data/waterCycle'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTimeline } from '../hooks/useTimeline'
import type { Progress, Wujud } from '../types'
import { mainkan } from '../utils/sound'
import s from './SiklusAirScreen.module.css'

interface Props {
  progress: Progress
  onBack: () => void
  onSelesai: () => Promise<Progress>
  tandaiPartikel: (wujud: Wujud) => Promise<Progress>
}

const WUJUD_PILIH: Wujud[] = ['padat', 'cair', 'gas']

export function SiklusAirScreen({ progress, onBack, onSelesai, tandaiPartikel }: Props) {
  void onBack
  const kurangiGerak = useReducedMotion()
  const { progress: putaran, berjalan, putar, stop, seek } = useTimeline({
    durasiMs: 24000,
    autoPlay: !kurangiGerak,
  })
  const [ulangOtomatis, setUlangOtomatis] = useState(false)
  const [wujud, setWujud] = useState<Wujud>('cair')
  const [suhu, setSuhu] = useState(25)
  const [sibuk, setSibuk] = useState(false)
  const [sumber, setSumber] = useState<SumberAirId>('laut')
  const [lokasiHujan, setLokasiHujan] = useState<LokasiHujanId>('desa')
  const [jalur, setJalur] = useState<JalurAirId>('sungai')

  const index = Math.max(0, Math.min(3, Math.floor((Number.isFinite(putaran) ? putaran : 0) * 4)))
  const tahap = TAHAP_SIKLUS_LIST[index] ?? TAHAP_SIKLUS_LIST[0]
  const namaSumber = PILIHAN_SUMBER.find((item) => item.id === sumber)?.nama ?? 'Laut'
  const namaLokasi = PILIHAN_HUJAN.find((item) => item.id === lokasiHujan)?.nama ?? 'Desa'
  const namaJalur = PILIHAN_JALUR.find((item) => item.id === jalur)?.nama ?? 'Lewat sungai'

  const caption = useMemo(() => {
    if (index === 0) return `Matahari menghangatkan air di ${namaSumber.toLowerCase()}. Air menguap menjadi gas dan naik ke langit.`
    if (index === 1) return `Uap air dari ${namaSumber.toLowerCase()} naik ke udara yang lebih dingin, lalu mengembun menjadi awan.`
    if (index === 2) return `Awan makin berat dan menurunkan hujan di ${namaLokasi.toLowerCase()}. Air kembali membasahi bumi.`
    return `${namaJalur} membawa air dari ${namaLokasi.toLowerCase()} kembali berkumpul di laut. Perjalanannya siap dimulai lagi.`
  }, [index, namaJalur, namaLokasi, namaSumber])

  useEffect(() => {
    const suara = ['siklusMatahari', 'siklusAwan', 'siklusHujan', 'siklusSalju'] as const
    void mainkan(suara[index])
  }, [index])

  useEffect(() => {
    if (putaran >= 1 && ulangOtomatis && !kurangiGerak) putar()
  }, [kurangiGerak, putar, putaran, ulangOtomatis])

  const selesai = async () => {
    if (sibuk || progress.siklus.selesai) return
    setSibuk(true)
    await onSelesai()
    setSibuk(false)
  }

  const pilihCerita = <T,>(setter: (nilai: T) => void, nilai: T, tahapTujuan: number) => {
    setter(nilai)
    seek(tahapTujuan / 4)
    void mainkan('klik')
  }

  return (
    <div className={s.halaman}>
      <div className={s.header}>
        <div>
          <span className={s.pita}>Perjalanan air di bumi</span>
          <h1>Siklus Air</h1>
        </div>
        <strong>Tahap {index + 1} dari 4</strong>
      </div>

      <Panel judul={tahap.nama} ikon={renderIconProses(tahap.proses, 22)}>
        <div className={s.diorama}>
          <WaterCycleArt
            progress={putaran}
            reducedMotion={kurangiGerak}
            sumber={sumber}
            lokasiHujan={lokasiHujan}
            jalur={jalur}
          />
        </div>
        <p className={s.caption}>{caption}</p>
        <div className={s.lompat}>
          {TAHAP_SIKLUS_LIST.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={i === index ? s.aktif : ''}
              onClick={() => {
                seek(i / 4)
                void mainkan('klik')
              }}
            >
              {i + 1}. {item.nama.replace(/^\d\. /, '')}
            </button>
          ))}
        </div>
        <input
          className={s.slider}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={putaran}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Kemajuan siklus air"
        />
        <div className={s.kontrol}>
          <button type="button" onClick={berjalan ? stop : putar}>{berjalan ? 'Jeda' : 'Putar'}</button>
          <button type="button" onClick={putar}>Ulang</button>
          <label>
            <input type="checkbox" checked={ulangOtomatis} onChange={(e) => setUlangOtomatis(e.target.checked)} />
            Ulangi otomatis
          </label>
        </div>
      </Panel>

      <Panel stiker="Buat ceritamu" judul="Pilih perjalanan setetes air">
        <div className={s.pilihanCerita}>
          <fieldset className={s.kelompokCerita}>
            <legend><span>1</span> Air menguap dari mana?</legend>
            {PILIHAN_SUMBER.map((item) => (
              <button
                key={item.id}
                type="button"
                className={sumber === item.id ? s.pilihanAktif : ''}
                aria-pressed={sumber === item.id}
                onClick={() => pilihCerita(setSumber, item.id, 0)}
              >
                <strong>{item.nama}</strong>
                <small>{item.deskripsi}</small>
              </button>
            ))}
          </fieldset>

          <fieldset className={s.kelompokCerita}>
            <legend><span>2</span> Hujan turun di mana?</legend>
            {PILIHAN_HUJAN.map((item) => (
              <button
                key={item.id}
                type="button"
                className={lokasiHujan === item.id ? s.pilihanAktif : ''}
                aria-pressed={lokasiHujan === item.id}
                onClick={() => pilihCerita(setLokasiHujan, item.id, 2)}
              >
                <strong>{item.nama}</strong>
                <small>{item.deskripsi}</small>
              </button>
            ))}
          </fieldset>

          <fieldset className={s.kelompokCerita}>
            <legend><span>3</span> Air pulang lewat mana?</legend>
            {PILIHAN_JALUR.map((item) => (
              <button
                key={item.id}
                type="button"
                className={jalur === item.id ? s.pilihanAktif : ''}
                aria-pressed={jalur === item.id}
                onClick={() => pilihCerita(setJalur, item.id, 3)}
              >
                <strong>{item.nama}</strong>
                <small>{item.deskripsi}</small>
              </button>
            ))}
          </fieldset>
        </div>

        <div className={s.ringkasanCerita} aria-live="polite">
          <Mascot mood="semangat" size={74} />
          <div>
            <span>Cerita pilihanmu</span>
            <p>
              {namaSumber} → uap air → awan → hujan di {namaLokasi} → {namaJalur.toLowerCase()} → laut.
            </p>
          </div>
        </div>
      </Panel>

      <Panel judul="Kaca Pembesar Partikel" ikon={null}>
        <p className={s.petunjuk}>Pilih wujud untuk melihat partikel. Lihat ketiganya untuk membuka lencana Mata Ilmuwan.</p>
        <div className={s.pilihWujud}>
          {WUJUD_PILIH.map((item) => (
            <button
              key={item}
              type="button"
              className={item === wujud ? s.aktif : ''}
              onClick={() => {
                setWujud(item)
                void tandaiPartikel(item)
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <label className={s.suhuBaris}>
          Suhu: {suhu} °C
          <input type="range" min="-20" max="120" value={suhu} onChange={(e) => setSuhu(Number(e.target.value))} />
        </label>
        <ParticleLens wujud={wujud} suhu={suhu} />
      </Panel>

      <div className={s.aksi}>
        <BigButton ikon={null} onClick={() => void selesai()} disabled={progress.siklus.selesai || sibuk}>
          {progress.siklus.selesai ? 'Sudah selesai' : 'Tandai siklus selesai'}
        </BigButton>
      </div>
      <div className={s.footerMascot}>
        <Mascot mood="senang" size={70} />
        <Bubble>Air tidak pernah habis. Ia terus berpindah tempat dan berubah wujud dalam satu perjalanan panjang.</Bubble>
      </div>
    </div>
  )
}
