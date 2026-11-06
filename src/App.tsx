import { useCallback, useEffect, useState } from 'react'
import { TopBar } from './components/layout/TopBar'
import { useProgress } from './hooks/useProgress'
import { ExperimentScreen } from './screens/ExperimentScreen'
import { HomeScreen } from './screens/HomeScreen'
import type { ScreenId } from './types'
import { mainkan, siapkanSuara } from './utils/sound'
import s from './App.module.css'

/** Hash routing keeps the bundle tiny and the phone back button working. */
function layarDariHash(hash: string): ScreenId {
  return hash === '#/eksperimen' ? 'eksperimen' : 'beranda'
}

export default function App() {
  const [layar, setLayar] = useState<ScreenId>(() => layarDariHash(window.location.hash))
  const { progress, catat, simpanPrediksi, ubahSuara } = useProgress()

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
    window.location.hash = tujuan === 'eksperimen' ? '#/eksperimen' : '#/'
    setLayar(tujuan)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const alihSuara = useCallback(() => {
    const mati = !progress.suaraMati
    void ubahSuara(mati)
    if (!mati) void mainkan('klik')
  }, [progress.suaraMati, ubahSuara])

  return (
    <div className={s.app}>
      <TopBar
        judul="Eksperimen Bebas"
        suaraMati={progress.suaraMati}
        onSuara={alihSuara}
        onKembali={layar === 'eksperimen' ? () => pergi('beranda') : undefined}
      />

      <main className={s.main}>
        {layar === 'beranda' ? (
          <HomeScreen progress={progress} onMulai={() => pergi('eksperimen')} />
        ) : (
          <ExperimentScreen progress={progress} catat={catat} simpanPrediksi={simpanPrediksi} />
        )}
      </main>

      <footer className={s.kaki}>
        <p>Dibuat untuk belajar IPAS kelas 4 SD. Tanpa iklan dan tanpa pelacak.</p>
      </footer>
    </div>
  )
}
