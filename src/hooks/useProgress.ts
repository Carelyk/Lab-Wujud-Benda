import { useCallback, useEffect, useState } from 'react'
import type { Arah, BendaId, NamaProses, Progress, Wujud } from '../types'
import { setBisu } from '../utils/sound'
import { penyimpanan, progressAwal } from '../utils/storage'

export interface EntriCatatan {
  bendaId: BendaId
  proses: NamaProses
  arah: Arah
  teks: string
}

/**
 * Loads progress once and exposes promise-based actions.
 * Components never talk to storage directly, so the backend can change later.
 */
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(progressAwal)
  const [siap, setSiap] = useState(false)

  useEffect(() => {
    let hidup = true
    void penyimpanan.ambil().then((p) => {
      if (!hidup) return
      setBisu(p.suaraMati)
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
    async (bendaId: BendaId, jawaban: Wujud, tepat: boolean) => {
      const p = await penyimpanan.simpanPrediksi(bendaId, jawaban, tepat)
      setProgress(p)
      return p
    },
    [],
  )

  const bukaLencana = useCallback(async (id: string) => {
    const p = await penyimpanan.bukaLencana(id)
    setProgress(p)
    return p
  }, [])

  const ubahSuara = useCallback(async (mati: boolean) => {
    setBisu(mati)
    const p = await penyimpanan.setSuaraMati(mati)
    setProgress(p)
    return p
  }, [])

  const reset = useCallback(async () => {
    const p = await penyimpanan.reset()
    setBisu(false)
    setProgress(p)
    return p
  }, [])

  return { progress, siap, catat, simpanPrediksi, bukaLencana, ubahSuara, reset }
}
