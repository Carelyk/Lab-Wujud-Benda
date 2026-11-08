import { useState } from 'react'
import { UntungRugiPopup } from '../components/sekitar/UntungRugiPopup'
import { SceneRenderer } from '../components/sekitar/scenes/SceneRenderer'
import { CONTOH_UNTUNG_RUGI_ANIMASI } from '../data/untungRugiAnimasi'
import type { ContohUntungRugiAnimasi } from '../data/untungRugiAnimasi'
import s from './GalleryScreen.module.css'

export function GalleryScreen() {
  const [aktif, setAktif] = useState<ContohUntungRugiAnimasi | null>(null)
  return <div className={s.halaman}><h1>Galeri Adegan Perubahan Wujud</h1><p>Lihat setiap adegan pada awal, proses, dan akhir perubahan.</p><div className={s.grid}>{CONTOH_UNTUNG_RUGI_ANIMASI.map((contoh) => <article key={contoh.id} className={s.kartu}><h2>{contoh.judul}</h2><small>{contoh.id}</small><div className={s.tiga}>{[0, .5, 1].map((nilai) => <div key={nilai}><SceneRenderer id={contoh.id} progress={nilai} reducedMotion /><span>{nilai === 0 ? 'Awal' : nilai === 1 ? 'Akhir' : 'Proses'}</span></div>)}</div><button type="button" onClick={() => setAktif(contoh)}>Lihat sebagai popup</button></article>)}</div>{aktif ? <UntungRugiPopup contoh={aktif} onTutup={() => setAktif(null)} /> : null}</div>
}
