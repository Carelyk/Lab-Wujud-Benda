import { LABEL_WUJUD } from '../../data/labels'
import type { Wujud } from '../../types'
import s from './ui.module.css'

interface Props {
  wujud: Wujud
  kecil?: boolean
}

/** Colour plus text, never colour alone. */
export function StateBadge({ wujud, kecil = false }: Props) {
  return (
    <span className={[s.lencanaWujud, s[wujud], kecil ? s.wujudKecil : ''].filter(Boolean).join(' ')}>
      <span className={s.titik} aria-hidden="true" />
      {LABEL_WUJUD[wujud]}
    </span>
  )
}
