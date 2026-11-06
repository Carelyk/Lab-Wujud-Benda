export interface ContohUntungRugi {
  id: string
  judul: string
  kategori: 'untung' | 'rugi'
  proses: string
  deskripsi: string
  pesanTetes: string
}

export const CONTOH_UNTUNG_RUGI: ContohUntungRugi[] = [
  {
    id: 'es-krim',
    judul: 'Pembuatan Es Krim Lezat',
    kategori: 'untung',
    proses: 'Membeku',
    deskripsi: 'Susu dan adonan cair didinginkan dengan es batu dan garam hingga membeku menjadi es krim yang lembut dan nikmat untuk dinikmati.',
    pesanTetes: 'Dingin yang pas mengubah susu cair jadi es krim lezat!',
  },
  {
    id: 'jemur-pakaian',
    judul: 'Menjemur Pakaian Basah',
    kategori: 'untung',
    proses: 'Menguap',
    deskripsi: 'Air pada pakaian basah menyerap panas matahari lalu menguap ke udara, membuat pakaian menjadi kering kembali dan siap dipakai.',
    pesanTetes: 'Panas matahari membuat air di baju menguap jadi kering.',
  },
  {
    id: 'pembuatan-garam',
    judul: 'Petani Garam di Tambak',
    kategori: 'untung',
    proses: 'Menguap',
    deskripsi: 'Air laut ditampung di petak tambak. Panas matahari membuat air laut menguap perlahan dan meninggalkan kristal garam putih.',
    pesanTetes: 'Garam dapur yang kita makan berasal dari air laut yang menguap!',
  },
  {
    id: 'embun-pagi',
    judul: 'Tetes Embun Pagi pada Tanaman',
    kategori: 'untung',
    proses: 'Mengembun',
    deskripsi: 'Uap air di udara yang hangat bersentuhan dengan daun yang dingin di malam hari, berubah menjadi butiran air segar bagi tanaman.',
    pesanTetes: 'Tanaman segar di pagi hari karena embun yang mengembun.',
  },
  {
    id: 'cokelat-leleh',
    judul: 'Membuat Hiasan Kue Cokelat',
    kategori: 'untung',
    proses: 'Mencair',
    deskripsi: 'Batang cokelat dipanaskan perlahan di dalam wadah air panas agar mencair, lalu dicetak menjadi bentuk permen cokelat yang indah.',
    pesanTetes: 'Cokelat padat dipanaskan jadi cair untuk dibentuk ulang!',
  },
  {
    id: 'kapur-barus-lemari',
    judul: 'Kapur Barus Mengharumkan Lemari',
    kategori: 'untung',
    proses: 'Menyublim',
    deskripsi: 'Kapur barus padat di dalam lemari pakaian menyublim langsung menjadi gas wangi yang mengusir bau tidak sedap dan serangga.',
    pesanTetes: 'Kapur barus mengecil tanpa basah karena langsung jadi gas!',
  },
  {
    id: 'jalan-berlubang-es',
    judul: 'Jalanan Rusak karena Es Beku',
    kategori: 'rugi',
    proses: 'Membeku',
    deskripsi: 'Air hujan yang masuk ke dalam celah kecil aspal jalan raya membeku saat suhu sangat dingin. Karena air mengembang saat membeku, aspal bisa retak dan pecah.',
    pesanTetes: 'Hati-hati, air yang membeku di celah jalan bisa merusak aspal!',
  },
  {
    id: 'kaca-berembun',
    judul: 'Kaca Mobil Berembun Saat Hujan',
    kategori: 'rugi',
    proses: 'Mengembun',
    deskripsi: 'Uap air di dalam kabin mobil yang hangat menempel pada kaca jendela yang dingin, menghasilkan embun tebal yang menghalangi pandangan pengemudi.',
    pesanTetes: 'Pandangan jadi buram kalau kaca mobil basah oleh embun.',
  },
  {
    id: 'es-kutub-mencair',
    judul: 'Pemanasan Global & Es Kutub',
    kategori: 'rugi',
    proses: 'Mencair',
    deskripsi: 'Suhu bumi yang semakin panas membuat es di kutub utara dan selatan mencair menjadi air laut, sehingga permukaan laut naik dan mengancam pulau-pulau.',
    pesanTetes: 'Suhu bumi naik membuat es kutub mencair berbahaya.',
  },
  {
    id: 'makanan-kering-lembab',
    judul: 'Kue Kering Menjadi Lembek',
    kategori: 'rugi',
    proses: 'Mengembun',
    deskripsi: 'Kue kering renyah yang dibiarkan terbuka di udara lembab menyerap uap air dari udara, sehingga kue menjadi lembek dan tidak enak lagi.',
    pesanTetes: 'Uap air di udara membuat kue kering kesayangan jadi lembek.',
  },
]
