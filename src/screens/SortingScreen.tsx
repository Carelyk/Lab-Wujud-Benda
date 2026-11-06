import { useCallback, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { Bubble, Mascot } from '../components/mascot/Mascot'
import type { MoodTetes } from '../components/mascot/Mascot'
import { SortingArt } from '../components/sorting/SortingArt'
import { BigButton } from '../components/ui/BigButton'
import { Panel } from '../components/ui/Panel'
import { StateBadge } from '../components/ui/StateBadge'
import {
  IconBasket,
  IconCentang,
  IconKembali,
  IconSilang,
  IconStar,
  IconUlang,
} from '../components/ui/Icons'
import { LABEL_WUJUD } from '../data/labels'
import { ITEM_TANTANGAN, ITEM_UTAMA } from '../data/sortingItems'
import type { ItemSortir, Wujud } from '../types'
import { acak } from '../utils/acak'
import { bintangSortir, itemSeringSalah } from '../utils/sortir'
import { mainkan } from '../utils/sound'
import s from './SortingScreen.module.css'

const PILIHAN: Wujud[] = ['padat', 'cair', 'gas']

interface Umpan {
  tepat: boolean
  judul: string
  teks: string
  /** False for a wrong answer on a main item: the child retries the same item. */
  bolehLanjut: boolean
}

export interface HasilSortirLayar {
  total: number
  benar: number
  salah: number
  bintang: number
}

interface Props {
  onSimpan: (hasil: HasilSortirLayar) => void
  onBeranda: () => void
}

type Ronde = 'utama' | 'tantangan'

/**
 * Sortir Benda.
 *
 * Three ways to place an item, all on the same code path:
 *   1. Drag the card onto a basket (Pointer Events).
 *   2. Tap the card, then tap a basket.
 *   3. Keyboard: Enter on the card selects it, then Enter on a basket.
 *
 * A wrong answer on a main item returns the item with a hint. A wrong answer
 * on a Tantangan item shows the correct answer plus the reason, because those
 * five cases are the ones children argue about.
 */
export function SortingScreen({ onSimpan, onBeranda }: Props) {
  const [ronde, setRonde] = useState<Ronde>('utama')
  const [antrian, setAntrian] = useState<ItemSortir[]>(() => acak(ITEM_UTAMA))
  const [indeks, setIndeks] = useState(0)
  const [totalSalah, setTotalSalah] = useState(0)
  const [salahPer, setSalahPer] = useState<Record<string, number>>({})
  const [umpan, setUmpan] = useState<Umpan | null>(null)
  const [dipilih, setDipilih] = useState<string | null>(null)
  const [selesai, setSelesai] = useState(false)
  const [bintang, setBintang] = useState<1 | 2 | 3>(1)
  const [hantu, setHantu] = useState<{ x: number; y: number } | null>(null)
  const [hover, setHover] = useState<Wujud | null>(null)

  const seret = useRef<{ x0: number; y0: number; bergerak: boolean } | null>(null)
  const abaikanKlik = useRef(0)

  const item = antrian[indeks]
  const termudah = itemSeringSalah(salahPer, ronde === 'utama' ? ITEM_UTAMA : ITEM_TANTANGAN)

  const mulaiRonde = useCallback((baru: Ronde) => {
    setRonde(baru)
    setAntrian(acak(baru === 'utama' ? ITEM_UTAMA : ITEM_TANTANGAN))
    setIndeks(0)
    setTotalSalah(0)
    setSalahPer({})
    setUmpan(null)
    setDipilih(null)
    setSelesai(false)
    setBintang(1)
  }, [])

  const jawab = (w: Wujud) => {
    if (!item || selesai || umpan) return
    setDipilih(null)

    if (w === item.wujud) {
      void mainkan('tring')
      setUmpan({
        tepat: true,
        judul: `Benar! ${item.nama} masuk keranjang ${LABEL_WUJUD[item.wujud].toLowerCase()}.`,
        teks: item.alasan,
        bolehLanjut: true,
      })
      return
    }

    void mainkan('salah')
    setTotalSalah((n) => n + 1)
    setSalahPer((p) => ({ ...p, [item.id]: (p[item.id] ?? 0) + 1 }))

    if (item.tantangan) {
      setUmpan({
        tepat: false,
        judul: `Belum tepat. ${item.nama} sebenarnya ${LABEL_WUJUD[item.wujud].toLowerCase()}.`,
        teks: item.alasan,
        bolehLanjut: true,
      })
      return
    }

    setUmpan({
      tepat: false,
      judul: 'Belum tepat. Benda ini kembali ke meja.',
      teks: item.petunjuk,
      bolehLanjut: false,
    })
  }

  const lanjut = () => {
    if (!umpan) return
    if (!umpan.bolehLanjut) {
      setUmpan(null)
      return
    }

    if (indeks + 1 < antrian.length) {
      setIndeks((i) => i + 1)
      setUmpan(null)
      return
    }

    const hasil = bintangSortir(antrian.length, totalSalah)
    setBintang(hasil)
    setSelesai(true)
    setUmpan(null)
    void mainkan('ding')

    if (ronde === 'utama') {
      onSimpan({
        total: antrian.length,
        benar: antrian.length,
        salah: totalSalah,
        bintang: hasil,
      })
    }
  }

  const saatTurun = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (selesai || umpan) return
    e.currentTarget.setPointerCapture(e.pointerId)
    seret.current = { x0: e.clientX, y0: e.clientY, bergerak: false }
  }

  const saatGerak = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = seret.current
    if (!d) return
    if (!d.bergerak && Math.hypot(e.clientX - d.x0, e.clientY - d.y0) > 8) {
      d.bergerak = true
    }
    if (!d.bergerak) return

    setHantu({ x: e.clientX, y: e.clientY })
    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-wujud]')
    const w = el?.getAttribute('data-wujud')
    setHover(w === 'padat' || w === 'cair' || w === 'gas' ? w : null)
  }

  const saatNaik = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = seret.current
    seret.current = null
    setHantu(null)
    setHover(null)
    if (!d || !d.bergerak) return

    // A real drag must not also count as a tap/select.
    abaikanKlik.current = Date.now()
    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-wujud]')
    const w = el?.getAttribute('data-wujud')
    if (w === 'padat' || w === 'cair' || w === 'gas') jawab(w)
  }

  const saatBatal = () => {
    seret.current = null
    setHantu(null)
    setHover(null)
  }

  const pilihKartu = () => {
    if (selesai || umpan) return
    if (Date.now() - abaikanKlik.current < 400) return
    setDipilih((p) => (p === item?.id ? null : (item?.id ?? null)))
    void mainkan('klik')
  }

  const mood: MoodTetes = umpan ? (umpan.tepat ? 'senang' : 'bingung') : 'semangat'

  return (
    <div className={s.layar}>
      <section className={s.intro}>
        <div className={s.introTeks}>
          <span className={s.pita}>{ronde === 'utama' ? 'Tahap 2 · Sortir' : 'Tantangan Sortir'}</span>
          <h1 className={s.judul}>Sortir Benda</h1>
          <p className={s.sub}>
            {ronde === 'utama'
              ? 'Tarik benda ke keranjang yang tepat. Bisa juga ketuk benda dulu, lalu ketuk keranjangnya.'
              : 'Lima benda ini sering bikin bingung. Coba pikirkan baik-baik dulu, ya.'}
          </p>
          {ronde === 'utama' ? (
            <p className={s.kecil}>
              12 benda · keranjang padat, cair, gas · keranjang gas lebih sedikit karena gas paling
              sulit dilihat.
            </p>
          ) : (
            <p className={s.kecil}>
              Tantangan tidak menambah bintang. Bintangmu sudah tersimpan dari ronde utama.
            </p>
          )}
        </div>
        <div className={s.introTetes}>
          <Mascot mood={mood} size={132} />
          <Bubble>
            {umpan
              ? umpan.tepat
                ? 'Tepat sekali!'
                : 'Belum tepat. Baca petunjukku, ya.'
              : dipilih
                ? 'Sekarang ketuk keranjang yang kamu pilih.'
                : 'Benda ini masuk keranjang mana?'}
          </Bubble>
        </div>
      </section>

      {selesai ? (
        <Ringkasan
          ronde={ronde}
          bintang={bintang}
          total={antrian.length}
          salah={totalSalah}
          tersulit={termudah}
          onUlang={() => mulaiRonde(ronde)}
          onTantangan={() => mulaiRonde('tantangan')}
          onBeranda={onBeranda}
        />
      ) : item ? (
        <div className={s.papan}>
          <Panel
            stiker={`Benda ${indeks + 1} dari ${antrian.length}`}
            judul={ronde === 'utama' ? 'Keranjang mana?' : 'Tantangan'}
            ikon={<IconBasket size={22} />}
            aksi={<span className={s.hitung}>{totalSalah} kali belum tepat</span>}
          >
            <div className={s.area}>
              <button
                type="button"
                className={`${s.kartu} ${dipilih === item.id ? s.kartuDipilih : ''} ${
                  hantu ? s.kartuDiangkat : ''
                }`}
                onClick={pilihKartu}
                onPointerDown={saatTurun}
                onPointerMove={saatGerak}
                onPointerUp={saatNaik}
                onPointerCancel={saatBatal}
                aria-pressed={dipilih === item.id}
                aria-label={`${item.nama}. Ketuk untuk memilih, lalu ketuk keranjang.`}
              >
                <span className={s.gambar}>
                  <SortingArt id={item.id} />
                </span>
                <span className={s.nama}>{item.nama}</span>
                {item.tantangan ? <span className={s.tandaTantangan}>Tantangan</span> : null}
              </button>

              <div className={s.keranjangBaris} role="group" aria-label="Pilih keranjang wujud">
                {PILIHAN.map((w) => (
                  <button
                    key={w}
                    type="button"
                    className={`${s.keranjang} ${s[w]} ${hover === w ? s.keranjangHover : ''} ${
                      dipilih ? s.keranjangSiap : ''
                    }`}
                    data-wujud={w}
                    onClick={() => jawab(w)}
                  >
                    <span className={s.keranjangLabel}>{LABEL_WUJUD[w]}</span>
                    <StateBadge wujud={w} kecil />
                  </button>
                ))}
              </div>
            </div>
          </Panel>

          {umpan ? (
            <div
              className={`${s.umpan} ${umpan.tepat ? s.umpanBenar : s.umpanSalah}`}
              role="status"
              aria-live="polite"
            >
              <span className={s.umpanIkon} aria-hidden="true">
                {umpan.tepat ? <IconCentang size={24} /> : <IconSilang size={24} />}
              </span>
              <div className={s.umpanTeks}>
                <strong className={s.umpanJudul}>{umpan.judul}</strong>
                <p className={s.umpanIsi}>{umpan.teks}</p>
              </div>
              <div className={s.umpanAksi}>
                <BigButton
                  nada={umpan.bolehLanjut ? 'benar' : 'netral'}
                  onClick={lanjut}
                  labelAria={umpan.bolehLanjut ? 'Lanjut ke benda berikutnya' : 'Coba lagi benda ini'}
                >
                  {umpan.bolehLanjut ? 'Lanjut' : 'Coba lagi'}
                </BigButton>
              </div>
            </div>
          ) : (
            <p className={s.bantuan}>
              Tarik benda ke keranjang, atau ketuk benda lalu ketuk keranjang. Dengan papan tombol:
              tekan Enter pada benda, lalu Enter pada keranjang.
            </p>
          )}
        </div>
      ) : null}

      {hantu && item ? (
        <div className={s.hantu} style={{ left: hantu.x, top: hantu.y }} aria-hidden="true">
          <SortingArt id={item.id} />
        </div>
      ) : null}
    </div>
  )
}

