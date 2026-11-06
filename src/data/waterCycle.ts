export interface TahapSiklus {
  id: string
  nama: string
  proses: string
  deskripsi: string
  suhuRata: string
  perluVerifikasi: boolean
}

export const TAHAP_SIKLUS_LIST: TahapSiklus[] = [
  {
    id: 'menguap',
    nama: '1. Penguapan Air Laut',
    proses: 'menguap',
    deskripsi: 'Air laut terkena panas matahari lalu menguap pelan-pelan menjadi uap air dan naik ke langit.',
    suhuRata: 'Suhu hangat matahari',
    perluVerifikasi: true,
  },
  {
    id: 'mengembun',
    nama: '2. Pembentukan Awan',
    proses: 'mengembun',
    deskripsi: 'Uap air yang naik di udara dingin atas mengembun menjadi butiran air kecil, berkumpul membentuk awan.',
    suhuRata: 'Udara dingin di atas',
    perluVerifikasi: true,
  },
  {
    id: 'hujan',
    nama: '3. Turunnya Hujan',
    proses: 'mencair',
    deskripsi: 'Awan yang sudah sangat berat menumpuk butiran air, lalu jatuh kembali ke bumi sebagai air hujan.',
    suhuRata: 'Suhu udara',
    perluVerifikasi: true,
  },
  {
    id: 'mengalir',
    nama: '4. Aliran ke Sungai & Laut',
    proses: 'mengalir',
    deskripsi: 'Air hujan menyerap ke tanah dan mengalir melalui sungai kembali berkumpul ke laut.',
    suhuRata: 'Suhu normal',
    perluVerifikasi: true,
  },
]
