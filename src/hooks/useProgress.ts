import { useCallback, useEffect, useState } from 'react'
import type { Arah, BendaId, NamaProses, Progress, TingkatVolume, Wujud } from '../types'
import { lencanaTerbuka } from '../utils/lencana'
import { mainkan, setBisu, setVolume as setVolumeSuara } from '../utils/sound'
import { penyimpanan, progressAwal } from '../utils/storage'

export interface EntriCatatan {
  bendaId: BendaId
  proses: NamaProses
  arah: Arah
  teks: string
}

export interface HasilSortir {
  total: number
  benar: number
  salah: number
  bintang: number
}

export interface HasilKuis {
  benar: number
  total: number
  bintang: number
}

/**
 * Loads progress once and exposes promise-based actions.
 * Components never talk to storage directly, so the backend can change later.
 *
 * Badges are unlocked here: every saved change is checked against the pure
 * rules in utils/lencana.ts, and only genuinely new badges enter the queue.
 */
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(progressAwal)
  const [siap, setSiap] = useState(false)
  const [lencanaBaru, setLencanaBaru] = useState<string[]>([])

  useEffect(() => {
    let hidup = true
    void penyimpanan.ambil().then((p) => {
      if (!hidup) return
      setBisu(p.suaraMati)
      setVolumeSuara(p.volume ?? (p.suaraMati ? 'mati' : 'normal'))
      setProgress(p)
      setSiap(true)
    })
    return () => {
      hidup = false
    }
  }, [])

  const catat = useCallback(async (entri: EntriCatatan) => {
    const p = await penyimpanan.tambahCatatan(entri)
    setProgress(p)
    return p
  }, [])

  const simpanPrediksi = useCallback(
    async (bendaId: BendaId, jawaban: Wujud) => {
      const p = await penyimpanan.simpanPrediksi(bendaId, jawaban)
      setProgress(p)
      return p
    },
    [],
  )

  const simpanSortir = useCallback(async (hasil: HasilSortir) => {
    const p = await penyimpanan.simpanSortir(hasil.benar, hasil.total, hasil.salah, hasil.bintang)
    setProgress(p)
    return p
  }, [])

  const simpanKuis = useCallback(async (hasil: HasilKuis) => {
    const p = await penyimpanan.simpanKuis(hasil.benar > 0 && hasil.benar === hasil.total, hasil.total, hasil.bintang)
    setProgress(p)
    return p
  }, [])

  const tandaiPartikel = useCallback(async (wujud: Wujud) => {
    const p = await penyimpanan.tandaiPartikelDilihat(wujud)
    setProgress(p)
    return p
  }, [])

  const selesaikanSiklus = useCallback(async () => {
    const p = await penyimpanan.tandaiSiklusSelesai()
    setProgress(p)
    return p
  }, [])

  const bukaLencana = useCallback(async (id: string) => {
    const p = await penyimpanan.bukaLencana(id)
    setProgress(p)
    return p
  }, [])

  const ubahSuara = useCallback(async (mati: boolean) => {
    setVolumeSuara(mati ? 'mati' : 'normal')
    const p = await penyimpanan.setSuaraMati(mati)
    setProgress(p)
    return p
  }, [])

  const ubahVolume = useCallback(async (level: TingkatVolume) => {
    setVolumeSuara(level)
    const p = await penyimpanan.setVolume(level)
    setProgress(p)
    return p
  }, [])

  const reset = useCallback(async () => {
    const p = await penyimpanan.resetSemua()
    setBisu(false)
    setVolumeSuara('normal')
    setProgress(p)
    setLencanaBaru([])
    return p
  }, [])

  const tutupLencanaBaru = useCallback(() => {
    setLencanaBaru((q) => q.slice(1))
  }, [])

  // The only place that turns real actions into badges.
  useEffect(() => {
    if (!siap) return
    const baru = lencanaTerbuka(progress).filter((id) => !progress.lencana.includes(id))
    if (baru.length === 0) return

    let hidup = true
    void (async () => {
      let p = progress
      for (const id of baru) p = await penyimpanan.bukaLencana(id)
      if (!hidup) return
      setProgress(p)
      setLencanaBaru((q) => [...q, ...baru.filter((id) => !q.includes(id))])
      void mainkan('buka')
    })()

    return () => {
      hidup = false
    }
  }, [progress, siap])

  return {
    progress,
    siap,
    lencanaBaru,
    catat,
    simpanPrediksi,
    simpanSortir,
    simpanKuis,
    tandaiPartikel,
    selesaikanSiklus,
    bukaLencana,
    tutupLencanaBaru,
    ubahSuara,
    ubahVolume,
    reset,
  }
}
