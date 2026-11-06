import type {
  Arah,
  BendaId,
  CatatanEntry,
  NamaProses,
  Progress,
  Wujud,
} from '../types'

/**
 * The only module that touches localStorage.
 *
 * Every method is async on purpose: swapping the body for Supabase later
 * (same function names, same arguments) will not touch a single component.
 *
 * English names used by the brief map to these methods:
 *   getProgress   -> ambil()
 *   unlockBadge   -> bukaLencana()
 *   getQuizBest   -> kuisTerbaik()
 *   saveQuiz      -> simpanKuis()
 *   saveSorting   -> simpanSortir()
 */
const KUNCI = 'lwb:v1'
const MAKS_CATATAN = 24
const WUJUD: Wujud[] = ['padat', 'cair', 'gas']

export const progressAwal: Progress = {
  catatan: [],
  prediksi: {},
  lencana: [],
  suaraMati: false,
  kuis: { bintang: 0, benar: 0, total: 0, main: 0 },
  sortir: {
    selesai: false,
    benar: 0,
    total: 0,
    bintang: 0,
    salah: 0,
    main: 0,
  },
  partikel: { dilihat: [] },
  siklus: { selesai: false },
}

function salinanAwal(): Progress {
  return {
    ...progressAwal,
    catatan: [],
    prediksi: {},
    lencana: [],
    kuis: { ...progressAwal.kuis },
    sortir: { ...progressAwal.sortir },
    partikel: { dilihat: [] },
    siklus: { ...progressAwal.siklus },
  }
}

function baca(): Progress {
  if (typeof localStorage === 'undefined') return salinanAwal()
  try {
    const mentah = localStorage.getItem(KUNCI)
    if (!mentah) return salinanAwal()
    const data = JSON.parse(mentah) as Partial<Progress>
    return {
      ...salinanAwal(),
      ...data,
      catatan: Array.isArray(data.catatan) ? data.catatan : [],
      prediksi: data.prediksi ?? {},
      lencana: Array.isArray(data.lencana) ? data.lencana : [],
      kuis: { ...progressAwal.kuis, ...(data.kuis ?? {}) },
      sortir: { ...progressAwal.sortir, ...(data.sortir ?? {}) },
      partikel: {
        dilihat: Array.isArray(data.partikel?.dilihat)
          ? data.partikel.dilihat.filter((w): w is Wujud => WUJUD.includes(w))
          : [],
      },
      siklus: { selesai: data.siklus?.selesai === true },
    }
  } catch {
    // private mode, corrupt JSON, storage disabled: start clean, never crash
    return salinanAwal()
  }
}

function tulis(p: Progress): Progress {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(p))
    } catch {
      /* quota or private mode: keep the in-memory state */
    }
  }
  return p
}

export const penyimpanan = {
  async ambil(): Promise<Progress> {
    return baca()
  },

  async tambahCatatan(entry: {
    bendaId: BendaId
    proses: NamaProses
    arah: Arah
    teks: string
  }): Promise<Progress> {
    const p = baca()
    const sudahAda = p.catatan.some(
      (c) => c.bendaId === entry.bendaId && c.proses === entry.proses && c.arah === entry.arah,
    )
    if (sudahAda) return p

    const baru: CatatanEntry = {
      ...entry,
      id: `${entry.bendaId}-${entry.proses}-${entry.arah}-${Date.now()}`,
      waktu: Date.now(),
    }
    return tulis({ ...p, catatan: [baru, ...p.catatan].slice(0, MAKS_CATATAN) })
  },

  async simpanPrediksi(
    bendaId: BendaId,
    jawaban: Wujud,
    tepat: boolean,
  ): Promise<Progress> {
    const p = baca()
    return tulis({
      ...p,
      prediksi: { ...p.prediksi, [bendaId]: { jawaban, tepat, waktu: Date.now() } },
    })
  },

  /** Saves one finished sorting round and keeps the best result. */
  async simpanSortir(hasil: {
    total: number
    benar: number
    salah: number
    bintang: number
  }): Promise<Progress> {
    const p = baca()
    const tuntas = hasil.total > 0 && hasil.benar >= hasil.total
    return tulis({
      ...p,
      sortir: {
        selesai: p.sortir.selesai || tuntas,
        benar: Math.max(p.sortir.benar, hasil.benar),
        total: Math.max(p.sortir.total, hasil.total),
        bintang: Math.max(p.sortir.bintang, hasil.bintang),
        salah: hasil.salah,
        main: p.sortir.main + 1,
      },
    })
  },

  /** Best quiz result only: a worse run never erases a better one. */
  async simpanKuis(hasil: {
    benar: number
    total: number
    bintang: number
  }): Promise<Progress> {
    const p = baca()
    const lebihBaik =
      hasil.bintang > p.kuis.bintang ||
      (hasil.bintang === p.kuis.bintang && hasil.benar > p.kuis.benar)
    return tulis({
      ...p,
      kuis: {
        bintang: lebihBaik ? hasil.bintang : p.kuis.bintang,
        benar: lebihBaik ? hasil.benar : p.kuis.benar,
        total: Math.max(p.kuis.total, hasil.total),
        main: p.kuis.main + 1,
      },
    })
  },

  async kuisTerbaik(): Promise<Progress['kuis']> {
    return baca().kuis
  },

  async tandaiPartikel(wujud: Wujud): Promise<Progress> {
    const p = baca()
    if (p.partikel.dilihat.includes(wujud)) return p
    return tulis({ ...p, partikel: { dilihat: [...p.partikel.dilihat, wujud] } })
  },

  async selesaikanSiklus(): Promise<Progress> {
    const p = baca()
    if (p.siklus.selesai) return p
    return tulis({ ...p, siklus: { selesai: true } })
  },

  async bukaLencana(id: string): Promise<Progress> {
    const p = baca()
    if (p.lencana.includes(id)) return p
    return tulis({ ...p, lencana: [...p.lencana, id] })
  },

  async setSuaraMati(nilai: boolean): Promise<Progress> {
    const p = baca()
    return tulis({ ...p, suaraMati: nilai })
  },

  async reset(): Promise<Progress> {
    const bersih = salinanAwal()
    return tulis(bersih)
  },
}
