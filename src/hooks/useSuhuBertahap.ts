import { useCallback, useEffect, useRef, useState } from 'react'
import type { Benda, Perubahan } from '../types'
import { ambangSuhu, resolvePhase } from '../utils/fase'

interface Opsi {
  benda: Benda
  onPerubahan: (perubahan: Perubahan, dari: number, ke: number) => void
  kurangiGerak: boolean
}

/**
 * Moves the temperature gradually instead of jumping.
 *
 * Rule that matters for learning: the animation always stops exactly on every
 * threshold (0 °C, 30 °C, 100 °C, ...) and holds for a moment. So even when a
 * child drags the slider from -20 to 120 at once, every single process gets
 * its own label, sound and notebook line.
 */
export function useSuhuBertahap({ benda, onPerubahan, kurangiGerak }: Opsi) {
  const [suhu, setSuhu] = useState(benda.suhuAwal)
  const [target, setTarget] = useState(benda.suhuAwal)
  const [bergerak, setBergerak] = useState(false)

  const suhuRef = useRef(benda.suhuAwal)
  const targetRef = useRef(benda.suhuAwal)
  const rafRef = useRef<number | null>(null)
  const terakhirRef = useRef(0)
  const tahanRef = useRef(0)

  const cbRef = useRef(onPerubahan)
  cbRef.current = onPerubahan
  const bendaRef = useRef(benda)
  bendaRef.current = benda
  const reduksiRef = useRef(kurangiGerak)
  reduksiRef.current = kurangiGerak

  const langkah = useCallback((now: number) => {
    const dt = Math.min(0.05, Math.max(0, (now - terakhirRef.current) / 1000))
    terakhirRef.current = now

    if (now < tahanRef.current) {
      rafRef.current = requestAnimationFrame(langkah)
      return
    }

    const b = bendaRef.current
    const dari = suhuRef.current
    const tujuan = targetRef.current

    if (Math.abs(tujuan - dari) < 0.05) {
      if (dari !== tujuan) {
        suhuRef.current = tujuan
        setSuhu(tujuan)
      }
      rafRef.current = null
      setBergerak(false)
      return
    }

    const arah = tujuan > dari ? 1 : -1
    const kecepatan = reduksiRef.current ? 300 : 42
    let berikut = dari + arah * kecepatan * dt

    if ((arah > 0 && berikut > tujuan) || (arah < 0 && berikut < tujuan)) {
      berikut = tujuan
    }

    const lewat = ambangSuhu(b).filter((a) =>
      arah > 0 ? a > dari && a <= berikut : a < dari && a >= berikut,
    )

    if (lewat.length > 0) {
      berikut = arah > 0 ? lewat[0] : lewat[lewat.length - 1]
      tahanRef.current = now + (reduksiRef.current ? 260 : 600)
    }

    const perubahan = resolvePhase(b, dari, berikut)
    suhuRef.current = berikut
    setSuhu(berikut)

    if (perubahan.proses) cbRef.current(perubahan, dari, berikut)

    rafRef.current = requestAnimationFrame(langkah)
  }, [])

  const mulaiLoop = useCallback(() => {
    if (rafRef.current !== null) return
    setBergerak(true)
    terakhirRef.current = performance.now()
    rafRef.current = requestAnimationFrame(langkah)
  }, [langkah])

  const aturTarget = useCallback(
    (nilai: number) => {
      const b = bendaRef.current
      const dibatasi = Math.max(b.suhuMin, Math.min(b.suhuMaks, Math.round(nilai)))
      targetRef.current = dibatasi
      setTarget(dibatasi)
      mulaiLoop()
    },
    [mulaiLoop],
  )

  const tambah = useCallback(
    (delta: number) => {
      aturTarget(targetRef.current + delta)
    },
    [aturTarget],
  )

  const ulang = useCallback(() => {
    const b = bendaRef.current
    targetRef.current = b.suhuAwal
    setTarget(b.suhuAwal)
    suhuRef.current = b.suhuAwal
    setSuhu(b.suhuAwal)
    tahanRef.current = 0
    setBergerak(false)
  }, [])

  // Switching benda resets everything to that benda's realistic start.
  useEffect(() => {
    suhuRef.current = benda.suhuAwal
    targetRef.current = benda.suhuAwal
    tahanRef.current = 0
    setSuhu(benda.suhuAwal)
    setTarget(benda.suhuAwal)
    setBergerak(false)
  }, [benda.id, benda.suhuAwal])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  return { suhu, target, bergerak, aturTarget, tambah, ulang }
}
