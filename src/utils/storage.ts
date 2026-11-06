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
 */
const KUNCI = 'lwb:v1'
const MAKS_CATATAN = 24

export const progressAwal: Progress = {
  catatan: [],
  prediksi: {},
  lencana: [],
  suaraMati: false,
  kuis: { bintang: 0, benar: 0, total: 0 },
  sortir: { selesai: false, benar: 0, total: 0 },
}

function salinanAwal(): Progress {
  return {
    ...progressAwal,
    catatan: [],
    prediksi: {},
    lencana: [],
    kuis: { ...progressAwal.kuis },
    sortir: { ...progressAwal.sortir },
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
