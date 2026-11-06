import { describe, expect, it } from 'vitest'
import { SOAL_KUIS } from '../data/quiz'
import { bintangKuis, indeksBenar, siapkanKuis } from './kuis'

describe('data kuis', () => {
  it('berisi 8 soal dengan tepat satu jawaban benar', () => {
    expect(SOAL_KUIS).toHaveLength(8)
    for (const soal of SOAL_KUIS) {
      expect(soal.opsi.filter((o) => o.benar)).toHaveLength(1)
      expect(soal.opsi.length).toBeGreaterThanOrEqual(3)
      expect(soal.penjelasan.length).toBeGreaterThan(40)
      expect(soal.perluVerifikasi).toBe(true)
    }
  })

  it('memuat empat jenis soal yang diminta', () => {
    const id = SOAL_KUIS.map((s) => s.id)
    expect(id).toEqual(
      expect.arrayContaining([
        'ciri-padat',
        'ciri-cair',
        'ciri-gas',
        'proses-mencair',
        'proses-membeku',
        'proses-mengembun',
        'contoh-menjemur',
        'titik-didih',
      ]),
    )
  })

  it('tidak memakai istilah tekanan', () => {
    const teks = SOAL_KUIS.map((s) => `${s.pertanyaan} ${s.penjelasan}`).join(' ')
    expect(teks.toLowerCase()).not.toContain('tekanan')
  })
})

describe('siapkanKuis', () => {
  function rngTetap() {
    let n = 7
    return () => {
      n = (n * 1103515245 + 12345) % 2147483648
      return n / 2147483648
    }
  }

  it('mengacak urutan soal tanpa menghilangkan satu pun', () => {
    const hasil = siapkanKuis(SOAL_KUIS, rngTetap())
    expect(hasil).toHaveLength(SOAL_KUIS.length)
    expect(new Set(hasil.map((s) => s.id))).toEqual(new Set(SOAL_KUIS.map((s) => s.id)))
    expect(hasil.map((s) => s.id)).not.toEqual(SOAL_KUIS.map((s) => s.id))
  })

  it('mengacak opsi tanpa menghilangkan atau menggandakan', () => {
    const hasil = siapkanKuis(SOAL_KUIS, rngTetap())
    for (const soal of hasil) {
      const asli = SOAL_KUIS.find((s) => s.id === soal.id)!
      expect([...soal.opsi].map((o) => o.teks).sort()).toEqual(
        [...asli.opsi].map((o) => o.teks).sort(),
      )
      expect(indeksBenar(soal)).toBeGreaterThanOrEqual(0)
    }
  })

  it('dengan rng yang sama hasilnya sama (bisa diuji)', () => {
    const a = siapkanKuis(SOAL_KUIS, rngTetap())
    const b = siapkanKuis(SOAL_KUIS, rngTetap())
    expect(a.map((s) => s.id)).toEqual(b.map((s) => s.id))
  })
})

describe('bintangKuis', () => {
  it('7–8 benar dari 8 soal mendapat 3 bintang', () => {
    expect(bintangKuis(8, 8)).toBe(3)
    expect(bintangKuis(7, 8)).toBe(3)
  })

  it('5–6 benar mendapat 2 bintang', () => {
    expect(bintangKuis(6, 8)).toBe(2)
    expect(bintangKuis(5, 8)).toBe(2)
  })

  it('di bawah 5 benar tetap mendapat 1 bintang', () => {
    expect(bintangKuis(4, 8)).toBe(1)
    expect(bintangKuis(0, 8)).toBe(1)
  })

  it('tidak pernah 0 bintang', () => {
    expect(bintangKuis(0, 0)).toBe(1)
  })
})
