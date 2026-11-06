export interface ContohUntungRugi {
  id: string
  kategori: 'untung' | 'rugi'
  judul: string
  proses: string
  deskripsi: string
  pesanTetes: string
  perluVerifikasi: boolean
}

export const CONTOH_UNTUNG_RUGI: ContohUntungRugi[] = [
  // MENGUNTUNGKAN (5)
  {
    id: 'u-1',
    kategori: 'untung',
    judul: 'Hujan Penyiram Tanaman',
    proses: 'Menguap & Mengembun',
    deskripsi: 'Air laut menguap dan mengembun jadi awan, lalu turun sebagai hujan untuk menyiram sawah dan memberi minum.',
    pesanTetes: 'Hujan bikin tumbuhan subur dan kita punya air bersih!',
    perluVerifikasi: true,
  },
  {
    id: 'u-2',
    kategori: 'untung',
    judul: 'Menjemur Pakaian',
    proses: 'Menguap',
    deskripsi: 'Air basah di pakaian menyerap panas matahari dan menguap ke udara sehingga baju jadi kering.',
    pesanTetes: 'Baju basah jadi kering dan harum berkat panas matahari.',
    perluVerifikasi: true,
  },
  {
    id: 'u-3',
    kategori: 'untung',
    judul: 'Pembuatan Garam Laut',
    proses: 'Menguap',
    deskripsi: 'Petani garam menjemur air laut di ladang garam; airnya menguap habis dan meninggalkan kristal garam.',
    pesanTetes: 'Garam dapur di rumah kita asalnya dari air laut yang menguap!',
    perluVerifikasi: true,
  },
  {
    id: 'u-4',
    kategori: 'untung',
    judul: 'Es Batu Pengawet Ikan',
    proses: 'Mencair',
    deskripsi: 'Es batu menyerap panas dari udara sambil mencair perlahan, menjaga ikan dan makanan tetap segar.',
    pesanTetes: 'Es batu menjaga makanan di pasar tetap segar tidak cepat busuk.',
    perluVerifikasi: true,
  },
  {
    id: 'u-5',
    kategori: 'untung',
    judul: 'Mencetak Cokelat / Agar-agar',
    proses: 'Mencair & Membeku',
    deskripsi: 'Cokelat atau agar-agar dicairkan saat dimasak, lalu dituang ke cetakan dan dibekukan jadi bentuk lucu.',
    pesanTetes: 'Nikmat sekali makan agar-agar kenyal bentuk bintang!',
    perluVerifikasi: true,
  },

  // MERUGIKAN (5)
  {
    id: 'r-1',
    kategori: 'rugi',
    judul: 'Es Kutub Mencair',
    proses: 'Mencair',
    deskripsi: 'Karena bumi makin hangat, es di kutub utara mencair perlahan dan membuat daratan beruang kutub menyusut.',
    pesanTetes: 'Kasihan beruang kutub rumahnya mengecil. Kita harus jaga bumi tetap sejuk!',
    perluVerifikasi: true,
  },
  {
    id: 'r-2',
    kategori: 'rugi',
    judul: 'Es Krim Meleleh Cepat',
    proses: 'Mencair',
    deskripsi: 'Es krim kesukaanmu mencair menetes ke tangan karena cuaca di luar terlalu panas.',
    pesanTetes: 'Duh, es krimnya jadi cair sebelum sempat dihabiskan!',
    perluVerifikasi: true,
  },
  {
    id: 'r-3',
    kategori: 'rugi',
    judul: 'Kekeringan / Waduk Menyusut',
    proses: 'Menguap',
    deskripsi: 'Saat musim kemarau panjang, air di waduk dan sumur menguap terus menerus sehingga air bersih berkurang.',
    pesanTetes: 'Air sumur bisa kering kalau kemarau terlalu lama dan panas.',
    perluVerifikasi: true,
  },
  {
    id: 'r-4',
    kategori: 'rugi',
    judul: 'Kaca Mobil Berembun',
    proses: 'Mengembun',
    deskripsi: 'Uap air hangat di dalam mobil menempel di kaca dingin lalu mengembun, menghalangi pandangan sopir.',
    pesanTetes: 'Kaca jadi buram dan berair, harus dilap dulu biar kelihatan jalan.',
    perluVerifikasi: true,
  },
  {
    id: 'r-5',
    kategori: 'rugi',
    judul: 'Cokelat Meleleh di Saku',
    proses: 'Mencair',
    deskripsi: 'Cokelat batangan di dalam saku baju meleleh dan lengket karena terkena suhu panas tubuh.',
    pesanTetes: 'Wah, cokelatnya jadi lembek dan lengket semua di baju!',
    perluVerifikasi: true,
  },
]
