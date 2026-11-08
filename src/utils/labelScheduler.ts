import type { Arah, NamaProses } from '../types'
import { DURASI_LABEL_MIN_MS, FADE_LABEL_MS, JEDA_LABEL_MS } from '../data/tempo'

export interface LabelTerjadwal {
  proses: NamaProses
  arah: Arah
}

interface Opsi {
  onTampil: (label: LabelTerjadwal) => void
  onSelesai: (label: LabelTerjadwal) => void
}

/**
 * Menampilkan satu label demi satu. Catatan ilmuwan tetap dibuat pemanggil
 * segera saat ambang terlewati; modul ini hanya mengatur tampilan, komentar,
 * dan suara agar anak sempat melihat perubahan bendanya lebih dulu.
 */
export class LabelScheduler {
  private readonly opsi: Opsi
  private antrian: LabelTerjadwal[] = []
  private tertunda: LabelTerjadwal | null = null
  private tampil: LabelTerjadwal | null = null
  private timerMuncul: ReturnType<typeof setTimeout> | null = null
  private timerSelesai: ReturnType<typeof setTimeout> | null = null
  private timerFade: ReturnType<typeof setTimeout> | null = null

  constructor(opsi: Opsi) {
    this.opsi = opsi
  }

  antrikan(label: LabelTerjadwal): void {
    if (!this.tertunda && !this.tampil) {
      this.mulaiTunda(label)
      return
    }
    this.antrian.push(label)
  }

  /** Hanya label yang belum muncul boleh dibatalkan saat arah dibalik. */
  batalkanArah(arah: Arah): void {
    if (this.tertunda?.arah === arah) {
      this.hapusTimer('timerMuncul')
      this.tertunda = null
    }
    this.antrian = this.antrian.filter((label) => label.arah !== arah)
  }

  reset(): void {
    this.hapusTimer('timerMuncul')
    this.hapusTimer('timerSelesai')
    this.hapusTimer('timerFade')
    if (this.tampil) this.opsi.onSelesai(this.tampil)
    this.tertunda = null
    this.tampil = null
    this.antrian = []
  }

  dispose(): void {
    this.reset()
  }

  private mulaiTunda(label: LabelTerjadwal): void {
    this.tertunda = label
    this.timerMuncul = setTimeout(() => {
      this.timerMuncul = null
      if (this.tertunda !== label) return
      this.tertunda = null
      this.tampil = label
      this.opsi.onTampil(label)
      this.timerSelesai = setTimeout(() => this.mulaiSelesai(label), DURASI_LABEL_MIN_MS)
    }, JEDA_LABEL_MS)
  }

  private mulaiSelesai(label: LabelTerjadwal): void {
    this.timerSelesai = null
    if (this.tampil !== label) return
    this.opsi.onSelesai(label)
    this.tampil = null
    this.timerFade = setTimeout(() => {
      this.timerFade = null
      const berikut = this.antrian.shift()
      if (berikut) this.mulaiTunda(berikut)
    }, FADE_LABEL_MS)
  }

  private hapusTimer(nama: 'timerMuncul' | 'timerSelesai' | 'timerFade'): void {
    const timer = this[nama]
    if (timer !== null) clearTimeout(timer)
    this[nama] = null
  }
}
