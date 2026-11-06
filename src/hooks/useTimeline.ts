import { useCallback, useEffect, useRef, useState } from 'react'

interface UseTimelineOptions {
  durasiMs: number
  autoPlay?: boolean
}

export function useTimeline({ durasiMs, autoPlay = true }: UseTimelineOptions) {
  const [progress, setProgress] = useState<number>(autoPlay ? 0 : 1)
  const [berjalan, setBerjalan] = useState<boolean>(autoPlay)
  const animRef = useRef<number | null>(null)
  const mulaiRef = useRef<number | null>(null)

  const stop = useCallback(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current)
      animRef.current = null
    }
    setBerjalan(false)
  }, [])

  const putar = useCallback(() => {
    stop()
    setProgress(0)
    setBerjalan(true)
    mulaiRef.current = null

    const frame = (waktu: number) => {
      if (!mulaiRef.current) mulaiRef.current = waktu
      const selisih = waktu - mulaiRef.current
      const p = Math.min(1, selisih / durasiMs)
      setProgress(p)

      if (p < 1) {
        animRef.current = requestAnimationFrame(frame)
      } else {
        setBerjalan(false)
        animRef.current = null
      }
    }
    animRef.current = requestAnimationFrame(frame)
  }, [durasiMs, stop])

  useEffect(() => {
    if (autoPlay) {
      putar()
    }
    return () => {
      stop()
    }
  }, [autoPlay, putar, stop])

  return { progress, berjalan, putar, stop }
}
