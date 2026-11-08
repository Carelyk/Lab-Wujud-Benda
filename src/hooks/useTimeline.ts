import { useCallback, useEffect, useRef, useState } from 'react'

interface UseTimelineOptions {
  durasiMs: number
  autoPlay?: boolean
}

export function useTimeline({ durasiMs, autoPlay = true }: UseTimelineOptions) {
  const [progress, setProgress] = useState<number>(autoPlay ? 0 : 1)
  const [berjalan, setBerjalan] = useState<boolean>(autoPlay)
  const [key, setKey] = useState<number>(0)
  const mulaiRef = useRef(0)
  const awalRef = useRef(0)

  useEffect(() => {
    if (!berjalan) return
    let animId: number
    mulaiRef.current = performance.now()
    awalRef.current = progress

    const frame = (waktu: number) => {
      const selisih = waktu - mulaiRef.current
      const p = Math.min(1, awalRef.current + selisih / durasiMs)
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

  const putar = useCallback(() => {
    setProgress(0)
    setBerjalan(true)
    setKey((k) => k + 1)
  }, [])

  const stop = useCallback(() => {
    setBerjalan(false)
  }, [])

  const seek = useCallback((nilai: number) => {
    setBerjalan(false)
    setProgress(Math.max(0, Math.min(1, nilai)))
  }, [])

  return { progress, berjalan, putar, stop, seek }
}
