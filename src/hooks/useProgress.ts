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

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(progressAwal)
  const [siap, setSiap] = useState(false)
  const [lencanaBaru, setLencanaBaru] = useState<string[]>([])

  useEffect(() => {
    let hidup = true
    void penyimpanan.ambil().then((p) => {
      if (!hidup) return
      const vol = p.volume ?? 60
      setBisu(vol === 0)
      setVolumeSuara(vol)
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
    const vol = mati ? 0 : 60
    setVolumeSuara(vol)
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
    setVolumeSuara(60)
    setProgress(p)
    setLencanaBaru([])
    return p
  }, [])

  useEffect(() => {
    if (!siap) return
    const lama = progress.lencana
    const baru = lencanaTerbuka(progress)
    const adaBaru = baru.filter((id) => !lama.includes(id))
    if (adaBaru.length > 0) {
      void mainkan('lencanaKilau')
      for (const id of adaBaru) {
        void penyimpanan.bukaLencana(id)
      }
      setProgress((prev) => ({
        ...prev,
        lencana: Array.from(new Set([...prev.lencana, ...adaBaru])),
      }))
      setLencanaBaru(adaBaru)
    }
  }, [progress, siap])

  const bersihkanLencanaBaru = useCallback(() => {
    setLencanaBaru([])
  }, [])

  return {
    progress,
    siap,
    lencanaBaru,
    bersihkanLencanaBaru,
    catat,
    simpanPrediksi,
    simpanSortir,
    simpanKuis,
    tandaiPartikel,
    selesaikanSiklus,
    bukaLencana,
    ubahSuara,
    ubahVolume,
    reset,
  }
}
