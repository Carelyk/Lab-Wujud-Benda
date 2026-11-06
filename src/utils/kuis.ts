import { AMBANG_KUIS, SOAL_KUIS } from '../data/quiz'
import type { SoalKuis } from '../types'
import { acak } from './acak'

/**
 * A fresh quiz run: question order and option order are both shuffled.
 * The caller passes a seeded rng in tests, Math.random in the screen.
 */
export function siapkanKuis(
  soal: readonly SoalKuis[] = SOAL_KUIS,
  rng: () => number = Math.random,
): SoalKuis[] {
  return acak(soal, rng).map((s) => ({ ...s, opsi: acak(s.opsi, rng) }))
}

/** Index of the only correct option in a prepared question. */
export function indeksBenar(soal: SoalKuis): number {
  return soal.opsi.findIndex((o) => o.benar)
}

/**
 * 1–3 stars. The thresholds live in data/quiz.ts and are expressed for the
 * eight-question set; other totals are scaled so tests can use small numbers.
 */
export function bintangKuis(benar: number, total: number): 1 | 2 | 3 {
  if (total <= 0) return 1
  const batasTiga = Math.ceil((AMBANG_KUIS.tiga / SOAL_KUIS.length) * total)
  const batasDua = Math.ceil((AMBANG_KUIS.dua / SOAL_KUIS.length) * total)
  if (benar >= batasTiga) return 3
  if (benar >= batasDua) return 2
  return 1
}
