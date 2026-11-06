import type { Benda, BendaId } from '../types'

export const BENDA_LIST: Benda[] = [
  {
    id: 'es',
    nama: 'Es batu',
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
    id: 'cokelat',
    nama: 'Cokelat',
    keterangan: 'Cokelat padat saat dingin. Coba panaskan perlahan.',
    suhuAwal: 25,
    suhuMin: 0,
    suhuMaks: 60,
    fase: [
      { mulai: 0, wujud: 'padat' },
      { mulai: 33, wujud: 'cair' },
    ],
    perluVerifikasi: true,
    prediksi: {
      pertanyaan: 'Menurutmu, cokelat yang dipanaskan akan jadi apa?',
      benar: 'cair',
    },
  },
  {
    id: 'kapur-barus',
    nama: 'Kapur barus',
    keterangan: 'Kapur barus adalah benda padat yang menyublim langsung menjadi gas wangi saat dipanaskan tanpa mencair.',
    suhuAwal: 28,
    suhuMin: -10,
    suhuMaks: 100,
    fase: [
      { mulai: -10, wujud: 'padat' },
      { mulai: 40, wujud: 'gas' },
    ],
    perluVerifikasi: true,
    prediksi: {
      pertanyaan: 'Menurutmu, kapur barus yang dipanaskan akan langsung berubah jadi apa?',
      benar: 'gas',
    },
  },
  {
    id: 'panci',
    nama: 'Air di panci',
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

export const BENDA: Record<BendaId, Benda> = BENDA_LIST.reduce((acc, benda) => {
  acc[benda.id] = benda
  return acc
}, {} as Record<BendaId, Benda>)
