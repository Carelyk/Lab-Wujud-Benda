export type Wujud = 'padat' | 'cair' | 'gas'

export type NamaProses =
  | 'mencair'
  | 'membeku'
  | 'menguap'
  | 'mendidih'
  | 'mengembun'

export type Arah = 'panas' | 'dingin'

export type ScreenId = 'beranda' | 'eksperimen'

export type BendaId = 'es' | 'air' | 'lilin' | 'cokelat' | 'panci'

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
  kuis: { bintang: number; benar: number; total: number }
  sortir: { selesai: boolean; benar: number; total: number }
}
