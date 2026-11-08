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
  menyublim: 'Menyublim',
  mengkristal: 'Mengkristal',
}

export const PENJELASAN_PROSES: Record<NamaProses, string> = {
  mencair: 'Benda padat berubah jadi cair karena dipanaskan.',
  membeku: 'Benda cair berubah jadi padat karena didinginkan.',
  menguap: 'Air berubah jadi uap air karena dipanaskan.',
  mendidih: 'Air yang sangat panas mengeluarkan banyak uap.',
  mengembun: 'Uap air berubah jadi air karena didinginkan.',
  menyublim: 'Benda padat berubah langsung jadi gas tanpa mencair.',
  mengkristal: 'Gas berubah langsung jadi padat.',
}

export const LABEL_ARAH: Record<Arah, string> = {
  panas: 'Panas',
  dingin: 'Dingin',
}

export const KOMENTAR_PROSES: Record<NamaProses, string> = {
  mencair: 'Lihat, benda mulai melunak dan berubah menjadi cair.',
  membeku: 'Lihat, cairannya mulai mengeras menjadi padat.',
  menguap: 'Perhatikan uap tipis yang mulai naik dari air.',
  mendidih: 'Gelembung dan uapnya banyak. Air sedang mendidih.',
  mengembun: 'Uap yang mendingin berubah lagi menjadi titik air.',
  menyublim: 'Kapur barus berubah langsung dari padat menjadi gas.',
  mengkristal: 'Gas yang sangat dingin dapat berubah menjadi padat.',
}

/** "Es batu + Panas = Mencair" — the line saved in the scientist notebook. */
export function teksCatatan(benda: Benda, proses: NamaProses, arah: Arah): string {
  return `${benda.nama} + ${LABEL_ARAH[arah]} = ${LABEL_PROSES[proses]}`
}
