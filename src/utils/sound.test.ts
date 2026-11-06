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

describe('sound', () => {
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

  it('respects mute', async () => {
    const ctx = makeCtx()
    // @ts-ignore
    globalThis.AudioContext = function () {
      return ctx
    } as any
    const { mainkan, setBisu } = await import('./sound')
    setBisu(true)
    await mainkan('pop')
    expect(ctx._osc.length).toBe(0)
    setBisu(false)
    await mainkan('pop')
    expect(ctx._osc.length).toBe(1)
  })

  it('respects volume levels', async () => {
    const ctx = makeCtx()
    // @ts-ignore
    globalThis.AudioContext = function () {
      return ctx
    } as any
    const { mainkan, setVolume, getVolume } = await import('./sound')
    setVolume('mati')
    expect(getVolume()).toBe('mati')
    await mainkan('pop')
    expect(ctx._osc.length).toBe(0)
    setVolume('normal')
    expect(getVolume()).toBe('normal')
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
    // allow microtasks
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