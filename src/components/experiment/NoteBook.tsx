import { BENDA } from '../../data/objects'
import type { CatatanEntry } from '../../types'
import { Panel } from '../ui/Panel'
import { IconBuku, IconCentang } from '../ui/Icons'
import s from './NoteBook.module.css'

interface Props {
  catatan: CatatanEntry[]
  batas?: number
}

export function NoteBook({ catatan, batas = 8 }: Props) {
  const tampil = catatan.slice(0, batas)
  const sisa = catatan.length - tampil.length

  return (
    <Panel
      stiker="Catatan"
      judul="Buku Ilmuwan Cilik"
      ikon={<IconBuku size={22} />}
      aksi={<span className={s.jumlah}>{catatan.length} catatan</span>}
    >
      {tampil.length === 0 ? (
        <div className={s.kosong}>
          <p>Belum ada catatan.</p>
          <p className={s.kosongSub}>
            Setiap perubahan wujud yang kamu temukan akan tercatat di sini.
          </p>
        </div>
      ) : (
        <ul className={s.daftar}>
          {tampil.map((e) => (
            <li key={e.id} className={s.baris}>
              <span className={s.emoji} aria-hidden="true">
                {BENDA[e.bendaId]?.emoji ?? '🔬'}
              </span>
              <span className={s.teks}>{e.teks}</span>
              <span className={s.centang}>
                <IconCentang size={16} />
                <span className="sr-only">tercatat</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {sisa > 0 ? <p className={s.sisa}>+{sisa} catatan lain tersimpan.</p> : null}
    </Panel>
  )
}
