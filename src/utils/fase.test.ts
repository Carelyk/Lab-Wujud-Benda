import { describe, expect, it } from 'vitest'
import { BENDA_LIST } from '../data/objects'
import type { Benda, NamaProses } from '../types'
import { ambangSuhu, fasePada, langkahSuhu, resolvePhase } from './fase'

const SEMUA_PROSES: NamaProses[] = [
  'mencair',
  'membeku',
  'menguap',
  'mendidih',
  'mengembun',
]

function panaskan(benda: Benda, dari: number, sampai: number): NamaProses[] {
  const hasil: NamaProses[] = []
  for (let t = dari; t < sampai; t++) {
    const p = resolvePhase(benda, t, t + 1)
    if (p.proses) hasil.push(p.proses)
  }
  return hasil
}

function dinginkan(benda: Benda, dari: number, sampai: number): NamaProses[] {
  const hasil: NamaProses[] = []
  for (let t = dari; t > sampai; t--) {
    const p = resolvePhase(benda, t, t - 1)
    if (p.proses) hasil.push(p.proses)
  }
  return hasil
}

describe('data benda', () => {
  it('setiap benda punya band suhu yang urut dan masuk akal', () => {
    for (const b of BENDA_LIST) {
      const mulai = b.fase.map((f) => f.mulai)
      expect([...mulai].sort((x, y) => x - y)).toEqual(mulai)
      expect(b.fase[0].mulai).toBeLessThanOrEqual(b.suhuMin)
      expect(b.suhuAwal).toBeGreaterThanOrEqual(b.suhuMin)
      expect(b.suhuAwal).toBeLessThanOrEqual(b.suhuMaks)
      expect(b.prediksi.benar).toMatch(/^(padat|cair|gas)$/)
    }
  })

  it('titik didih sama dengan awal band gas', () => {
    for (const b of BENDA_LIST) {
      if (!b.uap) continue
      const bandGas = b.fase.find((f) => f.wujud === 'gas')
      expect(bandGas).toBeDefined()
      expect(bandGas?.mulai).toBe(b.uap.didih)
      expect(b.uap.tipis).toBeLessThan(b.uap.didih)
    }
  })

  it('lilin dan cokelat tidak punya tahap uap', () => {
    expect(BENDA_LIST.find((b) => b.id === 'lilin')?.uap).toBeUndefined()
    expect(BENDA_LIST.find((b) => b.id === 'cokelat')?.uap).toBeUndefined()
  })

  it('setiap konten ditandai perlu diverifikasi guru', () => {
    for (const b of BENDA_LIST) expect(b.perluVerifikasi).toBe(true)
  })
})

describe('fasePada', () => {
  const es = BENDA_LIST.find((b) => b.id === 'es')!
  const air = BENDA_LIST.find((b) => b.id === 'air')!
  const lilin = BENDA_LIST.find((b) => b.id === 'lilin')!
  const cokelat = BENDA_LIST.find((b) => b.id === 'cokelat')!

  it('es batu: padat di bawah 0, cair di atas 0, gas di 100', () => {
    expect(fasePada(es, -5).wujud).toBe('padat')
    expect(fasePada(es, -0.1).wujud).toBe('padat')
    expect(fasePada(es, 0).wujud).toBe('cair')
    expect(fasePada(es, 99).wujud).toBe('cair')
    expect(fasePada(es, 100).wujud).toBe('gas')
  })

  it('uap tipis mulai di 30 dan penuh di 100', () => {
    expect(fasePada(air, 25).uap).toBe(0)
    expect(fasePada(air, 30).uap).toBe(0)
    expect(fasePada(air, 65).uap).toBeGreaterThan(0.4)
    expect(fasePada(air, 65).uap).toBeLessThan(0.6)
    expect(fasePada(air, 100).uap).toBe(1)
  })

  it('air membeku di bawah 0', () => {
    expect(fasePada(air, 25).wujud).toBe('cair')
    expect(fasePada(air, -1).wujud).toBe('padat')
  })

  it('lilin meleleh di 55, cokelat di 33', () => {
    expect(fasePada(lilin, 54).wujud).toBe('padat')
    expect(fasePada(lilin, 55).wujud).toBe('cair')
    expect(fasePada(cokelat, 32).wujud).toBe('padat')
    expect(fasePada(cokelat, 33).wujud).toBe('cair')
  })
})

