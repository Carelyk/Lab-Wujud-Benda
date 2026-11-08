import type { ItemSortir } from '../types'

/**
 * The catalog contains extra examples for future material, while the visible
 * round intentionally uses ten benda (4 padat, 3 cair, 3 gas).
 *
 * Every answer carries a short explanation and hint. Content is marked
 * `perluVerifikasi` when a teacher should check the wording against the
 * grade-4 IPAS book before classroom use.
 */
const KATALOG_SORTIR: ItemSortir[] = [
  // ---------- padat (5) ----------
  {
    id: 'batu',
    nama: 'Batu',
    wujud: 'padat',
    alasan: 'Batu keras dan bentuknya tetap, jadi batu termasuk padat.',
    petunjuk: 'Coba pegang batu. Apakah bentuknya berubah mengikuti wadah?',
    perluVerifikasi: false,
  },
  {
    id: 'kayu',
    nama: 'Kayu',
    wujud: 'padat',
    alasan: 'Kayu keras dan bentuknya tetap walaupun dipindahkan.',
    petunjuk: 'Bentuk kayu tetap. Benda seperti ini tidak mengikuti wadah.',
    perluVerifikasi: false,
  },
  {
    id: 'es',
    nama: 'Es batu',
    wujud: 'padat',
    alasan: 'Es batu punya bentuk sendiri dan tidak mengikuti wadah.',
    petunjuk: 'Es batu terasa keras dan bentuknya tetap. Itu ciri benda padat.',
    perluVerifikasi: false,
  },
  {
    id: 'sendok',
    nama: 'Sendok besi',
    wujud: 'padat',
    alasan: 'Sendok besi keras dan bentuknya tetap, jadi termasuk padat.',
    petunjuk: 'Benda keras yang bentuknya tidak berubah termasuk padat.',
    perluVerifikasi: false,
  },
  {
    id: 'buku',
    nama: 'Buku',
    wujud: 'padat',
    alasan: 'Buku punya bentuk tetap dan tidak mengikuti bentuk tas.',
    petunjuk: 'Buku tetap berbentuk buku di mana pun diletakkan.',
    perluVerifikasi: false,
  },

  // ---------- cair (4) ----------
  {
    id: 'air',
    nama: 'Air',
    wujud: 'cair',
    alasan: 'Air bentuknya mengikuti wadah, jadi air termasuk cair.',
    petunjuk: 'Air mengikuti bentuk gelas. Itu ciri benda cair.',
    perluVerifikasi: false,
  },
  {
    id: 'minyak',
    nama: 'Minyak goreng',
    wujud: 'cair',
    alasan: 'Minyak mengalir dan bentuknya mengikuti wadah, jadi cair.',
    petunjuk: 'Coba tuang minyak. Apakah ia mengikuti bentuk wadah?',
    perluVerifikasi: false,
  },
  {
    id: 'susu',
    nama: 'Susu',
    wujud: 'cair',
    alasan: 'Susu mengalir dan bentuknya mengikuti wadah, jadi cair.',
    petunjuk: 'Susu bisa dituang dan mengikuti bentuk gelas.',
    perluVerifikasi: false,
  },
  {
    id: 'sirup',
    nama: 'Sirup',
    wujud: 'cair',
    alasan: 'Sirup memang kental, tetapi tetap mengalir dan mengikuti wadah.',
    petunjuk: 'Sirup kental, tetapi masih bisa dituang. Benda cair bisa mengalir.',
    perluVerifikasi: false,
  },

  // ---------- gas (3) ----------
  {
    id: 'balon',
    nama: 'Udara di balon',
    wujud: 'gas',
    alasan: 'Balon berisi udara. Udara memenuhi seluruh balon, jadi gas.',
    petunjuk: 'Isi balon tidak terlihat, tetapi memenuhi ruang di dalamnya.',
    perluVerifikasi: false,
  },
  {
    id: 'uap',
    nama: 'Uap air',
    wujud: 'gas',
    alasan: 'Uap air naik dan menyebar memenuhi udara, jadi gas.',
    petunjuk: 'Uap tidak memegang bentuk. Ia menyebar ke seluruh ruang.',
    perluVerifikasi: false,
  },
  {
    id: 'oksigen',
    nama: 'Oksigen',
    wujud: 'gas',
    alasan: 'Oksigen adalah gas yang kita hirup dan memenuhi ruang.',
    petunjuk: 'Oksigen tidak terlihat, tetapi ada di udara dan memenuhi ruang.',
    perluVerifikasi: false,
  },

  // ---------- tantangan (5) ----------
  {
    id: 'pasir',
    nama: 'Pasir',
    wujud: 'padat',
    alasan:
      'Butir pasir memang kecil, tetapi setiap butir tetap punya bentuk. Pasir termasuk padat.',
    petunjuk: 'Butiran kecil belum tentu cair. Apakah setiap butir punya bentuk?',
    tantangan: true,
    perluVerifikasi: true,
  },
  {
    id: 'garam',
    nama: 'Garam',
    wujud: 'padat',
    alasan:
      'Garam berbentuk butiran kecil. Butirannya tetap, tidak mengikuti wadah seperti air.',
    petunjuk: 'Garam tetap butiran walaupun wadahnya berubah.',
    tantangan: true,
    perluVerifikasi: true,
  },
  {
    id: 'tepung',
    nama: 'Tepung',
    wujud: 'padat',
    alasan: 'Tepung adalah serbuk halus. Serbuk tetap benda padat.',
    petunjuk: 'Serbuk sangat halus, tetapi tetap punya butiran. Apakah itu gas?',
    tantangan: true,
    perluVerifikasi: true,
  },
  {
    id: 'busa',
    nama: 'Busa',
    wujud: 'gas',
    alasan:
      'Busa berisi banyak sekali gelembung udara. Udara adalah gas, jadi busa kita kelompokkan sebagai gas.',
    petunjuk: 'Coba lihat gelembung di dalam busa. Isinya apa?',
    tantangan: true,
    perluVerifikasi: true,
  },
  {
    id: 'awan',
    nama: 'Awan',
    wujud: 'cair',
    alasan:
      'Awan adalah kumpulan titik-titik air yang sangat kecil. Titik air itu cair.',
    petunjuk: 'Awan terbuat dari titik air, bukan kapas atau asap.',
    tantangan: true,
    perluVerifikasi: true,
  },
]

const ID_ITEM_UTAMA = new Set([
  'batu',
  'kayu',
  'es',
  'buku',
  'air',
  'minyak',
  'sirup',
  'balon',
  'uap',
  'oksigen',
])

export const ITEM_SORTIR = KATALOG_SORTIR.filter((i) => ID_ITEM_UTAMA.has(i.id))
export const ITEM_UTAMA = ITEM_SORTIR
export const ITEM_TANTANGAN: ItemSortir[] = []

export function itemSortirDari(id: string): ItemSortir | undefined {
  return ITEM_SORTIR.find((i) => i.id === id)
}
