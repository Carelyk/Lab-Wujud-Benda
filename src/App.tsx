import { useCallback, useEffect, useState } from 'react'
import { BadgePopup } from './components/badges/BadgePopup'
import { TopBar } from './components/layout/TopBar'
import { useProgress } from './hooks/useProgress'
import { BadgesScreen } from './screens/BadgesScreen'
import { ExperimentScreen } from './screens/ExperimentScreen'
import { HomeScreen } from './screens/HomeScreen'
import { QuizScreen } from './screens/QuizScreen'
import { SortingScreen } from './screens/SortingScreen'
import { UntungRugiScreen } from './screens/UntungRugiScreen'
import type { ScreenId } from './types'
import { mainkan, siapkanSuara } from './utils/sound'
import s from './App.module.css'

/** Hash routing keeps the bundle tiny and the phone back button working. */
const RUTE: Record<string, ScreenId> = {
  '#/eksperimen': 'eksperimen',
  '#/sortir': 'sortir',
  '#/kuis': 'kuis',
  '#/lencana': 'lencana',
  '#/sekitar': 'untungRugi',
}

const HASH: Record<ScreenId, string> = {
  beranda: '#/',
  eksperimen: '#/eksperimen',
  sortir: '#/sortir',
  kuis: '#/kuis',
  lencana: '#/lencana',
  siklus: '#/siklus',
  untungRugi: '#/sekitar',
}

const JUDUL: Record<ScreenId, string> = {
  beranda: 'Laboratorium Wujud Benda',
  eksperimen: 'Eksperimen Bebas',
  sortir: 'Sortir Benda',
  kuis: 'Kuis Bintang',
  lencana: 'Lemari Lencana',
  siklus: 'Siklus Air',
  untungRugi: 'Wujud di Sekitar Kita',
}

function layarDariHash(hash: string): ScreenId {
  return RUTE[hash] ?? 'beranda'
}

export default function App() {
  const [layar, setLayar] = useState<ScreenId>(() => layarDariHash(window.location.hash))
  const {
    progress,
    lencanaBaru,
    catat,
    simpanPrediksi,
    simpanSortir,
    simpanKuis,
    ubahSuara,
    tutupLencanaBaru,
  } = useProgress()

  useEffect(() => {
    const saatHashBerubah = () => setLayar(layarDariHash(window.location.hash))
    window.addEventListener('hashchange', saatHashBerubah)
    return () => window.removeEventListener('hashchange', saatHashBerubah)
  }, [])

  // Mobile browsers only allow audio after a real gesture.
  useEffect(() => {
    const buka = () => {
      void siapkanSuara()
    }
    window.addEventListener('pointerdown', buka, { once: true })
    window.addEventListener('keydown', buka, { once: true })
    return () => {
      window.removeEventListener('pointerdown', buka)
      window.removeEventListener('keydown', buka)
    }
  }, [])

  const pergi = useCallback((tujuan: ScreenId) => {
    window.location.hash = HASH[tujuan]
    setLayar(tujuan)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const alihSuara = useCallback(() => {
    const mati = !progress.suaraMati
    void ubahSuara(mati)
    if (!mati) void mainkan('klik')
  }, [progress.suaraMati, ubahSuara])

  let isi
  switch (layar) {
    case 'eksperimen':
      isi = <ExperimentScreen progress={progress} catat={catat} simpanPrediksi={simpanPrediksi} />
      break
    case 'sortir':
      isi = (
        <SortingScreen
          onSimpan={(hasil) => void simpanSortir(hasil)}
          onBeranda={() => pergi('beranda')}
        />
      )
      break
    case 'kuis':
      isi = (
        <QuizScreen
          progress={progress}
          onSimpan={(hasil) => void simpanKuis(hasil)}
          onBeranda={() => pergi('beranda')}
        />
      )
      break
    case 'lencana':
      isi = <BadgesScreen progress={progress} onBeranda={() => pergi('beranda')} />
      break
    case 'untungRugi':
      isi = <UntungRugiScreen onBack={() => pergi('beranda')} />
      break
    default:
      isi = (
        <HomeScreen
          progress={progress}
          onMulai={() => pergi('eksperimen')}
          onSortir={() => pergi('sortir')}
          onKuis={() => pergi('kuis')}
          onLencana={() => pergi('lencana')}
          onUntungRugi={() => pergi('untungRugi')}
        />
      )
  }

  return (
    <div className={s.app}>
      <TopBar
        judul={JUDUL[layar]}
        suaraMati={progress.suaraMati}
        onSuara={alihSuara}
        onKembali={layar === 'beranda' ? undefined : () => pergi('beranda')}
      />

      <main className={s.main}>{isi}</main>

      {lencanaBaru.length > 0 ? (
        <BadgePopup id={lencanaBaru[0]} onTutup={tutupLencanaBaru} />
      ) : null}

      <footer className={s.kaki}>
        <p>Dirancang Oleh : Zefanya Rizqita Siathen</p>
      </footer>
    </div>
  )
}
