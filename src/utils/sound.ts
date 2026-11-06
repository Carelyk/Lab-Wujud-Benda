/**
 * All sound effects are synthesised with the Web Audio API — no audio files.
 *
 * Public API:
 *   siapkanSuara(), mainkan(nama), mulaiLoop(nama, opsi), hentikanSemuaLoop(),
 *   setBisu(nilai), setVolume(tingkat), getVolume(), sedangBisu().
 *
 * Every tunable number lives in KONFIG_SUARA so a designer can retune an effect
 * without touching synthesis code. Components never create an AudioContext.
 */
import type { TingkatVolume } from '../types'

export type NamaSuara =
  // existing (kept for backwards compatibility)
  | 'klik'
  | 'benar'
  | 'salah'
  | 'cess'
  | 'ding'
  | 'tring'
  | 'buka'
  | 'pop'
  | 'splash'
  | 'suhu'
  // experiment: ice
  | 'esKrek'
  | 'esTik'
  | 'esKring'
  // experiment: water
  | 'airGelembung'
  | 'airCess'
  | 'airTikEmbun'
  // experiment: candle
  | 'lilinTik'
  | 'lilinDesis'
  | 'lilinPuf'
  // experiment: camphor
  | 'kapurShhh'
  | 'kapurPyuu'
  // temperature / environment
  | 'suhuTik'
  | 'matahariBling'
  | 'gunungBrrr'
  // mascot Tetes
  | 'tetesSenang'
  | 'tetesBingung'
  | 'tetesPanas'
  | 'tetesDingin'
  // UI
  | 'uiKlik'
  | 'uiWhoosh'
  | 'uiBuka'
  | 'uiTutup'
  | 'uiTab'
  // sorting
  | 'sortirAmbil'
  | 'sortirMasuk'
  | 'sortirBenar'
  | 'sortirSalah'
  | 'sortirKembali'
  // quiz
  | 'kuisPilih'
  | 'kuisBenar'
  | 'kuisSalah'
  | 'kuisBintang'
  | 'kuisSkor'
  // badges
  | 'lencanaKilau'
  // water cycle + particle lens
  | 'siklusMatahari'
  | 'siklusAwan'
  | 'siklusHujan'
  | 'siklusSalju'
  | 'lensaZoom'
  | 'partikelDesis'
  // "wujud di sekitar kita"
  | 'sekitarPop'
  | 'sekitarHujan'
  | 'sekitarEsKrim'
  | 'sekitarKaca'

interface LangkahNada {
  freq: number
  freqAkhir?: number
  durasi: number
  tipe?: OscillatorType
  volume?: number
  delay?: number
  noise?: boolean
  noiseFreqMulai?: number
  noiseFreqAkhir?: number
  noiseQ?: number
}

interface EfekConfig {
  langkah: LangkahNada[]
  /** Looping effects repeat this often (ms). */
  intervalMs?: number
}

