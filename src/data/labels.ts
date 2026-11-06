import type { Arah, Benda, NamaProses, Wujud } from '../types'

export const LABEL_WUJUD: Record<Wujud, string> = {
  padat: 'Padat',
  cair: 'Cair',
  gas: 'Gas',
}

export const PENJELASAN_WUJUD: Record<Wujud, string> = {
  padat: 'Bentuk dan isinya tetap.',
  cair: 'Bentuknya ikut wadah, isinya tetap.',
  gas: 'Bentuk dan isinya memenuhi tempat.',
}

export const LABEL_PROSES: Record<NamaProses, string> = {
  mencair: 'Mencair',
  membeku: 'Membeku',
  menguap: 'Menguap',
  mendidih: 'Mendidih',
  mengembun: 'Mengembun',
}

export const PENJELASAN_PROSES: Record<NamaProses, string> = {
  mencair: 'Benda padat berubah jadi cair karena dipanaskan.',
  membeku: 'Benda cair berubah jadi padat karena didinginkan.',
  menguap: 'Air berubah jadi uap air karena dipanaskan.',
  mendidih: 'Air yang sangat panas mengeluarkan banyak uap.',
  mengembun: 'Uap air berubah jadi air karena didinginkan.',
}

export const LABEL_ARAH: Record<Arah, string> = {
  panas: 'Panas',
  dingin: 'Dingin',
}

/** "Es batu + Panas = Mencair" — the line saved in the scientist notebook. */
export function teksCatatan(benda: Benda, proses: NamaProses, arah: Arah): string {
  return `${benda.nama} + ${LABEL_ARAH[arah]} = ${LABEL_PROSES[proses]}`
}
