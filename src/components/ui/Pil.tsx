import type { ReactNode } from 'react'
import s from './ui.module.css'

interface Props {
  children: ReactNode
  ikon?: ReactNode
  judul?: string
}

export function Pil({ children, ikon, judul }: Props) {
  return (
    <span className={s.pil} title={judul}>
      {ikon ? <span className={s.pilIkon}>{ikon}</span> : null}
      {children}
    </span>
  )
}
