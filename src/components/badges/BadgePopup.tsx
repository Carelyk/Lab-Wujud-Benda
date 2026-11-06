import { useEffect } from 'react'
import { lencanaDari } from '../../data/badges'
import { IconLencana } from '../ui/Icons'
import { BadgeArt } from './BadgeArt'
import s from './BadgePopup.module.css'

interface Props {
  id: string
  onTutup: () => void
}

/** Celebration card for a freshly unlocked badge. */
export function BadgePopup({ id, onTutup }: Props) {
  const lencana = lencanaDari(id)

  useEffect(() => {
    const timer = window.setTimeout(onTutup, 7000)
    return () => window.clearTimeout(timer)
  }, [id, onTutup])

  if (!lencana) return null

  return (
    <div className={s.popup} role="status" aria-live="polite">
      <BadgeArt jenis={lencana.jenis} size={72} />
      <div className={s.teks}>
        <span className={s.label}>
          <IconLencana size={16} />
          Lencana baru
        </span>
        <strong className={s.nama}>{lencana.nama}</strong>
        <p className={s.cara}>{lencana.cara}</p>
      </div>
      <button type="button" className={s.tutup} onClick={onTutup} aria-label="Tutup lencana baru">
        ×
      </button>
    </div>
  )
}
