import { useCallback, useEffect, useState } from 'react'
import { BadgePopup } from './components/badges/BadgePopup'
import { TopBar } from './components/layout/TopBar'
import { useProgress } from './hooks/useProgress'
import { BadgesScreen } from './screens/BadgesScreen'
import { ExperimentScreen } from './screens/ExperimentScreen'
import { HomeScreen } from './screens/HomeScreen'
import { QuizScreen } from './screens/QuizScreen'
import { SortingScreen } from './screens/SortingScreen'
import { SiklusAirScreen } from './screens/SiklusAirScreen'
import { UntungRugiScreen } from './screens/UntungRugiScreen'
import { SoundTestScreen } from './screens/SoundTestScreen'
import type { ScreenId, TingkatVolume } from './types'
import { mainkan, siapkanSuara } from './utils/sound'
import s from './App.module.css'

/** Hash routing keeps the bundle tiny and the phone back button working. */
const RUTE: Record<string, ScreenId> = {
  '#/eksperimen': 'eksperimen',
  '#/sortir': 'sortir',
  '#/kuis': 'kuis',
  '#/lencana': 'lencana',
  '#/sekitar': 'untungRugi',
  '#/siklus': 'siklus',
  '#/suara': 'suara',
}

const HASH: Record<ScreenId, string> = {
  beranda: '#/',
  eksperimen: '#/eksperimen',
  sortir: '#/sortir',
  kuis: '#/kuis',
  lencana: '#/lencana',
  siklus: '#/siklus',
  untungRugi: '#/sekitar',
  suara: '#/suara',
}

const JUDUL: Record<ScreenId, string> = {
  beranda: 'Laboratorium Wujud Benda',
  eksperimen: 'Eksperimen Bebas',
  sortir: 'Sortir Benda',
  kuis: 'Kuis Bintang',
  lencana: 'Lemari Lencana',
  siklus: 'Siklus Air',
  untungRugi: 'Wujud di Sekitar Kita',
  suara: 'Uji Suara',
}

function layarDariHash(hash: string): ScreenId {
  return RUTE[hash] ?? 'beranda'
}

export default function App() {
  const [layar, setLayar] = useState<ScreenId>(() => layarDariHash(window.location.hash))
  const {
    progress,
    lencanaBaru,
    bersihkanLencanaBaru,
    catat,
    simpanPrediksi,
    simpanSortir,
    simpanKuis,
    tandaiPartikel,
    selesaikanSiklus,
    ubahVolume,
  } = useProgress()

  useEffect(() => {
    const saatHashBerubah = () => setLayar(layarDariHash(window.location.hash))
    window.addEventListener('hashchange', saatHashBerubah)
    return () => window.removeEventListener('hashchange', saatHashBerubah)
  }, [])

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

  const alihVolume = useCallback((level: TingkatVolume) => {
    void ubahVolume(level)
    if (level > 0) void mainkan('klik')
  }, [ubahVolume])

  let isi
  switch (layar) {
    case 'eksperimen':
      isi = <ExperimentScreen progress={progress} catat={catat} simpanPrediksi={simpanPrediksi} tandaiPartikel={tandaiPartikel} />
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
    case 'siklus':
      isi = <SiklusAirScreen progress={progress} onBack={() => pergi('beranda')} onSelesai={selesaikanSiklus} tandaiPartikel={tandaiPartikel} />
      break
    case 'untungRugi':
      isi = <UntungRugiScreen onBack={() => pergi('beranda')} />
      break
    case 'suara':
      isi = <SoundTestScreen volume={progress.volume ?? 60} onVolume={alihVolume} />
      break
    default:
      isi = (
        <HomeScreen
          progress={progress}
          onMulai={() => pergi('eksperimen')}
          onSortir={() => pergi('sortir')}
          onKuis={() => pergi('kuis')}
          onLencana={() => pergi('lencana')}
          onSiklus={() => pergi('siklus')}
          onUntungRugi={() => pergi('untungRugi')}
        />
      )
      break
  }

  const judul = JUDUL[layar]

  return (
    <div className={s.wadah}>
      <TopBar
        judul={judul}
        volume={progress.volume ?? 60}
        onVolume={alihVolume}
        onKembali={layar !== 'beranda' ? () => pergi('beranda') : undefined}
      />
      <main className={s.utama}>{isi}</main>
      {lencanaBaru.length > 0 ? (
        <BadgePopup id={lencanaBaru[0]} onTutup={bersihkanLencanaBaru} />
      ) : null}
    </div>
  )
}
