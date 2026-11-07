import { useState } from 'react'
import { UntungRugiPopup } from '../components/sekitar/UntungRugiPopup'
import { CONTOH_UNTUNG_RUGI_ANIMASI } from '../data/untungRugiAnimasi'
import type { ContohUntungRugiAnimasi } from '../data/untungRugiAnimasi'
import { BigButton } from '../components/ui/BigButton'
import { Panel } from '../components/ui/Panel'
import { IconBuku } from '../components/ui/Icons'
import { mainkan } from '../utils/sound'
import s from './UntungRugiScreen.module.css'

interface Props {
  onBack: () => void
}

export function UntungRugiScreen({ onBack }: Props) {
  const [aktif, setAktif] = useState<ContohUntungRugiAnimasi | null>(null)
  const [filter, setFilter] = useState<'semua' | 'untung' | 'rugi'>('semua')

  const daftar = CONTOH_UNTUNG_RUGI_ANIMASI.filter((c) => {
    if (filter === 'untung') return c.kategori === 'untung'
    if (filter === 'rugi') return c.kategori === 'rugi'
    return true
  })

  return (
    <div className={s.layar}>
      <div className={s.kepala}>
        <div>
          <span className={s.pita}>Wujud di Sekitar Kita</span>
          <h1 className={s.judul}>Manfaat & Kerugian Perubahan Wujud</h1>
          <p className={s.sub}>Klik salah satu contoh untuk melihat animasi dan penjelasan lengkapnya.</p>
        </div>
        <BigButton nada="netral" onClick={onBack}>
          ← Kembali ke Beranda
        </BigButton>
      </div>

      <div className={s.filterBaris} role="group" aria-label="Filter contoh">
        <button
          type="button"
          className={`${s.filterTombol} ${filter === 'semua' ? s.filterAktif : ''}`}
          onClick={() => {
            void mainkan('klik')
            setFilter('semua')
          }}
        >
          Semua ({CONTOH_UNTUNG_RUGI_ANIMASI.length})
        </button>
        <button
          type="button"
          className={`${s.filterTombol} ${filter === 'untung' ? s.filterAktif : ''}`}
          onClick={() => {
            void mainkan('klik')
            setFilter('untung')
          }}
        >
          Menguntungkan
        </button>
        <button
          type="button"
          className={`${s.filterTombol} ${filter === 'rugi' ? s.filterAktif : ''}`}
          onClick={() => {
            void mainkan('klik')
            setFilter('rugi')
          }}
        >
          Merugikan
        </button>
      </div>

      <div className={s.grid}>
        {daftar.map((c) => (
          <Panel
            key={c.id}
            stiker={c.kategori === 'untung' ? 'Untung' : 'Rugi'}
            judul={c.judul}
            ikon={<IconBuku size={22} />}
            className={s.kartuPanel}
          >
            <p className={s.kartuDeskripsi}>{c.deskripsi}</p>
            <div className={s.kartuBawah}>
              <span className={s.badgeProses}>Proses: {c.proses}</span>
              <button
                type="button"
                className={s.tombolAnimasi}
                onClick={() => {
                  void mainkan('buka')
                  setAktif(c)
                }}
              >
                ▶ Lihat Animasi
              </button>
            </div>
          </Panel>
        ))}
      </div>

      {aktif ? <UntungRugiPopup contoh={aktif} onTutup={() => setAktif(null)} /> : null}
    </div>
  )
}
