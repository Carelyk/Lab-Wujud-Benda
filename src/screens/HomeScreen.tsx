import { NoteBook } from '../components/experiment/NoteBook'
import { Bubble, Mascot } from '../components/mascot/Mascot'
import { BigButton } from '../components/ui/BigButton'
import { Panel } from '../components/ui/Panel'
import { StateBadge } from '../components/ui/StateBadge'
import {
  IconBasket,
  IconBuku,
  IconEs,
  IconFlask,
  IconGembok,
  IconPanas,
  IconStar,
} from '../components/ui/Icons'
import type { Progress } from '../types'
import s from './HomeScreen.module.css'

const LANGKAH = [
  {
    ikon: <IconEs size={24} />,
    judul: 'Pilih benda',
    teks: 'Es batu, air, lilin, cokelat, atau air di panci.',
  },
  {
    ikon: <IconPanas size={24} />,
    judul: 'Atur panas atau dingin',
    teks: 'Geser pengatur suhu, atau klik matahari dan gunung es.',
  },
  {
    ikon: <IconBuku size={24} />,
    judul: 'Lihat perubahannya',
    teks: 'Wujud benda berubah, dan catatanmu terisi otomatis.',
  },
]

interface Props {
  progress: Progress
  onMulai: () => void
}

export function HomeScreen({ progress, onMulai }: Props) {
  return (
    <div className={s.beranda}>
      <section className={s.hero}>
        <div className={s.heroTeks}>
          <span className={s.pita}>IPAS kelas 4 SD</span>

          <h1 className={s.judul}>
            <span>Laboratorium</span>
            <span className={s.judulDua}>
              Wujud Benda
              <svg
                className={s.coret}
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M5 11C66 3 154 2 295 7"
                  fill="none"
                  stroke="var(--bintang)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className={s.sub}>
            Panaskan dan dinginkan benda, lalu lihat wujudnya berubah. Yuk, coba bersama Tetes!
          </p>

          <div className={s.aksi}>
            <BigButton
              nada="panas"
              ikon={<IconFlask size={26} />}
              sub="5 benda · panas dan dingin"
              onClick={onMulai}
            >
              Ayo Bereksperimen
            </BigButton>
          </div>

          <p className={s.kecil}>Tanpa login. Progresmu tersimpan di perangkat ini.</p>
        </div>

        <div className={s.heroGambar}>
          <div className={s.tetes}>
            <Mascot mood="senang" size={196} />
          </div>
          <Bubble className={s.bubble}>Halo! Aku Tetes. Mau coba eksperimen hari ini?</Bubble>
          <div className={s.wujud}>
            <StateBadge wujud="padat" kecil />
            <StateBadge wujud="cair" kecil />
            <StateBadge wujud="gas" kecil />
          </div>
        </div>
      </section>

      <section className={s.langkah} aria-label="Cara bermain">
        {LANGKAH.map((l, i) => (
          <div key={l.judul} className={s.langkahItem}>
            <span className={s.nomor} aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <p className={s.langkahJudul}>
                <span className={s.langkahIkon} aria-hidden="true">
                  {l.ikon}
                </span>
                {l.judul}
              </p>
              <p className={s.langkahTeks}>{l.teks}</p>
            </div>
          </div>
        ))}
      </section>

      <div className={s.bawah}>
        <NoteBook catatan={progress.catatan} batas={4} />

        <Panel stiker="Segera" judul="Mode berikutnya" ikon={<IconStar size={22} />}>
          <div className={s.modeDaftar}>
            <div className={s.modeKartu}>
              <span className={s.modeIkon} aria-hidden="true">
                <IconBasket size={26} />
              </span>
              <div className={s.modeTeks}>
                <p className={s.modeNama}>Sortir Benda</p>
                <p className={s.modeKet}>
                  Masukkan benda ke keranjang padat, cair, atau gas.
                </p>
              </div>
              <span className={s.kunci}>
                <IconGembok size={14} />
                Tahap 2
              </span>
            </div>

            <div className={s.modeKartu}>
              <span className={s.modeIkon} aria-hidden="true">
                <IconStar size={26} />
              </span>
              <div className={s.modeTeks}>
                <p className={s.modeNama}>Kuis Bintang</p>
                <p className={s.modeKet}>Jawab soal dan kumpulkan sampai tiga bintang.</p>
              </div>
              <span className={s.kunci}>
                <IconGembok size={14} />
                Tahap 2
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}
