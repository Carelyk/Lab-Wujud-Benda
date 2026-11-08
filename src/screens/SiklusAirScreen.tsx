import { useEffect, useState } from 'react'
import { WaterCycleArt } from '../components/siklus/WaterCycleArt'
import { ParticleLens } from '../components/experiment/ParticleLens'
import { Bubble, Mascot } from '../components/mascot/Mascot'
import { BigButton } from '../components/ui/BigButton'
import { Panel } from '../components/ui/Panel'
import { renderIconProses } from '../components/ui/SvgIcons'
import { TAHAP_SIKLUS_LIST } from '../data/waterCycle'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTimeline } from '../hooks/useTimeline'
import { mainkan } from '../utils/sound'
import type { Progress, Wujud } from '../types'
import s from './SiklusAirScreen.module.css'

interface Props { progress: Progress; onBack: () => void; onSelesai: () => Promise<Progress>; tandaiPartikel: (wujud: Wujud) => Promise<Progress> }
const WUJUD_PILIH: Wujud[] = ['padat', 'cair', 'gas']
export function SiklusAirScreen({ progress, onBack, onSelesai, tandaiPartikel }: Props) {
  void onBack
  const kurangiGerak = useReducedMotion(); const { progress: putaran, berjalan, putar, stop, seek } = useTimeline({ durasiMs: 24000, autoPlay: !kurangiGerak })
  const [ulangOtomatis, setUlangOtomatis] = useState(false); const [wujud, setWujud] = useState<Wujud>('cair'); const [suhu, setSuhu] = useState(25); const [sibuk, setSibuk] = useState(false)
  const index = Math.max(0, Math.min(3, Math.floor((Number.isFinite(putaran) ? putaran : 0) * 4))); const tahap = TAHAP_SIKLUS_LIST[index] ?? TAHAP_SIKLUS_LIST[0]
  useEffect(() => { const suara = ['siklusMatahari', 'siklusAwan', 'siklusHujan', 'siklusSalju'] as const; void mainkan(suara[index]) }, [index])
  useEffect(() => { if (putaran >= 1 && ulangOtomatis && !kurangiGerak) putar() }, [kurangiGerak, putar, putaran, ulangOtomatis])
  const selesai = async () => { if (sibuk || progress.siklus.selesai) return; setSibuk(true); await onSelesai(); setSibuk(false) }
  return <div className={s.halaman}>
    <div className={s.header}><div><span className={s.pita}>Perjalanan air di bumi</span><h1>Siklus Air</h1></div><strong>Tahap {index + 1} dari 4</strong></div>
    <Panel judul={tahap.nama} ikon={renderIconProses(tahap.proses, 22)}><div className={s.diorama}><WaterCycleArt progress={putaran} reducedMotion={kurangiGerak} /></div><p className={s.caption}>{tahap.deskripsi}</p><div className={s.lompat}>{TAHAP_SIKLUS_LIST.map((item, i) => <button key={item.id} type="button" className={i === index ? s.aktif : ''} onClick={() => { seek(i / 4); void mainkan('klik') }}>{i + 1}. {item.nama.replace(/^\d\. /, '')}</button>)}</div><input className={s.slider} type="range" min="0" max="1" step="0.01" value={putaran} onChange={(e) => seek(Number(e.target.value))} aria-label="Kemajuan siklus air" /><div className={s.kontrol}><button type="button" onClick={berjalan ? stop : putar}>{berjalan ? 'Jeda' : 'Putar'}</button><button type="button" onClick={putar}>Ulang</button><label><input type="checkbox" checked={ulangOtomatis} onChange={(e) => setUlangOtomatis(e.target.checked)} /> Ulangi otomatis</label></div></Panel>
    <Panel judul="Kaca Pembesar Partikel" ikon={null}><p className={s.petunjuk}>Pilih wujud untuk melihat partikel. Lihat ketiganya untuk membuka lencana Mata Ilmuwan.</p><div className={s.pilihWujud}>{WUJUD_PILIH.map((item) => <button key={item} type="button" className={item === wujud ? s.aktif : ''} onClick={() => { setWujud(item); void tandaiPartikel(item) }}>{item}</button>)}</div><label className={s.suhuBaris}>Suhu: {suhu} °C<input type="range" min="-20" max="120" value={suhu} onChange={(e) => setSuhu(Number(e.target.value))} /></label><ParticleLens wujud={wujud} suhu={suhu} /></Panel>
    <div className={s.aksi}><BigButton ikon={null} onClick={() => void selesai()} disabled={progress.siklus.selesai || sibuk}>{progress.siklus.selesai ? 'Sudah selesai' : 'Tandai siklus selesai'}</BigButton></div><div className={s.footerMascot}><Mascot mood="senang" size={70} /><Bubble>Air terus berputar: menguap, membentuk awan, turun sebagai hujan, lalu kembali ke laut.</Bubble></div>
  </div>
}
