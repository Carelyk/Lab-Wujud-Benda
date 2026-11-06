/**
 * All sound effects are synthesised with the Web Audio API — no audio files.
 * To swap in real samples later, replace the body of `bunyikan()` only; the
 * public API (`mainkan`, `siapkan`, `setBisu`) stays the same.
 */
export type NamaSuara = 'klik' | 'benar' | 'salah' | 'cess' | 'ding'

let konteks: AudioContext | null = null
let bisu = false

function ambilKonteks(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (konteks) return konteks
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  try {
    konteks = new Ctor()
  } catch {
    konteks = null
  }
  return konteks
}

/**
 * Mobile browsers start the audio clock suspended. Call this from the first
 * real user gesture (pointerdown / keydown) so later sounds are allowed.
 */
export async function siapkanSuara(): Promise<void> {
  const ctx = ambilKonteks()
  if (!ctx) return
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume()
    } catch {
      /* the browser refused; stay silent instead of throwing */
    }
  }
}

export function setBisu(nilai: boolean): void {
  bisu = nilai
}

export function sedangBisu(): boolean {
  return bisu
}

function nada(
  ctx: AudioContext,
  o: {
    freq: number
    mulai: number
    durasi: number
    tipe?: OscillatorType
    volume?: number
    freqAkhir?: number
  },
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = o.tipe ?? 'sine'
  osc.frequency.setValueAtTime(o.freq, o.mulai)
  if (o.freqAkhir) {
    osc.frequency.exponentialRampToValueAtTime(o.freqAkhir, o.mulai + o.durasi)
  }
  const vol = o.volume ?? 0.12
  gain.gain.setValueAtTime(0.0001, o.mulai)
  gain.gain.exponentialRampToValueAtTime(vol, o.mulai + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, o.mulai + o.durasi)
  osc.connect(gain).connect(ctx.destination)
  osc.start(o.mulai)
  osc.stop(o.mulai + o.durasi + 0.03)
}

/** Filtered noise burst: the "cess" of steam. */
function desis(ctx: AudioContext, mulai: number, durasi: number, volume: number): void {
  const panjang = Math.ceil(ctx.sampleRate * durasi)
  const buffer = ctx.createBuffer(1, panjang, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < panjang; i++) {
    const sisa = 1 - i / panjang
    data[i] = (Math.random() * 2 - 1) * sisa * sisa
  }
  const sumber = ctx.createBufferSource()
  sumber.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = 0.9
  filter.frequency.setValueAtTime(1900, mulai)
  filter.frequency.exponentialRampToValueAtTime(620, mulai + durasi)
  const gain = ctx.createGain()
  gain.gain.value = volume
  sumber.connect(filter).connect(gain).connect(ctx.destination)
  sumber.start(mulai)
}

function bunyikan(ctx: AudioContext, nama: NamaSuara, t: number): void {
  switch (nama) {
    case 'klik':
      nada(ctx, { freq: 560, mulai: t, durasi: 0.06, tipe: 'triangle', volume: 0.06 })
      break
    case 'benar':
      nada(ctx, { freq: 660, mulai: t, durasi: 0.14, volume: 0.11 })
      nada(ctx, { freq: 880, mulai: t + 0.1, durasi: 0.2, volume: 0.11 })
      break
    case 'salah':
      // soft and low, never a harsh buzzer
      nada(ctx, { freq: 330, mulai: t, durasi: 0.2, freqAkhir: 230, volume: 0.07 })
      break
    case 'cess':
      desis(ctx, t, 0.85, 0.09)
      nada(ctx, { freq: 1500, mulai: t, durasi: 0.5, freqAkhir: 700, tipe: 'sine', volume: 0.02 })
      break
    case 'ding':
      nada(ctx, { freq: 784, mulai: t, durasi: 0.5, volume: 0.08 })
      nada(ctx, { freq: 1175, mulai: t + 0.02, durasi: 0.45, volume: 0.04 })
      break
  }
}

export async function mainkan(nama: NamaSuara): Promise<void> {
  if (bisu) return
  const ctx = ambilKonteks()
  if (!ctx) return
  if (ctx.state !== 'running') {
    try {
      await ctx.resume()
    } catch {
      return
    }
  }
  if (ctx.state !== 'running') return
  bunyikan(ctx, nama, ctx.currentTime + 0.01)
}
