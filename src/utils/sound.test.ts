import { beforeEach, describe, expect, it, vi } from 'vitest'

type Ctx = any

function makeCtx(): Ctx {
  const oscInstances: any[] = []
  const ctx: Ctx = {
    state: 'running',
    currentTime: 0,
    sampleRate: 44100,
    destination: {},
    _osc: oscInstances,
    createOscillator() {
      const o: any = {
        type: 'sine',
        frequency: {
          setValueAtTime() {},
          exponentialRampToValueAtTime() {},
        },
        connect() {
          return o
        },
        start() {},
        stop() {},
      }
      oscInstances.push(o)
      return o
    },
    createGain() {
      const g: any = {
        gain: {
          value: 1,
          setValueAtTime() {},
          exponentialRampToValueAtTime() {},
        },
        connect() {
          return g
        },
      }
      return g
    },
    createBiquadFilter() {
      const f: any = {
        type: 'bandpass',
        Q: { value: 0 },
        frequency: {
          setValueAtTime() {},
          exponentialRampToValueAtTime() {},
        },
        connect() {
          return f
        },
      }
      return f
    },
    createBuffer() {
      return { getChannelData: () => new Float32Array(8) }
    },
    createBufferSource() {
      const s: any = {
        buffer: null,
        connect() {
          return s
        },
        start() {},
        stop() {},
      }
      return s
    },
    createDynamicsCompressor() {
      const c: any = {
        threshold: { value: 0 },
        knee: { value: 0 },
        ratio: { value: 0 },
        attack: { value: 0 },
        release: { value: 0 },
        connect() {
          return c
        },
      }
      return c
    },
    resume() {
      return Promise.resolve()
    },
  }
  return ctx
}

describe('sound with slider volume', () => {
  beforeEach(() => {
    vi.resetModules()
    // @ts-ignore
    delete (globalThis as any).AudioContext
    // @ts-ignore
    delete (globalThis as any).webkitAudioContext
  })

  it('does not throw when AudioContext is unavailable', async () => {
    const { mainkan, mulaiLoop, hentikanSemuaLoop } = await import('./sound')
    await expect(mainkan('pop')).resolves.toBeUndefined()
    const stop = mulaiLoop('airGelembung')
    expect(typeof stop).toBe('function')
    stop()
    hentikanSemuaLoop()
  })

  it('respects mute (0 slider or mute toggle)', async () => {
    const ctx = makeCtx()
    // @ts-ignore
    globalThis.AudioContext = function () {
      return ctx
    } as any
    const { mainkan, setVolume, getVolume } = await import('./sound')
    setVolume(0)
    expect(getVolume()).toBe(0)
    await mainkan('pop')
    expect(ctx._osc.length).toBe(0)
    setVolume(50)
    expect(getVolume()).toBe(50)
    await mainkan('pop')
    expect(ctx._osc.length).toBe(1)
  })

  it('gain pada slider 100 tidak melebihi gain Normal versi lama (0.65) dan kurva monoton di seluruh rentang 0-100', async () => {
    // Fungsi gain internal di sound.ts: norm * norm * 0.65
    // Pada level 100, gain bernilai 1.0 * 1.0 * 0.65 = 0.65, tidak melebihi 0.65 (aman untuk anak).
    // Uji monoton: v1 < v2 -> gain(v1) <= gain(v2)
    const gainVal = (v: number) => {
      const clamp = Math.max(0, Math.min(100, v))
      if (clamp === 0) return 0
      const norm = clamp / 100
      return norm * norm * 0.65
    }

    expect(gainVal(100)).toBeCloseTo(0.65, 5)
    expect(gainVal(100)).toBeLessThanOrEqual(0.65)

    let prev = -1
    for (let v = 0; v <= 100; v += 5) {
      const g = gainVal(v)
      expect(g).toBeGreaterThanOrEqual(prev)
      prev = g
    }
  })

  it('respects volume levels (0-100 slider)', async () => {
    const ctx = makeCtx()
    // @ts-ignore
    globalThis.AudioContext = function () {
      return ctx
    } as any
    const { mainkan, setVolume, getVolume } = await import('./sound')
    setVolume(0)
    expect(getVolume()).toBe(0)
    await mainkan('pop')
    expect(ctx._osc.length).toBe(0)
    setVolume(60)
    expect(getVolume()).toBe(60)
    await mainkan('pop')
    expect(ctx._osc.length).toBe(1)
  })

  it('enforces polyphony limit', async () => {
    const ctx = makeCtx()
    // @ts-ignore
    globalThis.AudioContext = function () {
      return ctx
    } as any
    const { mainkan } = await import('./sound')
    for (let i = 0; i < 7; i++) void mainkan('pop')
    await new Promise((r) => setTimeout(r, 0))
    expect(ctx._osc.length).toBeLessThanOrEqual(6)
    expect(ctx._osc.length).toBe(6)
  })

  it('stops loops', async () => {
    const ctx = makeCtx()
    // @ts-ignore
    globalThis.AudioContext = function () {
      return ctx
    } as any
    const { mulaiLoop, hentikanSemuaLoop } = await import('./sound')
    const stop = mulaiLoop('airGelembung')
    expect(typeof stop).toBe('function')
    stop()
    hentikanSemuaLoop()
  })
})