describe('resolvePhase memakai arah perubahan', () => {
  const es = BENDA_LIST.find((b) => b.id === 'es')!
  const air = BENDA_LIST.find((b) => b.id === 'air')!
  const lilin = BENDA_LIST.find((b) => b.id === 'lilin')!
  const cokelat = BENDA_LIST.find((b) => b.id === 'cokelat')!

  it('panas: padat menjadi cair = mencair', () => {
    expect(resolvePhase(es, -5, 25).proses).toBe('mencair')
    expect(resolvePhase(cokelat, 28, 40).proses).toBe('mencair')
    expect(resolvePhase(lilin, 28, 60).proses).toBe('mencair')
  })

  it('dingin: cair menjadi padat = membeku', () => {
    expect(resolvePhase(es, 25, -5).proses).toBe('membeku')
    expect(resolvePhase(air, 25, -10).proses).toBe('membeku')
    expect(resolvePhase(cokelat, 40, 28).proses).toBe('membeku')
    expect(resolvePhase(lilin, 60, 28).proses).toBe('membeku')
  })

  it('uap tipis: cair ke cair di atas 30 = menguap', () => {
    expect(resolvePhase(air, 25, 35).proses).toBe('menguap')
    expect(resolvePhase(air, 40, 25).proses).toBeNull()
  })

  it('mendidih di 100 dan mengembun saat didinginkan', () => {
    expect(resolvePhase(air, 90, 100).proses).toBe('mendidih')
    expect(resolvePhase(air, 100, 90).proses).toBe('mengembun')
    expect(resolvePhase(es, 99, 100).proses).toBe('mendidih')
    expect(resolvePhase(es, 100, 20).proses).toBe('mengembun')
  })

  it('menyublim tidak dipakai di data', () => {
    for (const b of BENDA_LIST) {
      const semua = [
        ...panaskan(b, b.suhuMin, b.suhuMaks),
        ...dinginkan(b, b.suhuMaks, b.suhuMin),
      ]
      expect(semua).not.toContain('menyublim' as NamaProses)
      for (const p of semua) expect(SEMUA_PROSES).toContain(p)
    }
  })

  it('tidak ada proses saat suhu diam', () => {
    const p = resolvePhase(air, 25, 25)
    expect(p.proses).toBeNull()
    expect(p.arah).toBeNull()
  })
})

describe('sapu seluruh rentang suhu', () => {
  it('setiap perubahan wujud punya nama proses (tanpa lubang)', () => {
    for (const b of BENDA_LIST) {
      for (let t = b.suhuMin; t < b.suhuMaks; t++) {
        const naik = resolvePhase(b, t, t + 1)
        if (naik.dariWujud !== naik.keWujud) expect(naik.proses).not.toBeNull()

        const turun = resolvePhase(b, t + 1, t)
        if (turun.dariWujud !== turun.keWujud) expect(turun.proses).not.toBeNull()
      }
    }
  })

  it('setiap benda bisa mencair saat dipanaskan dan membeku saat didinginkan', () => {
    for (const b of BENDA_LIST) {
      expect(panaskan(b, b.suhuMin, b.suhuMaks)).toContain('mencair')
      expect(dinginkan(b, b.suhuMaks, b.suhuMin)).toContain('membeku')
    }
  })

  it('hanya benda ber-air yang bisa mendidih dan mengembun', () => {
    for (const b of BENDA_LIST) {
      const proses = panaskan(b, b.suhuMin, b.suhuMaks)
      if (b.uap) {
        expect(proses).toContain('mendidih')
        expect(dinginkan(b, b.suhuMaks, b.suhuMin)).toContain('mengembun')
      } else {
        expect(proses).not.toContain('mendidih')
      }
    }
  })
})

describe('ambangSuhu', () => {
  it('berisi titik leleh, titik uap tipis, dan titik didih', () => {
    const es = BENDA_LIST.find((b) => b.id === 'es')!
    expect(ambangSuhu(es)).toEqual([0, 30, 100])

    const lilin = BENDA_LIST.find((b) => b.id === 'lilin')!
    expect(ambangSuhu(lilin)).toEqual([55])
  })

  it('tidak ada duplikat', () => {
    for (const b of BENDA_LIST) {
      const a = ambangSuhu(b)
      expect(new Set(a).size).toBe(a.length)
    }
  })
})

describe('langkahSuhu tidak melewati ambang', () => {
  function jalankan(benda: Benda, dari: number, tujuan: number, kecepatan = 42) {
    const berhenti: number[] = []
    const proses: NamaProses[] = []
    let suhu = dari
    let tahan = false

    for (let i = 0; i < 5000; i++) {
      if (tahan) {
        tahan = false
        continue
      }
      const hasil = langkahSuhu(benda, suhu, tujuan, 0.05, kecepatan)
      if (hasil.tahan) berhenti.push(hasil.berikut)
      const p = resolvePhase(benda, suhu, hasil.berikut)
      if (p.proses) proses.push(p.proses)
      suhu = hasil.berikut
      tahan = hasil.tahan
      if (hasil.selesai) break
    }

    return { suhu, berhenti, proses }
  }

  it('lompatan -20 ke 120 tetap berhenti di 0, 30, dan 100', () => {
    const es = BENDA_LIST.find((b) => b.id === 'es')!
    const hasil = jalankan(es, -20, 120)
    expect(hasil.berhenti).toEqual([0, 30, 100])
    expect(hasil.proses).toEqual(expect.arrayContaining(['mencair', 'menguap', 'mendidih']))
    expect(hasil.suhu).toBe(120)
  })

  it('lompatan 120 ke -20 tetap berhenti di 100, 30, dan 0', () => {
    const air = BENDA_LIST.find((b) => b.id === 'air')!
    const hasil = jalankan(air, 120, -20)
    expect(hasil.berhenti).toEqual([100, 30, 0])
    expect(hasil.proses).toEqual(expect.arrayContaining(['mengembun', 'membeku']))
    expect(hasil.suhu).toBe(-20)
  })

  it('berhenti tepat di target tanpa melewatinya', () => {
    const lilin = BENDA_LIST.find((b) => b.id === 'lilin')!
    const hasil = jalankan(lilin, 28, 55)
    expect(hasil.suhu).toBe(55)
    expect(hasil.berhenti).toEqual([55])
  })
})
