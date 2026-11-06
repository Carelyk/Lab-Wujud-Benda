import { describe, expect, it } from 'vitest'
import type { BendaId, CatatanEntry, NamaProses, Progress } from '../types'
import { progressAwal } from './storage'
import { lencanaTerbuka } from './lencana'

function progres(patch: Partial<Progress> = {}): Progress {
  return {
    ...progressAwal,
    catatan: [],
    prediksi: {},
    lencana: [],
    kuis: { ...progressAwal.kuis },
    sortir: { ...progressAwal.sortir },
    partikel: { dilihat: [] },
    siklus: { ...progressAwal.siklus },
    ...patch,
  }
}

function catatan(bendaId: BendaId, proses: NamaProses, n = 0): CatatanEntry {
  return {
    id: `${bendaId}-${proses}-${n}`,
    bendaId,
    proses,
    arah: proses === 'membeku' ? 'dingin' : 'panas',
    teks: 'uji',
    waktu: 1,
  }
}

describe('lencanaTerbuka', () => {
  it('progres kosong belum membuka lencana apa pun', () => {
    expect(lencanaTerbuka(progres())).toEqual([])
  })

  it('Ahli Membeku terbuka setelah ada catatan membeku', () => {
    const p = progres({ catatan: [catatan('air', 'membeku')] })
    expect(lencanaTerbuka(p)).toContain('ahli-membeku')
    expect(lencanaTerbuka(p)).not.toContain('pawang-uap')
  })

  it('Pawang Uap terbuka dari menguap atau mendidih', () => {
    expect(lencanaTerbuka(progres({ catatan: [catatan('air', 'menguap')] }))).toContain(
      'pawang-uap',
    )
    expect(lencanaTerbuka(progres({ catatan: [catatan('panci', 'mendidih')] }))).toContain(
      'pawang-uap',
    )
  })

  it('Si Pelumer butuh mencair pada lima benda berbeda', () => {
    const empat = progres({
      catatan: [
        catatan('es', 'mencair'),
        catatan('air', 'mencair'),
        catatan('lilin', 'mencair'),
        catatan('cokelat', 'mencair'),
      ],
    })
    expect(lencanaTerbuka(empat)).not.toContain('si-pelumer')

    const lima = progres({
      catatan: [
        catatan('es', 'mencair'),
        catatan('air', 'mencair'),
        catatan('lilin', 'mencair'),
        catatan('cokelat', 'mencair'),
        catatan('panci', 'mencair'),
      ],
    })
    expect(lencanaTerbuka(lima)).toContain('si-pelumer')
  })

  it('Penyortir Handal butuh sortir selesai dan minimal 2 bintang', () => {
    const kurang = progres({
      sortir: { ...progressAwal.sortir, selesai: true, bintang: 1 },
    })
    expect(lencanaTerbuka(kurang)).not.toContain('penyortir-handal')

    const cukup = progres({
      sortir: { ...progressAwal.sortir, selesai: true, bintang: 2 },
    })
    expect(lencanaTerbuka(cukup)).toContain('penyortir-handal')
  })

  it('Bintang Kuis butuh 3 bintang', () => {
    const dua = progres({ kuis: { ...progressAwal.kuis, bintang: 2 } })
    expect(lencanaTerbuka(dua)).not.toContain('bintang-kuis')

    const tiga = progres({ kuis: { ...progressAwal.kuis, bintang: 3 } })
    expect(lencanaTerbuka(tiga)).toContain('bintang-kuis')
  })

  it('Ilmuwan Cilik terbuka pada catatan keenam', () => {
    const lima = progres({
      catatan: [
        catatan('es', 'mencair', 1),
        catatan('es', 'membeku', 2),
        catatan('air', 'menguap', 3),
        catatan('air', 'membeku', 4),
        catatan('panci', 'mendidih', 5),
      ],
    })
    expect(lencanaTerbuka(lima)).not.toContain('ilmuwan-cilik')

    const enam = progres({
      catatan: [...lima.catatan, catatan('lilin', 'mencair', 6)],
    })
    expect(lencanaTerbuka(enam)).toContain('ilmuwan-cilik')
  })

  it('Mata Ilmuwan butuh ketiga wujud dilihat', () => {
    const dua = progres({ partikel: { dilihat: ['padat', 'cair'] } })
    expect(lencanaTerbuka(dua)).not.toContain('mata-ilmuwan')

    const tiga = progres({ partikel: { dilihat: ['padat', 'cair', 'gas'] } })
    expect(lencanaTerbuka(tiga)).toContain('mata-ilmuwan')
  })

  it('Penjaga Siklus Air terbuka setelah tantangan selesai', () => {
    expect(lencanaTerbuka(progres())).not.toContain('penjaga-siklus')
    expect(lencanaTerbuka(progres({ siklus: { selesai: true } }))).toContain('penjaga-siklus')
  })

  it('tidak pernah mengembalikan id ganda', () => {
    const p = progres({
      catatan: [
        catatan('es', 'mencair'),
        catatan('air', 'membeku'),
        catatan('panci', 'mendidih'),
      ],
      kuis: { ...progressAwal.kuis, bintang: 3 },
      siklus: { selesai: true },
    })
    const ids = lencanaTerbuka(p)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
