import { describe, expect, it } from 'vitest'
import { ITEM_SORTIR, ITEM_TANTANGAN, ITEM_UTAMA } from '../data/sortingItems'
import { bintangSortir, itemSeringSalah } from './sortir'

describe('data sortir', () => {
  it('berisi 12 benda utama dan 5 tantangan', () => {
    expect(ITEM_UTAMA).toHaveLength(12)
    expect(ITEM_TANTANGAN).toHaveLength(5)
    expect(ITEM_SORTIR).toHaveLength(17)
  })

  it('komposisi wujud utama seimbang: 5 padat, 4 cair, 3 gas', () => {
    const hitung = (w: string) => ITEM_UTAMA.filter((i) => i.wujud === w).length
    expect(hitung('padat')).toBe(5)
    expect(hitung('cair')).toBe(4)
    expect(hitung('gas')).toBe(3)
  })

  it('setiap item punya alasan dan petunjuk, id unik', () => {
    const id = new Set<string>()
    for (const item of ITEM_SORTIR) {
      expect(item.alasan.length).toBeGreaterThan(20)
      expect(item.petunjuk.length).toBeGreaterThan(15)
      expect(id.has(item.id)).toBe(false)
      id.add(item.id)
    }
  })

  it('semua tantangan ditandai perlu diverifikasi', () => {
    for (const item of ITEM_TANTANGAN) {
      expect(item.tantangan).toBe(true)
      expect(item.perluVerifikasi).toBe(true)
    }
  })
})

describe('bintangSortir', () => {
  it('tanpa salah mendapat 3 bintang', () => {
    expect(bintangSortir(12, 0)).toBe(3)
    expect(bintangSortir(5, 0)).toBe(3)
  })

  it('sedikit salah mendapat 2 bintang', () => {
    expect(bintangSortir(12, 1)).toBe(2)
    expect(bintangSortir(12, 2)).toBe(2)
    expect(bintangSortir(5, 1)).toBe(2)
  })

  it('banyak salah tetap mendapat 1 bintang', () => {
    expect(bintangSortir(12, 3)).toBe(1)
    expect(bintangSortir(5, 2)).toBe(1)
  })

  it('hasil tidak pernah 0 bintang', () => {
    expect(bintangSortir(0, 0)).toBe(1)
    expect(bintangSortir(12, 99)).toBe(1)
  })
})

describe('itemSeringSalah', () => {
  it('mengurutkan dari yang paling sering salah', () => {
    const hasil = itemSeringSalah({ air: 1, batu: 3, kayu: 2 }, ITEM_UTAMA)
    expect(hasil.map((i) => i.id)).toEqual(['batu', 'kayu', 'air'])
  })

  it('mengabaikan item yang tidak pernah salah', () => {
    expect(itemSeringSalah({}, ITEM_UTAMA)).toEqual([])
    expect(itemSeringSalah({ air: 0 }, ITEM_UTAMA)).toEqual([])
  })
})