/** Central parameter table. Edit numbers here, not in synthesis code. */
export const KONFIG_SUARA: Record<NamaSuara, EfekConfig> = {
  klik: { langkah: [{ freq: 560, durasi: 0.06, tipe: 'triangle', volume: 0.06 }] },
  benar: {
    langkah: [
      { freq: 660, durasi: 0.14, volume: 0.11 },
      { freq: 880, durasi: 0.2, volume: 0.11, delay: 0.1 },
    ],
  },
  salah: { langkah: [{ freq: 330, durasi: 0.2, freqAkhir: 230, volume: 0.07 }] },
  cess: {
    langkah: [
      {
        freq: 0,
        durasi: 0.85,
        volume: 0.09,
        noise: true,
        noiseFreqMulai: 1900,
        noiseFreqAkhir: 620,
        noiseQ: 0.9,
      },
      { freq: 1500, durasi: 0.5, freqAkhir: 700, tipe: 'sine', volume: 0.02 },
    ],
  },
  ding: {
    langkah: [
      { freq: 784, durasi: 0.5, volume: 0.08 },
      { freq: 1175, durasi: 0.45, volume: 0.04, delay: 0.02 },
    ],
  },
  tring: {
    langkah: [
      { freq: 1046, durasi: 0.42, volume: 0.09 },
      { freq: 1568, durasi: 0.3, volume: 0.035, delay: 0.01 },
    ],
  },
  buka: {
    langkah: [
      { freq: 523, durasi: 0.16, tipe: 'triangle', volume: 0.09 },
      { freq: 659, durasi: 0.16, tipe: 'triangle', volume: 0.09, delay: 0.13 },
      { freq: 880, durasi: 0.34, volume: 0.1, delay: 0.26 },
    ],
  },
  pop: { langkah: [{ freq: 440, durasi: 0.08, freqAkhir: 880, tipe: 'sine', volume: 0.08 }] },
  splash: { langkah: [{ freq: 300, durasi: 0.25, freqAkhir: 150, tipe: 'triangle', volume: 0.07 }] },
  suhu: { langkah: [{ freq: 600, durasi: 0.05, tipe: 'sine', volume: 0.04 }] },
  esKrek: { langkah: [{ freq: 900, durasi: 0.09, freqAkhir: 1200, tipe: 'triangle', volume: 0.05 }] },
  esTik: { langkah: [{ freq: 1200, durasi: 0.05, freqAkhir: 1800, tipe: 'sine', volume: 0.04 }] },
  esKring: { langkah: [{ freq: 2200, durasi: 0.12, freqAkhir: 2800, tipe: 'sine', volume: 0.03 }] },
  airGelembung: { langkah: [{ freq: 320, durasi: 0.12, freqAkhir: 520, tipe: 'sine', volume: 0.06 }], intervalMs: 260 },
  airCess: {
    langkah: [
      {
        freq: 0,
        durasi: 0.6,
        volume: 0.08,
        noise: true,
        noiseFreqMulai: 2400,
        noiseFreqAkhir: 900,
        noiseQ: 1.1,
      },
    ],
  },
  airTikEmbun: { langkah: [{ freq: 1500, durasi: 0.04, tipe: 'sine', volume: 0.03 }] },
  lilinTik: { langkah: [{ freq: 700, durasi: 0.06, freqAkhir: 900, tipe: 'triangle', volume: 0.05 }] },
  lilinDesis: {
    langkah: [
      {
        freq: 0,
        durasi: 0.4,
        volume: 0.04,
        noise: true,
        noiseFreqMulai: 1200,
        noiseFreqAkhir: 800,
        noiseQ: 0.7,
      },
    ],
    intervalMs: 320,
  },
  lilinPuf: { langkah: [{ freq: 400, durasi: 0.16, freqAkhir: 180, tipe: 'sine', volume: 0.06 }] },
  kapurShhh: {
    langkah: [
      {
        freq: 0,
        durasi: 0.5,
        volume: 0.05,
        noise: true,
        noiseFreqMulai: 1600,
        noiseFreqAkhir: 2200,
        noiseQ: 0.6,
      },
    ],
    intervalMs: 420,
  },
  kapurPyuu: { langkah: [{ freq: 600, durasi: 0.22, freqAkhir: 300, tipe: 'sine', volume: 0.05 }] },
  suhuTik: { langkah: [{ freq: 600, durasi: 0.05, tipe: 'sine', volume: 0.04 }] },
  matahariBling: { langkah: [{ freq: 880, durasi: 0.25, volume: 0.07 }, { freq: 1320, durasi: 0.2, volume: 0.04, delay: 0.05 }] },
  gunungBrrr: { langkah: [{ freq: 180, durasi: 0.3, freqAkhir: 150, tipe: 'triangle', volume: 0.05 }] },
  tetesSenang: { langkah: [{ freq: 520, durasi: 0.12, freqAkhir: 880, tipe: 'sine', volume: 0.08 }] },
  tetesBingung: {
    langkah: [
      { freq: 600, durasi: 0.1, freqAkhir: 420, tipe: 'sine', volume: 0.07 },
      { freq: 420, durasi: 0.12, freqAkhir: 620, tipe: 'sine', volume: 0.07, delay: 0.1 },
    ],
  },
  tetesPanas: { langkah: [{ freq: 760, durasi: 0.06, tipe: 'square', volume: 0.04 }, { freq: 820, durasi: 0.06, tipe: 'square', volume: 0.04, delay: 0.08 }] },
  tetesDingin: { langkah: [{ freq: 320, durasi: 0.12, tipe: 'sine', volume: 0.05 }, { freq: 280, durasi: 0.16, tipe: 'sine', volume: 0.05, delay: 0.14 }] },
  uiKlik: { langkah: [{ freq: 560, durasi: 0.06, tipe: 'triangle', volume: 0.06 }] },
  uiWhoosh: { langkah: [{ freq: 300, durasi: 0.22, freqAkhir: 900, tipe: 'sine', volume: 0.05 }] },
  uiBuka: { langkah: [{ freq: 440, durasi: 0.1, freqAkhir: 660, tipe: 'triangle', volume: 0.06 }] },
  uiTutup: { langkah: [{ freq: 660, durasi: 0.1, freqAkhir: 440, tipe: 'triangle', volume: 0.06 }] },
  uiTab: { langkah: [{ freq: 500, durasi: 0.05, tipe: 'triangle', volume: 0.05 }] },
  sortirAmbil: { langkah: [{ freq: 260, durasi: 0.08, freqAkhir: 420, tipe: 'triangle', volume: 0.06 }] },
  sortirMasuk: { langkah: [{ freq: 900, durasi: 0.04, tipe: 'sine', volume: 0.04 }] },
  sortirBenar: { langkah: [{ freq: 1046, durasi: 0.42, volume: 0.09 }, { freq: 1568, durasi: 0.3, volume: 0.035, delay: 0.01 }] },
  sortirSalah: { langkah: [{ freq: 220, durasi: 0.2, freqAkhir: 160, tipe: 'triangle', volume: 0.06 }] },
  sortirKembali: { langkah: [{ freq: 500, durasi: 0.12, freqAkhir: 300, tipe: 'sine', volume: 0.05 }] },
  kuisPilih: { langkah: [{ freq: 480, durasi: 0.05, tipe: 'triangle', volume: 0.05 }] },
  kuisBenar: { langkah: [{ freq: 660, durasi: 0.14, volume: 0.11 }, { freq: 880, durasi: 0.2, volume: 0.11, delay: 0.1 }] },
  kuisSalah: { langkah: [{ freq: 330, durasi: 0.2, freqAkhir: 230, volume: 0.07 }] },
  kuisBintang: { langkah: [{ freq: 1320, durasi: 0.12, volume: 0.06 }] },
  kuisSkor: { langkah: [{ freq: 523, durasi: 0.16, tipe: 'triangle', volume: 0.09 }, { freq: 659, durasi: 0.16, tipe: 'triangle', volume: 0.09, delay: 0.13 }, { freq: 880, durasi: 0.34, volume: 0.1, delay: 0.26 }] },
  lencanaKilau: {
    langkah: [
      { freq: 0, durasi: 0.4, volume: 0.04, noise: true, noiseFreqMulai: 2000, noiseFreqAkhir: 3200, noiseQ: 0.5 },
      { freq: 1568, durasi: 0.18, volume: 0.05, delay: 0.05 },
    ],
  },
  siklusMatahari: { langkah: [{ freq: 700, durasi: 0.18, freqAkhir: 1100, tipe: 'sine', volume: 0.06 }] },
  siklusAwan: { langkah: [{ freq: 400, durasi: 0.2, freqAkhir: 260, tipe: 'sine', volume: 0.05 }] },
  siklusHujan: {
    langkah: [
      {
        freq: 0,
        durasi: 0.35,
        volume: 0.05,
        noise: true,
        noiseFreqMulai: 900,
        noiseFreqAkhir: 600,
        noiseQ: 0.4,
      },
    ],
    intervalMs: 300,
  },
  siklusSalju: { langkah: [{ freq: 1400, durasi: 0.05, tipe: 'sine', volume: 0.04 }] },
  lensaZoom: { langkah: [{ freq: 350, durasi: 0.18, freqAkhir: 700, tipe: 'sine', volume: 0.06 }] },
  partikelDesis: {
    langkah: [
      {
        freq: 0,
        durasi: 0.25,
        volume: 0.04,
        noise: true,
        noiseFreqMulai: 1400,
        noiseFreqAkhir: 1000,
        noiseQ: 0.8,
      },
    ],
    intervalMs: 240,
  },
  sekitarPop: { langkah: [{ freq: 440, durasi: 0.08, freqAkhir: 880, tipe: 'sine', volume: 0.08 }] },
  sekitarHujan: {
    langkah: [
      {
        freq: 0,
        durasi: 0.4,
        volume: 0.06,
        noise: true,
        noiseFreqMulai: 1100,
        noiseFreqAkhir: 700,
        noiseQ: 0.5,
      },
    ],
  },
  sekitarEsKrim: { langkah: [{ freq: 520, durasi: 0.12, freqAkhir: 620, tipe: 'triangle', volume: 0.06 }] },
  sekitarKaca: { langkah: [{ freq: 900, durasi: 0.1, freqAkhir: 1200, tipe: 'sine', volume: 0.04 }] },
}

