import type { SoalKuis } from '../types'

/**
 * Quiz content. Ten questions mix four kinds of thinking:
 * ciri wujud, nama proses, sebab-akibat, and everyday examples.
 *
 * Only temperature is used. No pressure and no "menyublim" in Tahap 2.
 * Every question is marked `perluVerifikasi` for the teacher.
 */
export const SOAL_KUIS: SoalKuis[] = [
  {
    id: 'ciri-padat',
    pertanyaan: 'Apa ciri benda padat?',
    opsi: [
      { teks: 'Bentuk dan isinya tetap', benar: true },
      { teks: 'Bentuknya selalu mengikuti wadah', benar: false },
      { teks: 'Selalu tidak terlihat', benar: false },
    ],
    penjelasan:
      'Benda padat mempertahankan bentuk dan isinya. Batu dan buku tetap berbentuk sama walaupun dipindahkan. Benda yang mengikuti wadah adalah benda cair.',
    perluVerifikasi: true,
  },
  {
    id: 'ciri-cair',
    pertanyaan: 'Air dipindahkan dari gelas ke botol. Bagaimana bentuk air sekarang?',
    opsi: [
      { teks: 'Mengikuti bentuk botol', benar: true },
      { teks: 'Tetap berbentuk gelas', benar: false },
      { teks: 'Berubah menjadi gas', benar: false },
    ],
    penjelasan:
      'Benda cair mengikuti bentuk wadahnya. Air di botol berbentuk botol, tetapi jumlah airnya tetap sama.',
    perluVerifikasi: true,
  },
  {
    id: 'ciri-gas',
    pertanyaan: 'Balon ditiup sampai besar. Udara di dalam balon...',
    opsi: [
      { teks: 'Memenuhi seluruh ruang balon', benar: true },
      { teks: 'Hanya berkumpul di dasar balon', benar: false },
      { teks: 'Berubah menjadi air', benar: false },
    ],
    penjelasan:
      'Gas memenuhi seluruh ruang yang ada. Udara menekan ke segala arah sehingga balon mengembang.',
    perluVerifikasi: true,
  },
  {
    id: 'proses-mencair',
    pertanyaan: 'Es batu dibiarkan di ruang panas. Es berubah menjadi air. Proses ini disebut...',
    opsi: [
      { teks: 'Mencair', benar: true },
      { teks: 'Membeku', benar: false },
      { teks: 'Menguap', benar: false },
    ],
    penjelasan:
      'Mencair adalah perubahan dari padat menjadi cair karena dipanaskan. Es menerima panas dari ruangan, lalu meleleh menjadi air.',
    perluVerifikasi: true,
  },
  {
    id: 'proses-membeku',
    pertanyaan: 'Air dimasukkan ke freezer sampai menjadi es. Proses ini disebut...',
    opsi: [
      { teks: 'Membeku', benar: true },
      { teks: 'Mencair', benar: false },
      { teks: 'Mengembun', benar: false },
    ],
    penjelasan:
      'Membeku adalah perubahan dari cair menjadi padat karena didinginkan. Freezer mengambil panas dari air sehingga air menjadi es.',
    perluVerifikasi: true,
  },
  {
    id: 'proses-mengembun',
    pertanyaan:
      'Uap air naik dan menyentuh tutup gelas yang dingin. Uap itu berubah menjadi titik air. Proses ini disebut...',
    opsi: [
      { teks: 'Mengembun', benar: true },
      { teks: 'Menguap', benar: false },
      { teks: 'Mendidih', benar: false },
    ],
    penjelasan:
      'Mengembun adalah perubahan dari gas menjadi cair karena didinginkan. Uap air kehilangan panas saat menyentuh tutup yang dingin, lalu menjadi titik air.',
    perluVerifikasi: true,
  },
  {
    id: 'contoh-menjemur',
    pertanyaan: 'Pakaian basah dijemur di bawah matahari akhirnya kering. Air di pakaian...',
    opsi: [
      { teks: 'Menguap ke udara', benar: true },
      { teks: 'Membeku menjadi es', benar: false },
      { teks: 'Berubah menjadi tanah', benar: false },
    ],
    penjelasan:
      'Panas matahari membuat air di pakaian menguap menjadi uap air. Uap itu pergi ke udara, sehingga pakaian menjadi kering.',
    perluVerifikasi: true,
  },
  {
    id: 'titik-didih',
    pertanyaan: 'Air dipanaskan terus. Pada suhu 100 °C, air...',
    opsi: [
      { teks: 'Mendidih dan keluar banyak uap', benar: true },
      { teks: 'Membeku menjadi es', benar: false },
      { teks: 'Berubah menjadi batu', benar: false },
    ],
    penjelasan:
      'Pada 100 °C air mendidih. Muncul banyak gelembung dan uap air. Di bawah 100 °C air sebenarnya sudah bisa menguap perlahan, tetapi belum mendidih.',
    perluVerifikasi: true,
  },
  {
    id: 'contoh-mengembun',
    pertanyaan: 'Bagian luar gelas berisi es menjadi basah. Dari mana titik air itu berasal?',
    opsi: [
      { teks: 'Uap air di udara yang mengembun', benar: true },
      { teks: 'Air di dalam gelas menembus kaca', benar: false },
      { teks: 'Es berubah menjadi gas', benar: false },
    ],
    penjelasan:
      'Permukaan gelas yang dingin membuat uap air di udara kehilangan panas dan mengembun menjadi titik air di bagian luar gelas.',
    perluVerifikasi: true,
  },
  {
    id: 'sebab-freezer',
    pertanyaan: 'Mengapa air yang diletakkan di freezer dapat berubah menjadi es?',
    opsi: [
      { teks: 'Air kehilangan panas lalu membeku', benar: true },
      { teks: 'Air menerima banyak panas', benar: false },
      { teks: 'Air bercampur dengan udara', benar: false },
    ],
    penjelasan:
      'Di dalam freezer, air kehilangan panas. Ketika cukup dingin, air berubah dari benda cair menjadi benda padat melalui proses membeku.',
    perluVerifikasi: true,
  },
]

/** Stars for a finished quiz out of ten questions. */
export const AMBANG_KUIS = {
  tiga: 9,
  dua: 7,
} as const
