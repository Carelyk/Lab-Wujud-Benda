import type { ItemSortir } from '../types'

/**
 * Stars for one sorting round. Every item is eventually placed correctly, so
 * the score counts wrong attempts, not leftover items.
 *
 * 12 main items: 0 wrong = 3 stars, 1–2 wrong = 2, more = 1.
 * 5 challenge items: 0 wrong = 3, 1 wrong = 2, more = 1.
 */
export function bintangSortir(total: number, salah: number): 1 | 2 | 3 {
  if (total <= 0) return 1
  if (salah <= 0) return 3
  if (salah <= Math.floor(total * 0.2)) return 2
  return 1
}

/** Items with at least one wrong attempt, most-missed first. */
export function itemSeringSalah(
  salah: Record<string, number>,
  items: ItemSortir[],
): ItemSortir[] {
  return items
    .filter((i) => (salah[i.id] ?? 0) > 0)
    .sort((a, b) => (salah[b.id] ?? 0) - (salah[a.id] ?? 0))
}
