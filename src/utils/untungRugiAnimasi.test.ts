import { describe, it, expect } from 'vitest'
import { CONTOH_UNTUNG_RUGI_ANIMASI } from '../data/untungRugiAnimasi'

describe('UntungRugi Animasi Data & Timeline', () => {
  it('has valid examples with animation fields and perluVerifikasi: true', () => {
    expect(CONTOH_UNTUNG_RUGI_ANIMASI.length).toBeGreaterThanOrEqual(10)
    for (const c of CONTOH_UNTUNG_RUGI_ANIMASI) {
      expect(c.id).toBeTypeOf('string')
      expect(c.judul).toBeTypeOf('string')
      expect(c.durasiMs).toBeGreaterThanOrEqual(3000)
      expect(c.durasiMs).toBeLessThanOrEqual(5000)
      expect(c.tahap.length).toBeGreaterThan(0)
      expect(c.perluVerifikasi).toBe(true)
    }
  })
})
