/**
 * Fisher–Yates shuffle on a copy. Pass a seeded rng in tests to get a
 * predictable order; components use Math.random.
 */
export function acak<T>(data: readonly T[], rng: () => number = Math.random): T[] {
  const hasil = [...data]
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = hasil[i]
    hasil[i] = hasil[j]
    hasil[j] = tmp
  }
  return hasil
}
