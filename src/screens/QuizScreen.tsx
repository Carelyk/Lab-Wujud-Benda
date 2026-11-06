import { useState } from 'react'
import { Bubble, Mascot } from '../components/mascot/Mascot'
import type { MoodTetes } from '../components/mascot/Mascot'
import { BigButton } from '../components/ui/BigButton'
import { Panel } from '../components/ui/Panel'
import {
  IconCentang,
  IconKembali,
  IconSilang,
  IconStar,
  IconUlang,
} from '../components/ui/Icons'
import { AMBANG_KUIS } from '../data/quiz'
import type { Progress } from '../types'
import { bintangKuis, siapkanKuis } from '../utils/kuis'
import { mainkan } from '../utils/sound'
import s from './QuizScreen.module.css'

export interface HasilKuisLayar {
  benar: number
  total: number
  bintang: number
}

interface Props {
  progress: Progress
  onSimpan: (hasil: HasilKuisLayar) => void
  onBeranda: () => void
}

/**
 * Kuis Bintang.
 *
 * Question order and option order are both shuffled by `siapkanKuis`, so a
 * second run never looks the same. Every answer shows why the correct option
 * is correct, not just whether the child was right.
 */
export function QuizScreen({ progress, onSimpan, onBeranda }: Props) {
  const [soal, setSoal] = useState(() => siapkanKuis())
  const [indeks, setIndeks] = useState(0)
  const [dipilih, setDipilih] = useState<number | null>(null)
  const [benar, setBenar] = useState(0)
  const [selesai, setSelesai] = useState(false)
  const [bintang, setBintang] = useState<1 | 2 | 3>(1)

  const kini = soal[indeks]
  const terjawab = dipilih !== null
  const tepat = terjawab ? (kini?.opsi[dipilih]?.benar ?? false) : false

  const jawab = (i: number) => {
    if (!kini || terjawab) return
    const hasil = kini.opsi[i]?.benar === true
    setDipilih(i)
    if (hasil) {
      setBenar((n) => n + 1)
      void mainkan('tring')
    } else {
      void mainkan('salah')
    }
  }

  const lanjut = () => {
    if (indeks + 1 < soal.length) {
      setIndeks((i) => i + 1)
      setDipilih(null)
      return
    }

    const hasil = bintangKuis(benar, soal.length)
    setBintang(hasil)
    setSelesai(true)
    void mainkan('ding')
    onSimpan({ benar, total: soal.length, bintang: hasil })
  }

  const ulang = () => {
    setSoal(siapkanKuis())
    setIndeks(0)
    setDipilih(null)
    setBenar(0)
    setSelesai(false)
    setBintang(1)
    void mainkan('klik')
  }

  const mood: MoodTetes = selesai ? 'senang' : terjawab ? (tepat ? 'senang' : 'bingung') : 'semangat'

  return (
    <div className={s.layar}>
      <section className={s.intro}>
        <div className={s.introTeks}>
          <span className={s.pita}>Tahap 2 · Kuis</span>
          <h1 className={s.judul}>Kuis Bintang</h1>
          <p className={s.sub}>
            {soal.length} soal tentang wujud benda. Urutan soal dan pilihan jawaban diacak setiap
            kali kamu bermain.
          </p>
          <p className={s.rekor}>
            Rekor terbaikmu:{' '}
            <strong>
              {progress.kuis.bintang > 0 ? `${progress.kuis.bintang} bintang` : 'belum ada'}
            </strong>
            {progress.kuis.main > 0 ? ` · sudah ${progress.kuis.main} kali bermain` : ''}
          </p>
          <p className={s.kecil}>
            Tiga bintang jika benar {AMBANG_KUIS.tiga} dari {soal.length} soal. Dua bintang jika
            benar {AMBANG_KUIS.dua} soal.
          </p>
        </div>
        <div className={s.introTetes}>
          <Mascot mood={mood} size={132} />
          <Bubble>
            {selesai
              ? 'Selesai! Lihat bintangmu, ya.'
              : terjawab
                ? tepat
                  ? 'Tepat sekali!'
                  : 'Belum tepat. Baca penjelasannya dulu.'
                : 'Baca soalnya pelan-pelan. Kamu pasti bisa!'}
          </Bubble>
        </div>
      </section>

      {selesai ? (
        <Panel
          stiker="Hasil"
          judul="Kuis selesai"
          ikon={<IconStar size={22} />}
          aksi={<span className={s.hitung}>{benar} dari {soal.length} benar</span>}
        >
          <div className={s.hasil}>
            <Mascot mood="senang" size={150} />
            <div className={s.hasilTeks}>
              <p className={s.bintangBaris} aria-label={`${bintang} dari 3 bintang`}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={n <= bintang ? s.bintangIsi : s.bintangKosong}>
                    <IconStar size={40} />
                  </span>
                ))}
                <span className={s.skor}>{bintang} dari 3 bintang</span>
              </p>
              <p className={s.hasilIsi}>
                {benar === soal.length
                  ? 'Semua benar! Kamu sudah paham ciri dan perubahan wujud benda.'
                  : benar >= AMBANG_KUIS.tiga
                    ? 'Hebat! Hampir semua benar. Coba sekali lagi untuk menjawab semuanya benar.'
                    : 'Bagus sudah mencoba. Baca lagi penjelasan tiap soal, lalu main lagi.'}
              </p>
              <p className={s.kecil}>
                Rekor tersimpan otomatis. Hasil yang lebih rendah tidak menghapus rekor terbaikmu.
              </p>
              <div className={s.aksiBaris}>
                <BigButton ikon={<IconUlang size={22} />} onClick={ulang} sub="soal diacak lagi">
                  Main lagi
                </BigButton>
                <BigButton ikon={<IconKembali size={22} />} onClick={onBeranda} nada="netral">
                  Beranda
                </BigButton>
              </div>
            </div>
          </div>
        </Panel>
      ) : kini ? (
        <Panel
          stiker={`Soal ${indeks + 1} dari ${soal.length}`}
          judul="Pilih satu jawaban"
          ikon={<IconStar size={22} />}
          aksi={<span className={s.hitung}>{benar} benar</span>}
        >
          <p className={s.pertanyaan}>{kini.pertanyaan}</p>

          <div className={s.opsi} role="group" aria-label="Pilihan jawaban">
            {kini.opsi.map((o, i) => {
              const kunci = terjawab && o.benar
              const salahPilih = terjawab && dipilih === i && !o.benar
              const kelas = [
                s.opsiTombol,
                kunci ? s.opsiBenar : '',
                salahPilih ? s.opsiSalah : '',
                dipilih === i ? s.opsiDipilih : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <button
                  key={o.teks}
                  type="button"
                  className={kelas}
                  onClick={() => jawab(i)}
                  disabled={terjawab}
                  aria-pressed={dipilih === i}
                >
                  <span className={s.huruf} aria-hidden="true">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={s.opsiTeks}>{o.teks}</span>
                  {kunci ? (
                    <span className={s.tanda} aria-hidden="true">
                      <IconCentang size={22} />
                    </span>
                  ) : null}
                  {salahPilih ? (
                    <span className={s.tanda} aria-hidden="true">
                      <IconSilang size={22} />
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>

          {terjawab ? (
            <div
              className={`${s.penjelasan} ${tepat ? s.penjelasanBenar : s.penjelasanSalah}`}
              role="status"
              aria-live="polite"
            >
              <strong className={s.penjelasanJudul}>
                {tepat ? 'Benar!' : 'Belum tepat.'}
              </strong>
              <p className={s.penjelasanIsi}>{kini.penjelasan}</p>
              <div className={s.lanjutBaris}>
                <BigButton
                  nada={tepat ? 'benar' : 'netral'}
                  onClick={lanjut}
                  labelAria={
                    indeks + 1 < soal.length ? 'Lanjut ke soal berikutnya' : 'Lihat hasil kuis'
                  }
                >
                  {indeks + 1 < soal.length ? 'Soal berikutnya' : 'Lihat hasil'}
                </BigButton>
              </div>
            </div>
          ) : (
            <p className={s.bantuan}>
              Pilih satu jawaban. Penjelasan muncul setelah kamu menjawab.
            </p>
          )}
        </Panel>
      ) : null}
    </div>
  )
}
