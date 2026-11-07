import type { TingkatVolume } from '../../types'
import { IconKembali, IconTetes } from '../ui/Icons'
import { VolumeControl } from '../ui/VolumeControl'
import s from './TopBar.module.css'

interface Props {
  judul: string
  volume: TingkatVolume
  onVolume: (level: TingkatVolume) => void
  onKembali?: () => void
}

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

      <div className={s.volumeGrup}>
        <VolumeControl volume={volume} onVolume={onVolume} />
      </div>
    </header>
  )
}
