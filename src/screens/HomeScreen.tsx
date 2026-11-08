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
  IconLencana,
  IconMenguap,
  IconPanas,
  IconSiklus,
  IconStar,
} from '../components/ui/Icons'
import { DAFTAR_LENCANA } from '../data/badges'
import type { Progress } from '../types'
import s from './HomeScreen.module.css'

const LANGKAH = [
  {
    ikon: <IconEs size={24} />,
    judul: 'Pilih benda',
    teks: 'Es batu, air, lilin, uap air, kapur barus, atau air di panci.',
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
  onSortir: () => void
  onKuis: () => void
  onLencana: () => void
  onUntungRugi: () => void
  onSiklus: () => void
}

function bintangTeks(n: number): string {
  return n > 0 ? `${n} bintang` : 'belum dimainkan'
}

export function HomeScreen({
  progress,
  onMulai,
  onSortir,
  onKuis,
  onLencana,
  onUntungRugi,
  onSiklus,
}: Props) {
  const totalLencana = DAFTAR_LENCANA.length

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
              sub="6 proses - panas dan dingin"
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

      <Panel
        stiker="Ayo main"
        judul="Mode belajar"
        ikon={<IconStar size={22} />}
        aksi={<span className={s.modeJumlah}>6 mode terbuka</span>}
      >
        <div className={s.modeDaftar}>
          <button type="button" className={`${s.modeKartu} ${s.modePanas}`} onClick={onMulai}>
            <span className={s.modeIkon} aria-hidden="true">
              <IconFlask size={26} />
            </span>
            <span className={s.modeTeks}>
              <span className={s.modeNama}>Eksperimen Bebas</span>
              <span className={s.modeKet}>
                Temukan 6 jenis perubahan wujud lewat eksperimen panas dan dingin.
              </span>
            </span>
            <span className={s.modeMeta}>{progress.catatan.length} catatan</span>
          </button>

          <button type="button" className={`${s.modeKartu} ${s.modePadat}`} onClick={onSortir}>
            <span className={s.modeIkon} aria-hidden="true">
              <IconBasket size={26} />
            </span>
            <span className={s.modeTeks}>
              <span className={s.modeNama}>Sortir Benda</span>
              <span className={s.modeKet}>
                Sortir 10 benda ke keranjang padat, cair, atau gas.
              </span>
            </span>
            <span className={s.modeMeta}>{bintangTeks(progress.sortir.bintang)}</span>
          </button>

          <button type="button" className={`${s.modeKartu} ${s.modeBintang}`} onClick={onKuis}>
            <span className={s.modeIkon} aria-hidden="true">
              <IconStar size={26} />
            </span>
            <span className={s.modeTeks}>
              <span className={s.modeNama}>Kuis Bintang</span>
              <span className={s.modeKet}>Jawab 10 soal acak dan kumpulkan sampai tiga bintang.</span>
            </span>
            <span className={s.modeMeta}>{bintangTeks(progress.kuis.bintang)}</span>
          </button>

          <button type="button" className={`${s.modeKartu} ${s.modeLencana}`} onClick={onLencana}>
            <span className={s.modeIkon} aria-hidden="true">
              <IconLencana size={26} />
            </span>
            <span className={s.modeTeks}>
              <span className={s.modeNama}>Lemari Lencana</span>
              <span className={s.modeKet}>
                Lihat lencana yang sudah terbuka dan cara membuka sisanya.
              </span>
            </span>
            <span className={s.modeMeta}>
              {progress.lencana.length} dari {totalLencana}
            </span>
          </button>

          <button type="button" className={`${s.modeKartu} ${s.modeHijau}`} onClick={onUntungRugi}>
            <span className={s.modeIkon} aria-hidden="true">
              <IconMenguap size={26} />
            </span>
            <span className={s.modeTeks}>
              <span className={s.modeNama}>Wujud di Sekitar Kita</span>
              <span className={s.modeKet}>
                Perubahan wujud yang menguntungkan dan merugikan dalam kehidupan.
              </span>
            </span>
            <span className={s.modeMeta}>10 contoh</span>
          </button>

          <button type="button" className={`${s.modeKartu} ${s.modePadat}`} onClick={onSiklus}>
            <span className={s.modeIkon} aria-hidden="true">
              <IconSiklus size={26} />
            </span>
            <span className={s.modeTeks}>
              <span className={s.modeNama}>Siklus Air</span>
              <span className={s.modeKet}>
                Ikuti perjalanan air dari laut ke awan, hujan, dan kembali lagi.
              </span>
            </span>
            <span className={s.modeMeta}>{progress.siklus.selesai ? 'selesai' : 'belum'}</span>
          </button>
        </div>
      </Panel>

      <div className={s.bawah}>
        <NoteBook catatan={progress.catatan} batas={4} />

        <Panel
          stiker="Progresmu"
          judul="Yang sudah kamu kumpulkan"
          ikon={<IconLencana size={22} />}
        >
          <ul className={s.statDaftar}>
            <li className={s.statBaris}>
              <span className={s.statIkon} aria-hidden="true">
                <IconBuku size={20} />
              </span>
              <span className={s.statTeks}>Catatan ilmuwan</span>
              <strong className={s.statNilai}>{progress.catatan.length}</strong>
            </li>
            <li className={s.statBaris}>
              <span className={s.statIkon} aria-hidden="true">
                <IconLencana size={20} />
              </span>
              <span className={s.statTeks}>Lencana terbuka</span>
              <strong className={s.statNilai}>
                {progress.lencana.length}/{totalLencana}
              </strong>
            </li>
            <li className={s.statBaris}>
              <span className={s.statIkon} aria-hidden="true">
                <IconStar size={20} />
              </span>
              <span className={s.statTeks}>Kuis terbaik</span>
              <strong className={s.statNilai}>
                {progress.kuis.bintang > 0 ? `${progress.kuis.bintang}/3` : '—'}
              </strong>
            </li>
            <li className={s.statBaris}>
              <span className={s.statIkon} aria-hidden="true">
                <IconBasket size={20} />
              </span>
              <span className={s.statTeks}>Sortir terbaik</span>
              <strong className={s.statNilai}>
                {progress.sortir.bintang > 0 ? `${progress.sortir.bintang}/3` : '—'}
              </strong>
            </li>
          </ul>
          <button type="button" className={s.lihatLencana} onClick={onLencana}>
            Lihat semua lencana
          </button>
        </Panel>
      </div>
    </div>
  )
}