const MAKS_SUARA_BERSAMAAN = 6
const THROTTLE_MS: Partial<Record<NamaSuara, number>> = {
  klik: 45,
  uiKlik: 45,
  suhuTik: 40,
  suhu: 40,
  sortirMasuk: 30,
  partikelDesis: 0,
}

let konteks: AudioContext | null = null
let bisu = false
let tingkatVolume: TingkatVolume = 'normal'
let masterGain: GainNode | null = null
let kompressor: DynamicsCompressorNode | null = null
let suaraAktif = 0
const loopAktif = new Map<number, () => void>()
let loopCounter = 0
const terakhirMain: Map<string, number> = new Map()

function ambilGlobal(): any {
  return globalThis as any
}

function ambilKonteks(): AudioContext | null {
  if (konteks) return konteks
  const g = ambilGlobal()
  const Ctor = g?.AudioContext ?? g?.webkitAudioContext
  if (!Ctor) return null
  try {
    konteks = new Ctor()
  } catch {
    konteks = null
  }
  return konteks
}

function gainUntukTingkat(t: TingkatVolume): number {
  if (t === 'mati') return 0
  if (t === 'pelan') return 0.35
  return 0.65
}

function pastikanGraf(ctx: AudioContext): void {
  if (masterGain && masterGain.context === ctx && kompressor) return
  try {
    kompressor = ctx.createDynamicsCompressor()
    masterGain = ctx.createGain()
    if (kompressor) {
      kompressor.threshold.value = -24
      kompressor.knee.value = 18
      kompressor.ratio.value = 6
      kompressor.attack.value = 0.003
      kompressor.release.value = 0.12
      masterGain.connect(kompressor)
      kompressor.connect(ctx.destination)
    } else {
      masterGain.connect(ctx.destination)
    }
  } catch {
    // Some mocks may not implement these nodes; fall back to direct destination.
    if (!masterGain) masterGain = ctx.createGain()
    try {
      masterGain.connect(ctx.destination)
    } catch {
      /* ignore */
    }
  }
  if (masterGain) masterGain.gain.value = gainUntukTingkat(tingkatVolume)
}