interface RingkasanProps {
  ronde: Ronde
  bintang: 1 | 2 | 3
  total: number
  salah: number
  tersulit: ItemSortir[]
  onUlang: () => void
  onTantangan: () => void
  onBeranda: () => void
}

function Ringkasan({
  ronde,
  bintang,
  total,
  salah,
  tersulit,
  onUlang,
  onTantangan,
  onBeranda,
}: RingkasanProps) {
  return (
    <Panel
      stiker="Selesai"
      judul={ronde === 'utama' ? 'Semua benda sudah disortir' : 'Tantangan selesai'}
      ikon={<IconStar size={22} />}
    >
      <div className={s.ringkasan}>
        <Mascot mood="senang" size={150} />
        <div className={s.ringkasanTeks}>
          <p className={s.bintangBaris} aria-label={`${bintang} dari 3 bintang`}>
            {[1, 2, 3].map((n) => (
              <span key={n} className={n <= bintang ? s.bintangIsi : s.bintangKosong}>
                <IconStar size={38} />
              </span>
            ))}
            <span className={s.skor}>
              {bintang} dari 3 bintang · {total} benda
            </span>
          </p>
          <p className={s.ringkasanIsi}>
            {salah === 0
              ? 'Sempurna! Tidak ada satu pun yang salah.'
              : `Ada ${salah} percobaan yang belum tepat. Tidak apa-apa, itu bagian dari belajar.`}
          </p>

          {tersulit.length > 0 ? (
            <div className={s.tersulit}>
              <p className={s.tersulitJudul}>Paling sering keliru:</p>
              <ul className={s.tersulitDaftar}>
                {tersulit.slice(0, 3).map((i) => (
                  <li key={i.id} className={s.tersulitItem}>
                    <span className={s.tersulitGambar}>
                      <SortingArt id={i.id} />
                    </span>
                    <span>
                      <strong>{i.nama}</strong> memang {LABEL_WUJUD[i.wujud].toLowerCase()}. {i.alasan}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className={s.ringkasanAksi}>
            <BigButton ikon={<IconUlang size={22} />} onClick={onUlang} sub="acak ulang urutannya">
              Main lagi
            </BigButton>
            {ronde === 'utama' ? (
              <BigButton ikon={<IconBasket size={22} />} onClick={onTantangan} sub="5 benda pengecoh">
                Coba Tantangan
              </BigButton>
            ) : null}
            <BigButton ikon={<IconKembali size={22} />} onClick={onBeranda} nada="netral">
              Beranda
            </BigButton>
          </div>
        </div>
      </div>
    </Panel>
  )
}
