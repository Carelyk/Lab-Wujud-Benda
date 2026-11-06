import type { ReactNode } from 'react'
import s from './ui.module.css'

export type Nada = 'panas' | 'dingin' | 'netral' | 'benar' | 'bintang'

interface Props {
  children: ReactNode
  onClick?: () => void
  nada?: Nada
  ikon?: ReactNode
  sub?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  lebar?: boolean
  labelAria?: string
}

export function BigButton({
  children,
  onClick,
  nada = 'netral',
  ikon,
  sub,
  disabled = false,
  type = 'button',
  lebar = false,
  labelAria,
}: Props) {
  const kelas = [s.tombol, s[nada], lebar ? s.lebar : ''].filter(Boolean).join(' ')
  return (
    <button
      type={type}
      className={kelas}
      onClick={onClick}
      disabled={disabled}
      aria-label={labelAria}
    >
      {ikon ? <span className={s.ikon}>{ikon}</span> : null}
      <span className={s.isi}>
        <span className={s.teks}>{children}</span>
        {sub ? <span className={s.sub}>{sub}</span> : null}
      </span>
    </button>
  )
}