function tujuan(ctx: AudioContext): AudioNode {
  pastikanGraf(ctx)
  return masterGain ?? ctx.destination
}

function nada(ctx: AudioContext, mulai: number, o: LangkahNada): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = o.tipe ?? 'sine'
  osc.frequency.setValueAtTime(Math.max(0.001, o.freq || 440), mulai)
  if (o.freqAkhir) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(0.001, o.freqAkhir), mulai + o.durasi)
  }
  const vol = o.volume ?? 0.1
  const attack = 0.012
  gain.gain.setValueAtTime(0.0001, mulai)
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, vol), mulai + attack)
  gain.gain.exponentialRampToValueAtTime(0.0001, mulai + o.durasi)
  osc.connect(gain).connect(tujuan(ctx))
  osc.start(mulai)
  osc.stop(mulai + o.durasi + 0.03)
}

function desis(ctx: AudioContext, mulai: number, o: LangkahNada): void {
  const durasi = o.durasi
  const panjang = Math.max(1, Math.ceil((ctx.sampleRate || 44100) * durasi))
  const buffer = ctx.createBuffer(1, panjang, ctx.sampleRate || 44100)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < panjang; i++) {
    const sisa = 1 - i / panjang
    data[i] = (Math.random() * 2 - 1) * sisa * sisa
  }
  const sumber = ctx.createBufferSource()
  sumber.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = o.noiseQ ?? 0.9
  filter.frequency.setValueAtTime(o.noiseFreqMulai ?? 1900, mulai)
  filter.frequency.exponentialRampToValueAtTime(Math.max(0.001, o.noiseFreqAkhir ?? 620), mulai + durasi)
  const gain = ctx.createGain()
  gain.gain.value = o.volume ?? 0.09
  sumber.connect(filter).connect(gain).connect(tujuan(ctx))
  sumber.start(mulai)
  sumber.stop(mulai + durasi + 0.03)
}

function durasiEfek(nama: NamaSuara): number {
  const cfg = KONFIG_SUARA[nama]
  let maks = 0
  for (const l of cfg.langkah) maks = Math.max(maks, (l.delay ?? 0) + l.durasi)
  return Math.max(0.05, maks)
}

function bolehMainkan(nama: NamaSuara, sekarangMs: number): boolean {
  const throttle = THROTTLE_MS[nama]
  if (!throttle) return true
  const terakhir = terakhirMain.get(nama) ?? -Infinity
  if (sekarangMs - terakhir < throttle) return false
  terakhirMain.set(nama, sekarangMs)
  return true
}

export async function siapkanSuara(): Promise<void> {
  const ctx = ambilKonteks()
  if (!ctx) return
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume()
    } catch {
      /* stay silent */
    }
  }
}

