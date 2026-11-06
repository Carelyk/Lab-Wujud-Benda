import { useState, useEffect } from 'react'

interface UseTimelineOptions {
  durasiMs: number
  autoPlay?: boolean
}

export function useTimeline({ durasiMs, autoPlay = true }: UseTimelineOptions) {
  const [progress, setProgress] = useState<number>(autoPlay ? 0 : 1)
  const [berjalan, setBerjalan] = useState<boolean>(autoPlay)
  const [key, setKey] = useState<number>(0)

  useEffect(() => {
    if (!berjalan) return
    let animId: number
    const mulai = performance.now()

    const frame = (waktu: number) => {
      const selisih = waktu - mulai
      const p = Math.min(1, selisih / durasiMs)
      setProgress(p)

      if (p < 1) {
        animId = requestAnimationFrame(frame)
      } else {
        setBerjalan(false)
      }
    }

    animId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(animId)
  }, [durasiMs, berjalan, key])

  const putar = () => {
    setProgress(0)
    setBerjalan(true)
    setKey((k) => k + 1)
  }

  const stop = () => {
    setBerjalan(false)
  }

  return { progress, berjalan, putar, stop }
}
