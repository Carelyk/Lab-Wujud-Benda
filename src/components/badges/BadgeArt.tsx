import type { ReactNode } from 'react'
import type { JenisLencana } from '../../types'
import {
  IconBasket,
  IconBuku,
  IconCloud,
  IconEs,
  IconGembok,
  IconSiklus,
  IconStar,
  IconTetes,
  IconZoom,
} from '../ui/Icons'
import s from './BadgeArt.module.css'

const IKON: Record<JenisLencana, ReactNode> = {
  beku: <IconEs size={26} />,
  uap: <IconCloud size={26} />,
  leleh: <IconTetes size={26} />,
  sortir: <IconBasket size={26} />,
  kuis: <IconStar size={26} />,
  buku: <IconBuku size={26} />,
  lens: <IconZoom size={26} />,
  siklus: <IconSiklus size={26} />,
}

interface Props {
  jenis: JenisLencana
  terkunci?: boolean
  size?: number
}

/** Medal drawn with CSS: no image files, still looks like a collectible. */
export function BadgeArt({ jenis, terkunci = false, size = 88 }: Props) {
  return (
    <span
      className={`${s.medali} ${s[jenis]} ${terkunci ? s.terkunci : ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className={s.pitaKiri} />
      <span className={s.pitaKanan} />
      <span className={s.cakram}>
        {terkunci ? <IconGembok size={Math.round(size * 0.3)} /> : IKON[jenis]}
      </span>
    </span>
  )
}
