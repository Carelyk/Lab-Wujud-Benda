import type { TingkatVolume } from '../../types'
import { IconKembali, IconSuaraMati, IconSuaraNyala, IconTetes } from '../ui/Icons'
import s from './TopBar.module.css'

interface Props {
  judul: string
  volume: TingkatVolume
  onVolume: (level: TingkatVolume) => void
  onKembali?: () => void
}

const LEVELS: { level: TingkatVolume; label: string }[] = [
  { level: 'mati', label: 'Mati' },
  { level: 'pelan', label: 'Pelan' },
  { level: 'normal', label: 'Normal' },
]

export function TopBar({ judul, volume, onVolume, onKembali }: Props) {
  return (
    <header className={s.bar}>
      <div className={s.kiri}>
        {onKembali ? (
          <button type="button" className={s.kembali} onClick={onKembali}>
            <IconKembali size={20} />
            <span>Beranda</span>
          </button>
        ) : null}

        <span className={s.merek}>
          <span className={s.lambang} aria-hidden="true">
            <IconTetes size={20} />
          </span>
          <span className={s.merekTeks}>
            {onKembali ? (
              judul
            ) : (
              <>
                <span className={s.merekPanjang}>Laboratorium </span>Wujud Benda
              </>
            )}
          </span>
        </span>
      </div>

      <div className={s.volumeGrup} role="group" aria-label="Volume">
        {LEVELS.map(({ level, label }) => (
          <button
            key={level}
            type="button"
            className={volume === level ? `${s.tombolVolume} ${s.aktif}` : s.tombolVolume}
            onClick={() => onVolume(level)}
            aria-pressed={volume === level}
            title={label}
          >
            {level === 'mati' ? <IconSuaraMati size={18} /> : <IconSuaraNyala size={18} />}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </header>
  )
}