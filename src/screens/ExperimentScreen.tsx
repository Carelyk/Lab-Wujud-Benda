import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Bench } from '../components/experiment/Bench'
import { HeatControls } from '../components/experiment/HeatControls'
import { NoteBook } from '../components/experiment/NoteBook'
import { PredictionCard } from '../components/experiment/PredictionCard'
import type { EntriCatatan } from '../hooks/useProgress'
import { Bubble, Mascot } from '../components/mascot/Mascot'
import type { MoodTetes } from '../components/mascot/Mascot'
import {
  IconAir,
  IconEs,
  IconLilin,
  IconPanci,
} from '../components/ui/Icons'
import { Panel } from '../components/ui/Panel'
import { LABEL_WUJUD, teksCatatan } from '../data/labels'
import { BENDA, BENDA_LIST } from '../data/objects'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useSuhuBertahap } from '../hooks/useSuhuBertahap'
import type { BendaId, NamaProses, Perubahan, Progress, Wujud } from '../types'
import { ambangSuhu, fasePada } from '../utils/fase'
import { mainkan } from '../utils/sound'
import s from './ExperimentScreen.module.css'

const IKON: Record<BendaId, ReactNode> = {
  es: <IconEs size={24} />,
  air: <IconAir size={24} />,
  lilin: <IconLilin size={24} />,
  'kapur-barus': <span style={{ fontSize: '1.2rem' }}>⚪</span>,
  panci: <IconPanci size={24} />,
}

interface Props {
  progress: Progress
  catat: (entri: EntriCatatan) => Promise<Progress>
  simpanPrediksi: (bendaId: BendaId, jawaban: Wujud, tepat: boolean) => Promise<Progress>
}

export function ExperimentScreen({ progress, catat, simpanPrediksi }: Props) {
  const [bendaId, setBendaId] = useState<BendaId>('es')
  const [toast, setToast] = useState<{ proses: NamaProses; urutan: number } | null>(null)
  const [hasil, setHasil] = useState<{ tepat: boolean; jawaban: Wujud } | null>(null)

  const benda = BENDA[bendaId]
  const kurangiGerak = useReducedMotion()

  const urutanRef = useRef(0)
  const sudahDinilai = useRef<Set<BendaId>>(new Set())
  const progressRef = useRef(progress)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  const onPerubahan = useCallback(
    (p: Perubahan) => {
      if (!p.proses || !p.arah) return

      urutanRef.current += 1
      setToast({ proses: p.proses, urutan: urutanRef.current })

      const beruap = p.proses === 'menguap' || p.proses === 'mendidih'
      void mainkan(beruap ? 'cess' : 'ding')

      const b = BENDA[bendaId]
      void catat({
        bendaId,
        proses: p.proses,
        arah: p.arah,
        teks: teksCatatan(b, p.proses, p.arah),
      })

      // Only a real wujud change while heating answers the prediction.
      const berubahWujud = p.dariWujud !== p.keWujud
      if (!berubahWujud || p.arah !== 'panas' || sudahDinilai.current.has(bendaId)) return

      const pred = progressRef.current.prediksi[bendaId]
      if (!pred) return

      sudahDinilai.current.add(bendaId)
      const tepat = pred.jawaban === b.prediksi.benar
      setHasil({ tepat, jawaban: pred.jawaban })
      void mainkan(tepat ? 'benar' : 'salah')
    },
    [bendaId, catat],
  )

  const { suhu, target, bergerak, aturTarget, tambah, ulang, pindah } = useSuhuBertahap({
    benda,
    onPerubahan,
    kurangiGerak,
  })

  const fase = fasePada(benda, suhu)
  const ambang = ambangSuhu(benda)
  const pred = progress.prediksi[bendaId]
  const jawaban = pred?.jawaban

  // The toast disappears on its own, shortly after its exit animation.
  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 3000)
    return () => window.clearTimeout(id)
  }, [toast])

  const gantiBenda = (id: BendaId) => {
    if (id === bendaId) return
    void mainkan('klik')
    setToast(null)
    setHasil(null)
    pindah(BENDA[id])
    setBendaId(id)
  }

  const jawab = (w: Wujud) => {
    void mainkan('klik')
    void simpanPrediksi(benda.id, w, w === benda.prediksi.benar)
    sudahDinilai.current.delete(benda.id)
    setHasil(null)
  }

  const panaskan = () => {
    void mainkan('klik')
    aturTarget(benda.suhuMaks)
  }

  const dinginkan = () => {
    void mainkan('klik')
    aturTarget(benda.suhuMin)
  }

  const sapu = (delta: number) => {
    void mainkan('klik')
    tambah(delta)
  }

  const ulangi = () => {
    void mainkan('klik')
    setToast(null)
    ulang()
  }

  const mood: MoodTetes = hasil
    ? hasil.tepat
      ? 'semangat'
      : 'bingung'
    : !jawaban
      ? 'bingung'
      : fase.wujud === 'gas' || suhu >= 80
        ? 'panas'
        : suhu <= 0
          ? 'dingin'
          : 'senang'

  const ucapan = hasil
    ? hasil.tepat
      ? `Tepat! ${benda.nama} berubah menjadi ${LABEL_WUJUD[benda.prediksi.benar].toLowerCase()}.`
      : `Belum tepat. ${benda.nama} berubah menjadi ${LABEL_WUJUD[benda.prediksi.benar].toLowerCase()}. Coba lagi, ya!`
    : !jawaban
      ? 'Pilih dulu tebakanmu di kartu Prediksi. Aku penasaran!'
      : fase.wujud === 'gas'
        ? 'Uapnya memenuhi tempat. Sekarang wujudnya gas!'
        : fase.wujud === 'padat'
          ? 'Bentuknya tetap dan tidak ikut wadah. Ini benda padat.'
          : fase.uap > 0.15
            ? 'Sudah cair. Ada uap tipis yang naik, tanda air menguap.'
            : 'Sudah cair. Bentuknya ikut wadah, isinya tetap.'

  return (
    <div className={s.layar}>
      <div className={s.pilih} role="group" aria-label="Pilih benda">
        {BENDA_LIST.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`${s.tab} ${b.id === bendaId ? s.aktif : ''}`}
            onClick={() => gantiBenda(b.id)}
            aria-pressed={b.id === bendaId}
            title={b.keterangan}
          >
            <span className={s.tabIkon} aria-hidden="true">
              {IKON[b.id]}
            </span>
            <span className={s.tabTeks}>{b.nama}</span>
          </button>
        ))}
      </div>

      <div className={s.grid}>
        <div className={s.utama}>
          <Bench
            benda={benda}
            wujud={fase.wujud}
            uap={fase.uap}
            suhu={suhu}
            toast={toast}
            onPanas={panaskan}
            onDingin={dinginkan}
          />

          <HeatControls
            benda={benda}
            suhu={suhu}
            target={target}
            bergerak={bergerak}
            ambang={ambang}
            onTarget={(n) => {
              aturTarget(n)
            }}
            onTambah={sapu}
            onUlang={ulangi}
          />
        </div>

        <aside className={s.sisi}>
          <Panel className={s.kartuTetes}>
            <div className={s.tetesBaris}>
              <Mascot mood={mood} size={140} />
              <Bubble className={s.bubble}>{ucapan}</Bubble>
            </div>
            <p className={s.petunjuk}>
              Klik matahari untuk memanaskan, klik gunung es untuk mendinginkan.
            </p>
          </Panel>

          <PredictionCard benda={benda} jawaban={jawaban} hasil={hasil} onJawab={jawab} />

          <NoteBook catatan={progress.catatan} />
        </aside>
      </div>
    </div>
  )
}
