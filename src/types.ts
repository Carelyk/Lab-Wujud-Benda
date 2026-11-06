export type Wujud = 'padat' | 'cair' | 'gas'

export type NamaProses =
  | 'mencair'
  | 'membeku'
  | 'menguap'
  | 'mendidih'
  | 'mengembun'

export type Arah = 'panas' | 'dingin'

export type ScreenId = 'beranda' | 'eksperimen' | 'sortir' | 'kuis' | 'lencana' | 'siklus'

export type BendaId = 'es' | 'air' | 'lilin' | 'kapur-barus' | 'panci'

/** One temperature band of a benda. `mulai` is the lowest °C of the band. */
export interface Fase {
  mulai: number
  wujud: Wujud
}

export interface Prediksi {
  pertanyaan: string
  /** Wujud after the first change when the benda is heated. */
  benar: Wujud
}

export interface Benda {
  id: BendaId
  nama: string
  emoji: string
  /** One short kid-friendly line, shown by the mascot. */
  keterangan: string
  /** Realistic starting temperature in °C. */
  suhuAwal: number
  suhuMin: number
  suhuMaks: number
  /** Ascending by `mulai`. The first band is the coldest one. */
  fase: Fase[]
  /**
   * Liquid-to-gas stages, used by water-based benda only.
   * `tipis` = thin steam starts (menguap perlahan), `didih` = boiling (mendidih).
   */
  uap?: { tipis: number; didih: number }
  prediksi: Prediksi
  /**
   * true = a number or sentence should be checked against the grade-4 IPAS
   * book before classroom use. Collected in README ("Perlu diverifikasi").
   */
  perluVerifikasi?: boolean
}

export interface Perubahan {
  dariWujud: Wujud
  keWujud: Wujud
  proses: NamaProses | null
  arah: Arah | null
}

export interface CatatanEntry {
  id: string
  bendaId: BendaId
  proses: NamaProses
  arah: Arah
  teks: string
  waktu: number
}

export interface HasilPrediksi {
  jawaban: Wujud
  tepat: boolean
  waktu: number
}

export interface Progress {
  catatan: CatatanEntry[]
  prediksi: Partial<Record<BendaId, HasilPrediksi>>
  lencana: string[]
  suaraMati: boolean
  kuis: { bintang: number; benar: number; total: number; main: number }
  sortir: {
    selesai: boolean
    benar: number
    total: number
    bintang: number
    salah: number
    main: number
  }
  partikel: { dilihat: Wujud[] }
  siklus: { selesai: boolean }
}

/** One benda in the sorting game. */
export interface ItemSortir {
  id: string
  nama: string
  wujud: Wujud
  /** Shown after a correct answer: why this wujud is right. */
  alasan: string
  /** Shown after a wrong answer: a hint, not a scolding. */
  petunjuk: string
  tantangan?: boolean
  perluVerifikasi: boolean
}

export interface OpsiKuis {
  teks: string
  benar: boolean
}

export interface SoalKuis {
  id: string
  pertanyaan: string
  opsi: OpsiKuis[]
  /** Read after answering: why the correct option is correct. */
  penjelasan: string
  perluVerifikasi: boolean
}

export type JenisLencana =
  | 'beku'
  | 'uap'
  | 'leleh'
  | 'sortir'
  | 'kuis'
  | 'buku'
  | 'lens'
  | 'siklus'

export interface Lencana {
  id: string
  nama: string
  /** How to earn it, written for a child. */
  cara: string
  jenis: JenisLencana
}
