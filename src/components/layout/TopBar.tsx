import { IconKembali, IconSuaraMati, IconSuaraNyala, IconTetes } from '../ui/Icons'
import s from './TopBar.module.css'

interface Props {
  judul: string
  suaraMati: boolean
  onSuara: () => void
  onKembali?: () => void
}

export function TopBar({ judul, suaraMati, onSuara, onKembali }: Props) {
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

      <button
        type="button"
        className={s.suara}
        onClick={onSuara}
        aria-pressed={!suaraMati}
        title={suaraMati ? 'Nyalakan suara' : 'Matikan suara'}
      >
        {suaraMati ? <IconSuaraMati size={22} /> : <IconSuaraNyala size={22} />}
        <span>{suaraMati ? 'Suara mati' : 'Suara nyala'}</span>
      </button>
    </header>
  )
}
