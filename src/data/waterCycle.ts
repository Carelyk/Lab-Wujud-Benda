export interface TahapSiklus {
  id: string
  nama: string
  proses: string
  deskripsi: string
  suhuRata: string
  perluVerifikasi: boolean
}

export type SumberAirId = 'laut' | 'sungai' | 'danau'
export type LokasiHujanId = 'desa' | 'hutan' | 'pegunungan'
export type JalurAirId = 'sungai' | 'tanah'

export const PILIHAN_SUMBER: Array<{ id: SumberAirId; nama: string; deskripsi: string }> = [
  { id: 'laut', nama: 'Laut', deskripsi: 'Permukaan airnya sangat luas.' },
  { id: 'sungai', nama: 'Sungai', deskripsi: 'Air mengalir dari daratan.' },
  { id: 'danau', nama: 'Danau', deskripsi: 'Air berkumpul di cekungan.' },
]

export const PILIHAN_HUJAN: Array<{ id: LokasiHujanId; nama: string; deskripsi: string }> = [
  { id: 'desa', nama: 'Desa', deskripsi: 'Hujan mengisi sumur dan sawah.' },
  { id: 'hutan', nama: 'Hutan', deskripsi: 'Akar pohon membantu menyimpan air.' },
  { id: 'pegunungan', nama: 'Pegunungan', deskripsi: 'Air menuruni lereng yang tinggi.' },
]

export const PILIHAN_JALUR: Array<{ id: JalurAirId; nama: string; deskripsi: string }> = [
  { id: 'sungai', nama: 'Lewat sungai', deskripsi: 'Air mengalir di permukaan menuju laut.' },
  { id: 'tanah', nama: 'Meresap ke tanah', deskripsi: 'Air tanah keluar lagi melalui mata air.' },
]

export const TAHAP_SIKLUS_LIST: TahapSiklus[] = [
  {
    id: 'menguap',
    nama: '1. Penguapan Air',
    proses: 'menguap',
    deskripsi: 'Air dari laut, sungai, atau danau terkena panas matahari lalu menguap dan naik ke langit.',
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
    nama: '4. Perjalanan Kembali',
    proses: 'mengalir',
    deskripsi: 'Air hujan menyerap ke tanah dan mengalir melalui sungai kembali berkumpul ke laut.',
    suhuRata: 'Suhu normal',
    perluVerifikasi: true,
  },
]
