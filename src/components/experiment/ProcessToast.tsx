import type { ReactNode } from 'react'
import { LABEL_PROSES, PENJELASAN_PROSES } from '../../data/labels'
import type { NamaProses } from '../../types'
import { IconCloud, IconDingin, IconPanas, IconTetes } from '../ui/Icons'
import s from './ProcessToast.module.css'

const IKON: Record<NamaProses, ReactNode> = {
  mencair: <IconPanas size={26} />,
  membeku: <IconDingin size={26} />,
  menguap: <IconCloud size={26} />,
  mendidih: <IconCloud size={26} />,
  mengembun: <IconTetes size={26} />,
}

interface Props {
  proses: NamaProses
}

/** Big label that pops over the bench whenever the wujud changes. */
export function ProcessToast({ proses }: Props) {
  return (
    <div className={`${s.toast} ${s[proses]}`} role="status">
      <span className={s.ikon}>{IKON[proses]}</span>
      <span className={s.isi}>
        <strong className={s.judul}>{LABEL_PROSES[proses]}!</strong>
        <span className={s.ket}>{PENJELASAN_PROSES[proses]}</span>
      </span>
    </div>
  )
}
