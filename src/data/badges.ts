import type { Lencana } from '../types'

/**
 * Every badge is earned by a real action in the app. Nothing is given for
 * simply opening a screen.
 */
export const DAFTAR_LENCANA: Lencana[] = [
  {
    id: 'ahli-membeku',
    nama: 'Ahli Membeku',
    cara: 'Buat satu benda membeku di Eksperimen.',
    jenis: 'beku',
  },
  {
    id: 'pawang-uap',
    nama: 'Pawang Uap',
    cara: 'Temukan air yang menguap atau mendidih.',
    jenis: 'uap',
  },
  {
    id: 'si-pelumer',
    nama: 'Si Pelumer',
    cara: 'Mencairkan kelima benda di Eksperimen.',
    jenis: 'leleh',
  },
  {
    id: 'penyortir-handal',
    nama: 'Penyortir Handal',
    cara: 'Selesaikan Sortir Benda utama dengan minimal 2 bintang.',
    jenis: 'sortir',
  },
  {
    id: 'bintang-kuis',
    nama: 'Bintang Kuis',
    cara: 'Raih 3 bintang di Kuis Bintang.',
    jenis: 'kuis',
  },
  {
    id: 'ilmuwan-cilik',
    nama: 'Ilmuwan Cilik',
    cara: 'Kumpulkan 6 catatan di Buku Ilmuwan Cilik.',
    jenis: 'buku',
  },
  {
    id: 'mata-ilmuwan',
    nama: 'Mata Ilmuwan',
    cara: 'Lihat partikel pada wujud padat, cair, dan gas.',
    jenis: 'lens',
  },
  {
    id: 'penjaga-siklus',
    nama: 'Penjaga Siklus Air',
    cara: 'Selesaikan tantangan urutan siklus air.',
    jenis: 'siklus',
  },
]

export function lencanaDari(id: string): Lencana | undefined {
  return DAFTAR_LENCANA.find((l) => l.id === id)
}
