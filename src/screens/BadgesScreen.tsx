import { Bubble, Mascot } from '../components/mascot/Mascot'
import { BadgeArt } from '../components/badges/BadgeArt'
import { Panel } from '../components/ui/Panel'
import { BigButton } from '../components/ui/BigButton'
import { IconGembok, IconKembali, IconLencana } from '../components/ui/Icons'
import { DAFTAR_LENCANA } from '../data/badges'
import type { Progress } from '../types'
import s from './BadgesScreen.module.css'

interface Props {
  progress: Progress
  onBeranda: () => void
}

/**
 * The badge cabinet.
 *
 * Unlocked badges show their medal in full colour. Locked badges show the same
 * medal as a grey silhouette plus the exact action that opens it, so a child
 * always knows what to do next.
 */
export function BadgesScreen({ progress, onBeranda }: Props) {
  const terbuka = new Set(progress.lencana)
  const jumlah = DAFTAR_LENCANA.filter((l) => terbuka.has(l.id)).length

  return (
    <div className={s.layar}>
      <section className={s.intro}>
        <div className={s.introTeks}>
          <span className={s.pita}>Koleksi</span>
          <h1 className={s.judul}>Lemari Lencana</h1>
          <p className={s.sub}>
            Setiap lencana terbuka dari perbuatan nyata di dalam aplikasi, bukan dari membuka
            halaman.
          </p>
          <p className={s.hitung}>
            <strong>{jumlah}</strong> dari {DAFTAR_LENCANA.length} lencana terbuka
          </p>
          <div className={s.progres} aria-hidden="true">
            <span
              className={s.progresIsi}
              style={{ width: `${(jumlah / DAFTAR_LENCANA.length) * 100}%` }}
            />
          </div>
        </div>
        <div className={s.introTetes}>
          <Mascot mood={jumlah > 0 ? 'senang' : 'semangat'} size={132} />
          <Bubble>
            {jumlah === 0
              ? 'Belum ada lencana. Mulai dari Eksperimen, yuk!'
              : jumlah === DAFTAR_LENCANA.length
                ? 'Semua lencana sudah kamu kumpulkan. Luar biasa!'
                : `Sudah ${jumlah} lencana. Masih ada ${DAFTAR_LENCANA.length - jumlah} lagi!`}
          </Bubble>
        </div>
      </section>

      <Panel
        judul="Semua lencana"
        ikon={<IconLencana size={22} />}
        aksi={<span className={s.info}>{jumlah} terkumpul</span>}
      >
        <ul className={s.daftar}>
          {DAFTAR_LENCANA.map((l) => {
            const buka = terbuka.has(l.id)
            return (
              <li key={l.id} className={`${s.kartu} ${buka ? s.buka : s.kunci}`}>
                <BadgeArt jenis={l.jenis} size={86} terkunci={!buka} />
                <div className={s.teks}>
                  <p className={s.nama}>{l.nama}</p>
                  <p className={s.cara}>
                    {buka ? l.cara : (
                      <>
                        <span className={s.gembok} aria-hidden="true">
                          <IconGembok size={14} />
                        </span>
                        {l.cara}
                      </>
                    )}
                  </p>
                </div>
                <span className={buka ? s.statusBuka : s.statusKunci}>
                  {buka ? 'Terbuka' : 'Terkunci'}
                </span>
              </li>
            )
          })}
        </ul>
      </Panel>

      <div className={s.kaki}>
        <BigButton ikon={<IconKembali size={22} />} onClick={onBeranda} nada="netral">
          Kembali ke Beranda
        </BigButton>
      </div>
    </div>
  )
}
