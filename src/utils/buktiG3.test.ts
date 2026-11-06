import { describe, it, expect } from 'vitest'
import { CONTOH_UNTUNG_RUGI_ANIMASI } from '../data/untungRugiAnimasi'

describe('Uji Bukti G3 & Validasi Ketat', () => {
  it('jumlah contoh untung tepat 5 dan rugi tepat 5 (total 10)', () => {
    const untung = CONTOH_UNTUNG_RUGI_ANIMASI.filter((c) => c.kategori === 'untung')
    const rugi = CONTOH_UNTUNG_RUGI_ANIMASI.filter((c) => c.kategori === 'rugi')
    expect(untung.length).toBe(5)
    expect(rugi.length).toBe(5)
    expect(CONTOH_UNTUNG_RUGI_ANIMASI.length).toBe(10)
  })

  it('memiliki id adegan yang unik', () => {
    const ids = CONTOH_UNTUNG_RUGI_ANIMASI.map((c) => c.id)
    const setIds = new Set(ids)
    expect(setIds.size).toBe(ids.length)
  })
})
