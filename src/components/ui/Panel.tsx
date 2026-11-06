import type { ReactNode } from 'react'
import s from './ui.module.css'

interface Props {
  children: ReactNode
  judul?: string
  ikon?: ReactNode
  aksi?: ReactNode
  stiker?: string
  className?: string
  id?: string
}

export function Panel({ children, judul, ikon, aksi, stiker, className, id }: Props) {
  return (
    <section id={id} className={[s.panel, className].filter(Boolean).join(' ')}>
      {stiker || judul ? (
        <header className={s.kepala}>
          <div className={s.judulBlok}>
            {stiker ? <span className={s.stiker}>{stiker}</span> : null}
            {judul ? (
              <h2 className={s.judul}>
                {ikon ? <span className={s.judulIkon}>{ikon}</span> : null}
                {judul}
              </h2>
            ) : null}
          </div>
          {aksi ? <div className={s.aksi}>{aksi}</div> : null}
        </header>
      ) : null}
      {children}
    </section>
  )
}
