import type { Benda, BendaId } from '../types'

/**
 * Content lives here, never inside components.
 *
 * How the data works
 * ------------------
 * `fase` is a list of temperature bands, sorted ascending by `mulai`.
 * A benda is in the last band whose `mulai` is <= the current temperature.
 *
 * Liquids also carry `uap`:
 *   - `tipis`  : thin steam starts to rise (menguap perlahan)
 *   - `didih`  : boiling point (mendidih)
 * The `didih` value must be the same as the `mulai` of the gas band, so the
 * label and the animation can never disagree. The unit test checks this.
 *
 * Everything here uses temperature only. No pressure, no other variables.
 */
export const BENDA_LIST: Benda[] = [
  {
    id: 'es',
    nama: 'Es batu',
    emoji: '🧊',
    keterangan: 'Es batu keras, bentuknya tetap. Coba panaskan.',
    suhuAwal: -5,
    suhuMin: -20,
    suhuMaks: 120,
    fase: [
      { mulai: -20, wujud: 'padat' },
      { mulai: 0, wujud: 'cair' },
      { mulai: 100, wujud: 'gas' },
    ],
    uap: { tipis: 30, didih: 100 },
    perluVerifikasi: true,
    prediksi: {
      pertanyaan: 'Menurutmu, es batu yang dipanaskan akan jadi apa?',
      benar: 'cair',
    },
  },
  {
    id: 'air',
    nama: 'Air',
    emoji: '💧',
    keterangan: 'Air mengikuti bentuk gelas. Coba dinginkan sampai beku.',
    suhuAwal: 25,
    suhuMin: -20,
    suhuMaks: 120,
    fase: [
      { mulai: -20, wujud: 'padat' },
      { mulai: 0, wujud: 'cair' },
      { mulai: 100, wujud: 'gas' },
    ],
    uap: { tipis: 30, didih: 100 },
    perluVerifikasi: true,
    prediksi: {
      pertanyaan: 'Menurutmu, air yang dipanaskan terus akan jadi apa?',
      benar: 'gas',
    },
  },
  {
    id: 'lilin',
    nama: 'Lilin',
    emoji: '🕯️',
    keterangan: 'Lilin padat saat dingin. Coba panaskan sampai meleleh.',
    suhuAwal: 28,
    suhuMin: -20,
    suhuMaks: 100,
    fase: [
      { mulai: -20, wujud: 'padat' },
      { mulai: 55, wujud: 'cair' },
    ],
    perluVerifikasi: true,
    prediksi: {
      pertanyaan: 'Menurutmu, lilin yang dipanaskan akan jadi apa?',
      benar: 'cair',
    },
  },
  {
    id: 'kapur-barus',
    nama: 'Kapur barus',
    emoji: '⚪',
    keterangan: 'Kapur barus padat di suhu ruang. Panaskan perlahan untuk melihatnya menyublim menjadi gas wangi!',
    suhuAwal: 28,
    suhuMin: -10,
    suhuMaks: 100,
    fase: [
      { mulai: -10, wujud: 'padat' },
      { mulai: 40, wujud: 'cair' },
      { mulai: 80, wujud: 'gas' },
    ],
    uap: { tipis: 40, didih: 80 },
    perluVerifikasi: true,
    prediksi: {
      pertanyaan: 'Menurutmu, kapur barus yang dipanaskan akan jadi apa?',
      benar: 'gas',
    },
  },
  {
    id: 'panci',
    nama: 'Air di panci',
    emoji: '🍲',
    keterangan: 'Air di panci bisa membeku dan mendidih. Coba keduanya.',
    suhuAwal: 25,
    suhuMin: -20,
    suhuMaks: 120,
    fase: [
      { mulai: -20, wujud: 'padat' },
      { mulai: 0, wujud: 'cair' },
      { mulai: 100, wujud: 'gas' },
    ],
    uap: { tipis: 30, didih: 100 },
    perluVerifikasi: true,
    prediksi: {
      pertanyaan: 'Menurutmu, air di panci yang dipanaskan terus akan jadi apa?',
      benar: 'gas',
    },
  },
]

export const BENDA: Record<BendaId, Benda> = Object.fromEntries(
  BENDA_LIST.map((b) => [b.id, b]),
) as Record<BendaId, Benda>

export function bendaDari(id: string): Benda {
  return BENDA[id as BendaId] ?? BENDA.es
}
