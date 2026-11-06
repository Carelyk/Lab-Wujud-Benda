import { useEffect, useState } from 'react'

const KUERI = '(prefers-reduced-motion: reduce)'

export function useReducedMotion(): boolean {
  const [kurang, setKurang] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(KUERI).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(KUERI)
    const ubah = () => setKurang(mq.matches)
    mq.addEventListener('change', ubah)
    return () => mq.removeEventListener('change', ubah)
  }, [])

  return kurang
}
