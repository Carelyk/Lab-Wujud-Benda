import { describe, it, expect } from 'vitest'
import { formatSubjekCatatan, progressAwal } from './storage'
import type { BendaId, NamaProses, Arah } from '../types'

describe('Migrasi Data v1 ke v2 & Validasi Ketat', () => {
  it('berhasil memigrasi catatan rusak/mengandung emoji ke teks bersih, lencana/kuis/sortir/partikel utuh', () => {
    const dataV1 = {
      ...progressAwal,
      catatan: [
        { id: 'c1', bendaId: 'air' as BendaId, proses: 'mengembun' as NamaProses, arah: 'dingin' as Arah, teks: '\u00F0\u0178\u2019\u00A7 Air + Dingin = Mengembun', waktu: 1000 },
        { id: 'c2', bendaId: 'es' as BendaId, proses: 'mencair' as NamaProses, arah: 'panas' as Arah, teks: 'Es + Panas = Mencair', waktu: 2000 },
      ],
      lencana: ['beku', 'uap'],
      kuis: { bintang: 3, benar: 5, total: 5, main: 1 },
      sortir: { selesai: true, benar: 8, total: 8, bintang: 3, salah: 0, main: 1 },
      partikel: { dilihat: ['padat', 'cair'] },
    }

    const hasilCatatan = dataV1.catatan.map((c, idx) => {
      const bendaId = c.bendaId
      const proses = c.proses
      const arah = c.arah
      const teksBaru = formatSubjekCatatan(bendaId, proses, arah)
      return {
        id: c.id || `migrasi-${bendaId}-${proses}-${idx}`,
        bendaId,
        proses,
        arah,
        teks: teksBaru,
        waktu: c.waktu,
      }
    })

    expect(hasilCatatan[0].teks).toBe('Uap air + Dingin = Mengembun')
    expect(dataV1.lencana).toEqual(['beku', 'uap'])
    expect(dataV1.kuis.benar).toBe(5)
    expect(dataV1.sortir.benar).toBe(8)
    expect(dataV1.partikel.dilihat).toEqual(['padat', 'cair'])
  })

  it('idempoten: dua kali migrasi menghasilkan nilai yang sama persis', () => {
    const teks1 = formatSubjekCatatan('air', 'mengembun', 'dingin')
    const teks2 = formatSubjekCatatan('air', 'mengembun', 'dingin')
    expect(teks1).toBe(teks2)
  })

  it('catatan tak dikenal tidak membuat crash dan diformat aman', () => {
    const subjek = formatSubjekCatatan('es', 'mencair', 'panas')
    expect(subjek).toBe('Es + Panas = Mencair')
  })

  it('uji fungsi penamaan subjek untuk semua benda dan proses utama', () => {
    expect(formatSubjekCatatan('es', 'mencair', 'panas')).toBe('Es + Panas = Mencair')
    expect(formatSubjekCatatan('air', 'menguap', 'panas')).toBe('Air + Panas = Menguap')
    expect(formatSubjekCatatan('air', 'mengembun', 'dingin')).toBe('Uap air + Dingin = Mengembun')
    expect(formatSubjekCatatan('lilin', 'membeku', 'dingin')).toBe('Lilin + Dingin = Membeku')
    expect(formatSubjekCatatan('cokelat', 'mencair', 'panas')).toBe('Cokelat + Panas = Mencair')
    expect(formatSubjekCatatan('kapur-barus', 'menyublim', 'panas')).toBe('Kapur barus + Panas = Menyublim')
  })
})
