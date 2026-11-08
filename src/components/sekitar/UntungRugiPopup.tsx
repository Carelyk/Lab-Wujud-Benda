import { useEffect, useRef } from 'react'
import type { ContohUntungRugiAnimasi } from '../../data/untungRugiAnimasi'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTimeline } from '../../hooks/useTimeline'
import { renderIconProses } from '../ui/SvgIcons'
import { SceneRenderer } from './scenes/SceneRenderer'
import { mainkan } from '../../utils/sound'
import s from './UntungRugiPopup.module.css'

interface Props { contoh: ContohUntungRugiAnimasi; onTutup: () => void }

export function UntungRugiPopup({ contoh, onTutup }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const pemicuRef = useRef<HTMLElement | null>(document.activeElement instanceof HTMLElement ? document.activeElement : null)
  const kurangiGerak = useReducedMotion()
  const { progress, berjalan, putar, stop, seek } = useTimeline({ durasiMs: contoh.durasiMs, autoPlay: !kurangiGerak })
  const tahapIndex = Math.max(0, contoh.tahap.findLastIndex((t) => progress >= t.mulai))
  const tahap = contoh.tahap[tahapIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.showModal()
    const tutup = () => { stop(); pemicuRef.current?.focus(); onTutup() }
    dialog.addEventListener('close', tutup)
    return () => dialog.removeEventListener('close', tutup)
  }, [onTutup, stop])

  useEffect(() => { if (berjalan) void mainkan('sekitarPop') }, [berjalan])

  const tutup = () => dialogRef.current?.close()
  return (
    <dialog ref={dialogRef} className={s.modal} aria-labelledby="judul-popup" onCancel={tutup} data-testid="sekitar-popup">
      <header className={s.kepala}><div><span className={`${s.kategori} ${s[contoh.kategori]}`}>{contoh.kategori === 'untung' ? 'Menguntungkan' : 'Merugikan'}</span><h2 id="judul-popup" className={s.judul}>{contoh.judul}</h2></div><button type="button" className={s.tutupIkon} onClick={tutup} aria-label="Tutup animasi">×</button></header>
      <div className={s.areaAnimasi}><SceneRenderer id={contoh.id} progress={progress} reducedMotion={kurangiGerak} /></div>
      <div className={s.stepper} aria-label={`Tahap ${tahapIndex + 1} dari 3`}>{contoh.tahap.map((item, index) => <div key={item.mulai} className={`${s.tahap} ${index === tahapIndex ? s.aktif : ''}`}><span>{index === 0 ? 'Awal' : index === 1 ? 'Proses' : 'Akhir'}</span><strong>{item.wujud}</strong></div>)}</div>
      <p className={s.caption}>{tahap.keterangan}</p>
      <div className={s.infoBox}><span className={s.proses}>{renderIconProses(contoh.proses, 18)} {contoh.proses}</span><p>{contoh.deskripsi}</p><p className={s.tetes}>{contoh.pesanTetes}</p></div>
      <input className={s.slider} type="range" min="0" max="1" step="0.01" value={progress} onChange={(e) => seek(Number(e.target.value))} aria-label="Kemajuan animasi" />
      <div className={s.aksiBawah}><button type="button" className={s.tombolPutar} onClick={berjalan ? stop : putar}>{berjalan ? 'Jeda' : 'Putar lagi'}</button><button type="button" className={s.tombolTutup} onClick={tutup}>Tutup</button></div>
    </dialog>
  )
}
