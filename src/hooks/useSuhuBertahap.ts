import { useCallback, useEffect, useRef, useState } from 'react'
import type { Benda, Perubahan } from '../types'
import { langkahSuhu, resolvePhase } from '../utils/fase'

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
 *
 * The animation loop lives in one effect and only touches refs, so React does
 * not re-create it on every render. The parent switches benda with `pindah()`,
 * which resets the engine without an extra render pass.
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

  // Latest props for the loop. Written in an effect, never during render.
  const cbRef = useRef(onPerubahan)
  const bendaRef = useRef(benda)
  const reduksiRef = useRef(kurangiGerak)
  const langkahRef = useRef<(now: number) => void>(() => undefined)

  useEffect(() => {
    cbRef.current = onPerubahan
    bendaRef.current = benda
    reduksiRef.current = kurangiGerak
  }, [onPerubahan, benda, kurangiGerak])

  // One long-lived loop. It reads refs only, so it never needs to be rebuilt.
  useEffect(() => {
    let frame: number | null = null

    const langkah = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - terakhirRef.current) / 1000))
      terakhirRef.current = now

      if (now < tahanRef.current) {
        frame = requestAnimationFrame(langkah)
        rafRef.current = frame
        return
      }

      const b = bendaRef.current
      const dari = suhuRef.current
      const tujuan = targetRef.current
      const kecepatan = reduksiRef.current ? 300 : 42
      const hasil = langkahSuhu(b, dari, tujuan, dt, kecepatan)

      if (Math.abs(tujuan - dari) < 0.05) {
        if (dari !== tujuan) {
          suhuRef.current = tujuan
          setSuhu(tujuan)
        }
        frame = null
        rafRef.current = null
        setBergerak(false)
        return
      }

      if (hasil.tahan) {
        tahanRef.current = now + (reduksiRef.current ? 260 : 600)
      }

      const perubahan = resolvePhase(b, dari, hasil.berikut)
      suhuRef.current = hasil.berikut
      setSuhu(hasil.berikut)

      if (perubahan.proses) cbRef.current(perubahan, dari, hasil.berikut)

      frame = requestAnimationFrame(langkah)
      rafRef.current = frame
    }

    langkahRef.current = langkah

    return () => {
      langkahRef.current = () => undefined
      if (frame !== null) cancelAnimationFrame(frame)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const mulaiLoop = useCallback(() => {
    if (rafRef.current !== null) return
    setBergerak(true)
    terakhirRef.current = performance.now()
    rafRef.current = requestAnimationFrame((now) => langkahRef.current(now))
  }, [])

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
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    targetRef.current = b.suhuAwal
    suhuRef.current = b.suhuAwal
    tahanRef.current = 0
    setTarget(b.suhuAwal)
    setSuhu(b.suhuAwal)
    setBergerak(false)
  }, [])

  /**
   * Call from the event that selects another benda. It snaps every value to
   * the new benda's realistic start before the next render reads `suhu`.
   */
  const pindah = useCallback((baru: Benda) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    targetRef.current = baru.suhuAwal
    suhuRef.current = baru.suhuAwal
    tahanRef.current = 0
    terakhirRef.current = performance.now()
    setTarget(baru.suhuAwal)
    setSuhu(baru.suhuAwal)
    setBergerak(false)
  }, [])

  return { suhu, target, bergerak, aturTarget, tambah, ulang, pindah }
}
