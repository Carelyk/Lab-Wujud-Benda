import type { NamaProses, Wujud } from '../types'

export interface TahapAnimasi {
  mulai: number // 0 sampai 1
  wujud: Wujud
  proses?: NamaProses | 'padat' | 'cair' | 'gas'
  keterangan: string
}

export interface ContohUntungRugiAnimasi {
  id: string
  judul: string
  kategori: 'untung' | 'rugi'
  proses: NamaProses | string
  deskripsi: string
  pesanTetes: string
  tahap: TahapAnimasi[]
  durasiMs: number
  perluVerifikasi: boolean
}

export const CONTOH_UNTUNG_RUGI_ANIMASI: ContohUntungRugiAnimasi[] = [
  {
    id: 'es-krim',
    judul: 'Es Krim Membeku',
    kategori: 'untung',
    proses: 'membeku',
    deskripsi: 'Campuran susu cair dalam wadah didinginkan dengan es dan garam hingga membeku menjadi es krim lembut.',
    pesanTetes: 'Wah, cairan dingin berubah jadi padat yang lezat!',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'cair', keterangan: 'Susu cair di wadah' },
      { mulai: 0.35, wujud: 'cair', proses: 'membeku', keterangan: 'Proses pembekuan' },
      { mulai: 0.85, wujud: 'padat', keterangan: 'Es krim siap dinikmati' },
    ],
  },
  {
    id: 'hujan',
    judul: 'Terjadinya Hujan',
    kategori: 'untung',
    proses: 'menguap & mengembun',
    deskripsi: 'Air laut menguap karena panas matahari, naik ke langit membentuk awan, lalu mengembun dan turun sebagai hujan.',
    pesanTetes: 'Siklus air memberi air bersih untuk tanaman!',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'cair', keterangan: 'Air laut di bumi' },
      { mulai: 0.35, wujud: 'gas', proses: 'menguap', keterangan: 'Uap air naik ke langit' },
      { mulai: 0.85, wujud: 'cair', proses: 'mengembun', keterangan: 'Turun hujan ke daratan' },
    ],
  },
  {
    id: 'baju-kering',
    judul: 'Menjemur Pakaian',
    kategori: 'untung',
    proses: 'menguap',
    deskripsi: 'Air pada pakaian basah menguap terkena panas matahari sehingga pakaian menjadi kering.',
    pesanTetes: 'Pakaian jadi kering dan harum!',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'cair', keterangan: 'Pakaian basah berair' },
      { mulai: 0.4, wujud: 'cair', proses: 'menguap', keterangan: 'Air menguap ke udara' },
      { mulai: 0.85, wujud: 'padat', keterangan: 'Pakaian kering' },
    ],
  },
  {
    id: 'garam-laut',
    judul: 'Pembuatan Garam',
    kategori: 'untung',
    proses: 'menguap',
    deskripsi: 'Air laut di petak tambak dijemur hingga menguap habis, menyisakan kristal garam putih.',
    pesanTetes: 'Kita mendapat garam dapur dari air laut!',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'cair', keterangan: 'Air laut di tambak' },
      { mulai: 0.4, wujud: 'cair', proses: 'menguap', keterangan: 'Air menguap perlahan' },
      { mulai: 0.85, wujud: 'padat', keterangan: 'Kristal garam terbentuk' },
    ],
  },
  {
    id: 'es-pendingin',
    judul: 'Es Batu Pendingin Ikan',
    kategori: 'untung',
    proses: 'mencair',
    deskripsi: 'Es batu menyerap panas dari ikan atau minuman agar tetap dingin dan awet.',
    pesanTetes: 'Ikan tetap segar berkat es batu!',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'padat', keterangan: 'Es batu keras' },
      { mulai: 0.4, wujud: 'padat', proses: 'mencair', keterangan: 'Es mencair jadi air' },
      { mulai: 0.85, wujud: 'cair', keterangan: 'Air dingin menyerap panas' },
    ],
  },
  {
    id: 'cetak-cokelat',
    judul: 'Mencetak Cokelat',
    kategori: 'untung',
    proses: 'mencair & membeku',
    deskripsi: 'Cokelat cair dituangkan ke cetakan lalu didinginkan hingga mengeras menjadi bentuk baru.',
    pesanTetes: 'Cokelat berbentuk indah dan siap dimakan!',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'padat', keterangan: 'Cokelat batangan' },
      { mulai: 0.4, wujud: 'cair', proses: 'mencair', keterangan: 'Cokelat dipanaskan mencair' },
      { mulai: 0.85, wujud: 'padat', proses: 'membeku', keterangan: 'Cokelat mengeras di cetakan' },
    ],
  },
  {
    id: 'es-kutub',
    judul: 'Pencairan Es di Kutub',
    kategori: 'rugi',
    proses: 'mencair',
    deskripsi: 'Suhu bumi yang meningkat membuat es di kutub mencair, mengurangi rumah hewan kutub.',
    pesanTetes: 'Mari jaga bumi tetap sejuk ya!',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'padat', keterangan: 'Bongkahan es besar' },
      { mulai: 0.4, wujud: 'padat', proses: 'mencair', keterangan: 'Es perlahan mencair' },
      { mulai: 0.85, wujud: 'cair', keterangan: 'Es berkurang jadi air' },
    ],
  },
  {
    id: 'es-krim-leleh',
    judul: 'Es Krim Meleleh di Jalan',
    kategori: 'rugi',
    proses: 'mencair',
    deskripsi: 'Es krim yang dibiarkan di tempat panas akan mencair dan menetes terbuang.',
    pesanTetes: 'Sayang sekali kalau es krimnya mencair!',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'padat', keterangan: 'Es krim utuh' },
      { mulai: 0.4, wujud: 'padat', proses: 'mencair', keterangan: 'Es krim mulai cair' },
      { mulai: 0.85, wujud: 'cair', keterangan: 'Es krim menetes di lantai' },
    ],
  },
  {
    id: 'kekeringan',
    judul: 'Kekeringan di Waduk',
    kategori: 'rugi',
    proses: 'menguap',
    deskripsi: 'Panas matahari terik membuat air waduk atau sumur menguap hingga kering dan tanah retak.',
    pesanTetes: 'Kekurangan air membuat tumbuhan layu.',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'cair', keterangan: 'Air waduk penuh' },
      { mulai: 0.4, wujud: 'cair', proses: 'menguap', keterangan: 'Air menguap terus' },
      { mulai: 0.85, wujud: 'padat', keterangan: 'Tanah waduk kering retak' },
    ],
  },
  {
    id: 'kaca-berembun',
    judul: 'Kaca Jendela Berembun',
    kategori: 'rugi',
    proses: 'mengembun',
    deskripsi: 'Uap air menempel di kaca dingin di pagi hari membuat pemandangan luar jadi buram.',
    pesanTetes: 'Kaca basah dan harus dilap dulu.',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'gas', keterangan: 'Uap di udara' },
      { mulai: 0.4, wujud: 'gas', proses: 'mengembun', keterangan: 'Uap menempel di kaca' },
      { mulai: 0.85, wujud: 'cair', keterangan: 'Titik air di kaca' },
    ],
  },
  {
    id: 'cokelat-tas',
    judul: 'Cokelat Meleleh di Tas',
    kategori: 'rugi',
    proses: 'mencair',
    deskripsi: 'Cokelat yang ditaruh di dalam tas yang panas menjadi lembek dan meleleh berantakan.',
    pesanTetes: 'Wah, cokelatnya jadi lengket di tas!',
    durasiMs: 4000,
    perluVerifikasi: true,
    tahap: [
      { mulai: 0, wujud: 'padat', keterangan: 'Cokelat padat rapi' },
      { mulai: 0.4, wujud: 'padat', proses: 'mencair', keterangan: 'Cokelat mulai melunak' },
      { mulai: 0.85, wujud: 'cair', keterangan: 'Cokelat cair berantakan' },
    ],
  },
]
