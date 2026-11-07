import type { Wujud } from '../types'

export type CiriWujud = {
  wujud: Wujud
  bentukTetap: boolean
  volumeTetap: boolean
  deskripsiBentuk: string
  deskripsiVolume: string
}

export const CIRI_WUJUD: Record<Wujud, CiriWujud> = {
  padat: {
    wujud: 'padat',
    bentukTetap: true,
    volumeTetap: true,
    deskripsiBentuk: 'Bentuk tetap, tidak mengikuti wadah',
    deskripsiVolume: 'Volume tetap',
  },
  cair: {
    wujud: 'cair',
    bentukTetap: false,
    volumeTetap: true,
    deskripsiBentuk: 'Bentuk berubah mengikuti wadah',
    deskripsiVolume: 'Volume tetap',
  },
  gas: {
    wujud: 'gas',
    bentukTetap: false,
    volumeTetap: false,
    deskripsiBentuk: 'Bentuk memenuhi seluruh wadah',
    deskripsiVolume: 'Volume memenuhi seluruh wadah',
  },
}

export interface BendaWadah {
  id: string
  nama: string
  wujud: Wujud
  keterangan: string
}

export const BENDA_WADAH_LIST: BendaWadah[] = [
  { id: 'batu', nama: 'Batu', wujud: 'padat', keterangan: 'Benda padat keras dan kaku' },
  { id: 'balok', nama: 'Balok Kayu', wujud: 'padat', keterangan: 'Benda padat bentuknya kokoh' },
  { id: 'air', nama: 'Air Berwarna', wujud: 'cair', keterangan: 'Zat cair mengalir dan mengikuti wadah' },
  { id: 'sirup', nama: 'Sirup Manis', wujud: 'cair', keterangan: 'Cairan kental mengisi wadah' },
  { id: 'uap', nama: 'Gas Balon', wujud: 'gas', keterangan: 'Gas menyebar memenuhi ruangan wadah' },
]

export interface WadahInfo {
  id: string
  nama: string
  bentuk: string
}

export const WADAH_LIST: WadahInfo[] = [
  { id: 'gelas', nama: 'Gelas Tinggi', bentuk: 'tinggi' },
  { id: 'mangkuk', nama: 'Mangkuk Lebar', bentuk: 'lebar' },
  { id: 'kotak', nama: 'Kotak Persegi', bentuk: 'kotak' },
]
