import type {
  Arah,
  BendaId,
  CatatanEntry,
  NamaProses,
  Progress,
  TingkatVolume,
  Wujud,
} from '../types'

const KUNCI = 'lwb:v2'
const KUNCI_LAMA = 'lwb:v1'
const MAKS_CATATAN = 24
const WUJUD: Wujud[] = ['padat', 'cair', 'gas']
const BENDA_ID: BendaId[] = ['es', 'air', 'lilin', 'cokelat', 'kristal-es', 'kapur-barus', 'panci']

export const progressAwal: Progress = {
  catatan: [],
  prediksi: {},
  lencana: [],
  suaraMati: false,
  volume: 60,
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

export function formatSubjekCatatan(bendaId: BendaId, proses: NamaProses, arah: Arah): string {
  let namaBenda = 'Benda'
  if (bendaId === 'es') namaBenda = 'Es'
  else if (bendaId === 'air') {
    namaBenda = arah === 'dingin' && proses === 'mengembun' ? 'Uap air' : 'Air'
  } else if (bendaId === 'lilin') namaBenda = 'Lilin'
  else if (bendaId === 'cokelat') namaBenda = 'Cokelat'
  else if (bendaId === 'kristal-es') namaBenda = proses === 'mengkristal' ? 'Uap air' : 'Kristal es'
  else if (bendaId === 'kapur-barus') namaBenda = 'Kapur barus'
  else if (bendaId === 'panci') namaBenda = 'Air panci'

  let namaProses = 'berubah wujud'
  if (proses === 'membeku') namaProses = 'Membeku'
  else if (proses === 'mencair') namaProses = 'Mencair'
  else if (proses === 'menguap') namaProses = 'Menguap'
  else if (proses === 'mendidih') namaProses = 'Mendidih'
  else if (proses === 'mengembun') namaProses = 'Mengembun'
  else if (proses === 'menyublim') namaProses = 'Menyublim'
  else if (proses === 'mengkristal') namaProses = 'Mengkristal'

  const kondisi = arah === 'panas' ? 'Panas' : 'Dingin'
  return `${namaBenda} + ${kondisi} = ${namaProses}`
}

function migrasiCatatanLama(mentahCatatan: any[]): CatatanEntry[] {
  if (!Array.isArray(mentahCatatan)) return []
  return mentahCatatan.map((c, idx) => {
    const idTersimpan = BENDA_ID.includes(c.bendaId) ? (c.bendaId as BendaId) : null
    let bendaId: BendaId = idTersimpan ?? 'air'
    let proses: NamaProses = c.proses || 'mencair'
    let arah: Arah = c.arah || 'panas'

    const teksLama = typeof c.teks === 'string' ? c.teks : ''
    const bersihTeks = teksLama.replace(/\\u[0-9a-fA-F]{4}/gu, '').trim()

    if (!idTersimpan) {
      if (bersihTeks.includes('kristal') || bersihTeks.includes('Kristal')) bendaId = 'kristal-es'
      else if (bersihTeks.includes('panci') || bersihTeks.includes('Panci')) bendaId = 'panci'
      else if (bersihTeks.includes('kapur') || bersihTeks.includes('barus')) bendaId = 'kapur-barus'
      else if (bersihTeks.includes('cokelat') || bersihTeks.includes('Cokelat')) bendaId = 'cokelat'
      else if (bersihTeks.includes('lilin') || bersihTeks.includes('Lilin')) bendaId = 'lilin'
      else if (bersihTeks.includes('es') || bersihTeks.includes('Es')) bendaId = 'es'
      else if (bersihTeks.includes('air') || bersihTeks.includes('Air')) bendaId = 'air'
    }

    if (bersihTeks.includes('membeku') || bersihTeks.includes('Beku')) proses = 'membeku'
    else if (bersihTeks.includes('mencair') || bersihTeks.includes('Leleh')) proses = 'mencair'
    else if (bersihTeks.includes('menguap') || bersihTeks.includes('Uap')) proses = 'menguap'
    else if (bersihTeks.includes('mendidih') || bersihTeks.includes('Didih')) proses = 'mendidih'
    else if (bersihTeks.includes('mengembun') || bersihTeks.includes('Embun')) proses = 'mengembun'
    else if (bersihTeks.includes('menyublim') || bersihTeks.includes('Sublim')) proses = 'menyublim'

    if (bersihTeks.includes('Dingin') || bersihTeks.includes('dingin')) arah = 'dingin'
    else if (bersihTeks.includes('Panas') || bersihTeks.includes('panas')) arah = 'panas'

    const teksBaru = formatSubjekCatatan(bendaId, proses, arah)

    return {
      id: c.id || `migrasi-${bendaId}-${proses}-${idx}`,
      bendaId,
      proses,
      arah,
      teks: teksBaru,
      waktu: typeof c.waktu === 'number' ? c.waktu : Date.now(),
    }
  })
}

function parseVolumeLama(v: any, suaraMati: boolean): TingkatVolume {
  if (typeof v === 'number') return Math.max(0, Math.min(100, v))
  if (v === 'mati' || suaraMati) return 0
  if (v === 'pelan') return 30
  if (v === 'normal') return 60
  return 60
}

function baca(): Progress {
  if (typeof localStorage === 'undefined') return salinanAwal()
  try {
    let mentah = localStorage.getItem(KUNCI)
    if (!mentah) {
      const mentahLama = localStorage.getItem(KUNCI_LAMA)
      if (mentahLama) {
        try {
          const dataLama = JSON.parse(mentahLama)
          const progressMigrasi: Progress = {
            ...salinanAwal(),
            ...dataLama,
            volume: parseVolumeLama(dataLama.volume, dataLama.suaraMati),
            catatan: migrasiCatatanLama(dataLama.catatan),
          }
          localStorage.setItem(KUNCI, JSON.stringify(progressMigrasi))
          mentah = localStorage.getItem(KUNCI)
        } catch {
          // Gagal parse lwb:v1
        }
      }
    }
    if (!mentah) return salinanAwal()

    const data = JSON.parse(mentah) as Partial<Progress>
    const vol = parseVolumeLama(data.volume, data.suaraMati === true)
    return {
      ...salinanAwal(),
      ...data,
      volume: vol,
      suaraMati: vol === 0,
      catatan: Array.isArray(data.catatan) ? migrasiCatatanLama(data.catatan) : [],
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
    return salinanAwal()
  }
}

function tulis(p: Progress): Progress {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(p))
    } catch {
      /* quota / private mode */
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
  }): Promise<Progress> {
    const p = baca()
    const sudahAda = p.catatan.some(
      (c) => c.bendaId === entry.bendaId && c.proses === entry.proses && c.arah === entry.arah,
    )
    if (sudahAda) return p

    const teks = formatSubjekCatatan(entry.bendaId, entry.proses, entry.arah)
    const baru: CatatanEntry = {
      ...entry,
      teks,
      id: `${entry.bendaId}-${entry.proses}-${entry.arah}-${Date.now()}`,
      waktu: Date.now(),
    }

    p.catatan = [baru, ...p.catatan].slice(0, MAKS_CATATAN)
    return tulis(p)
  },

  async hapusCatatan(id: string): Promise<Progress> {
    const p = baca()
    p.catatan = p.catatan.filter((c) => c.id !== id)
    return tulis(p)
  },

  async simpanPrediksi(bendaId: BendaId, jawaban: Wujud): Promise<Progress> {
    const p = baca()
    const benda = (await import('../data/objects')).BENDA[bendaId]
    const tepat = benda.prediksi.benar === jawaban
    p.prediksi = {
      ...p.prediksi,
      [bendaId]: { jawaban, tepat, waktu: Date.now() },
    }
    return tulis(p)
  },

  async bukaLencana(idLencana: string): Promise<Progress> {
    const p = baca()
    if (p.lencana.includes(idLencana)) return p
    p.lencana = [...p.lencana, idLencana]
    return tulis(p)
  },

  async simpanKuis(benar: boolean, total: number, bintang: number): Promise<Progress> {
    const p = baca()
    const baruMain = p.kuis.main + 1
    const baruBenar = p.kuis.benar + (benar ? 1 : 0)
    const baruTotal = p.kuis.total + total
    const maxBintang = Math.max(p.kuis.bintang, bintang)
    p.kuis = {
      bintang: maxBintang,
      benar: baruBenar,
      total: baruTotal,
      main: baruMain,
    }
    return tulis(p)
  },

  async simpanSortir(
    benar: number,
    total: number,
    salah: number,
    bintang: number,
  ): Promise<Progress> {
    const p = baca()
    p.sortir = {
      selesai: true,
      benar,
      total,
      bintang: Math.max(p.sortir.bintang, bintang),
      salah,
      main: p.sortir.main + 1,
    }
    return tulis(p)
  },

  async tandaiPartikelDilihat(wujud: Wujud): Promise<Progress> {
    const p = baca()
    if (p.partikel.dilihat.includes(wujud)) return p
    p.partikel.dilihat = [...p.partikel.dilihat, wujud]
    return tulis(p)
  },

  async tandaiSiklusSelesai(): Promise<Progress> {
    const p = baca()
    p.siklus = { selesai: true }
    return tulis(p)
  },

  async setSuaraMati(nilai: boolean): Promise<Progress> {
    const p = baca()
    const vol = nilai ? 0 : (p.volume === 0 ? 60 : p.volume)
    return tulis({ ...p, suaraMati: nilai, volume: vol })
  },

  async getVolume(): Promise<TingkatVolume> {
    const p = baca()
    return p.volume ?? 60
  },

  async setVolume(level: TingkatVolume): Promise<Progress> {
    const p = baca()
    const v = Math.max(0, Math.min(100, level))
    return tulis({ ...p, volume: v, suaraMati: v === 0 })
  },

  async resetSemua(): Promise<Progress> {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(KUNCI)
      localStorage.removeItem(KUNCI_LAMA)
    }
    return salinanAwal()
  },
}