export function setBisu(nilai: boolean): void {
  bisu = nilai
  if (nilai) {
    tingkatVolume = 'mati'
    hentikanSemuaLoop()
  } else if (tingkatVolume === 'mati') {
    tingkatVolume = 'normal'
  }
  if (masterGain) masterGain.gain.value = gainUntukTingkat(tingkatVolume)
}

export function sedangBisu(): boolean {
  return bisu || tingkatVolume === 'mati'
}

export function setVolume(tingkat: TingkatVolume): void {
  tingkatVolume = tingkat
  bisu = tingkat === 'mati'
  if (tingkat === 'mati') hentikanSemuaLoop()
  if (masterGain) masterGain.gain.value = gainUntukTingkat(tingkat)
}

export function getVolume(): TingkatVolume {
  return tingkatVolume
}

export async function mainkan(nama: NamaSuara, _opsi?: { suhu?: number }): Promise<void> {
  if (bisu || tingkatVolume === 'mati') return
  const ctx = ambilKonteks()
  if (!ctx) return
  const sekarangMs = (ctx.currentTime || 0) * 1000
  if (!bolehMainkan(nama, sekarangMs)) return
  if (ctx.state !== 'running') {
    try {
      await ctx.resume()
    } catch {
      return
    }
  }
  if (ctx.state !== 'running') return
  if (suaraAktif >= MAKS_SUARA_BERSAMAAN) return

  pastikanGraf(ctx)
  if (masterGain) masterGain.gain.value = gainUntukTingkat(tingkatVolume)

  suaraAktif += 1
  const t0 = (ctx.currentTime || 0) + 0.01
  const cfg = KONFIG_SUARA[nama]
  try {
    for (const langkah of cfg.langkah) {
      const mulai = t0 + (langkah.delay ?? 0)
      if (langkah.noise) {
        desis(ctx, mulai, langkah)
      } else {
        nada(ctx, mulai, langkah)
      }
    }
  } catch {
    /* never throw to callers */
  }
  const dur = durasiEfek(nama)
  const g = ambilGlobal()
  if (typeof g?.setTimeout === 'function') {
    g.setTimeout(() => {
      suaraAktif = Math.max(0, suaraAktif - 1)
    }, Math.round(dur * 1000 + 60))
  } else {
    suaraAktif = Math.max(0, suaraAktif - 1)
  }
}

const EFEK_LOOP: Set<NamaSuara> = new Set([
  'airGelembung',
  'lilinDesis',
  'kapurShhh',
  'siklusHujan',
  'partikelDesis',
])

export function mulaiLoop(
  nama: NamaSuara,
  _opsi?: { suhu?: number; intervalMs?: number },
): () => void {
  if (bisu || tingkatVolume === 'mati') return () => {}
  if (suaraAktif >= MAKS_SUARA_BERSAMAAN) return () => {}
  suaraAktif += 1
  const interval = _opsi?.intervalMs ?? KONFIG_SUARA[nama].intervalMs ?? 300
  const id = ++loopCounter
  let berhenti = false
  const stop = () => {
    if (berhenti) return
    berhenti = true
    const pembersih = loopAktif.get(id)
    if (pembersih) {
      try {
        pembersih()
      } catch {
        /* ignore */
      }
    }
    loopAktif.delete(id)
    suaraAktif = Math.max(0, suaraAktif - 1)
  }
  const handle = (ambilGlobal().setInterval ?? globalThis.setInterval)(() => {
    if (berhenti || bisu || tingkatVolume === 'mati') return
    void mainkan(nama, _opsi)
  }, interval)
  // play once immediately
  void mainkan(nama, _opsi)
  loopAktif.set(id, () => {
    const g = ambilGlobal()
    const clearIntervalFn = g?.clearInterval ?? globalThis.clearInterval
    try {
      clearIntervalFn(handle)
    } catch {
      /* ignore */
    }
  })
  return stop
}

export function hentikanSemuaLoop(): void {
  for (const [, pembersih] of loopAktif) {
    try {
      pembersih()
    } catch {
      /* ignore */
    }
  }
  loopAktif.clear()
}

// stop loops when the tab is hidden
const g = ambilGlobal()
if (g?.document?.addEventListener) {
  g.document.addEventListener('visibilitychange', () => {
    if (g.document.hidden) hentikanSemuaLoop()
  })
}

export function daftarNamaSuara(): NamaSuara[] {
  return Object.keys(KONFIG_SUARA) as NamaSuara[]
}

export function adalahLoop(nama: NamaSuara): boolean {
  return EFEK_LOOP.has(nama)
}