import { useState } from 'react'
import { BigButton } from '../components/ui/BigButton'
import { Panel } from '../components/ui/Panel'
import { adalahLoop, mainkan, mulaiLoop, KONFIG_SUARA, setVolume as setVolumeSuara } from '../utils/sound'
import type { NamaSuara } from '../utils/sound'
import type { TingkatVolume } from '../types'
import s from './SoundTestScreen.module.css'

const GRUP: { nama: string; items: NamaSuara[] }[] = [
  {
    nama: 'Eksperimen dan benda',
    items: ['esKrek', 'esTik', 'esKring', 'airGelembung', 'airCess', 'airTikEmbun', 'lilinTik', 'lilinDesis', 'lilinPuf', 'kapurShhh', 'kapurPyuu', 'suhuTik', 'matahariBling', 'gunungBrrr'],
  },
  {
    nama: 'Maskot Tetes',
    items: ['tetesSenang', 'tetesBingung', 'tetesPanas', 'tetesDingin'],
  },
  {
    nama: 'UI',
    items: ['uiKlik', 'uiWhoosh', 'uiBuka', 'uiTutup', 'uiTab', 'klik', 'buka', 'pop'],
  },
  {
    nama: 'Sortir',
    items: ['sortirAmbil', 'sortirMasuk', 'sortirBenar', 'sortirSalah', 'sortirKembali'],
  },
  {
    nama: 'Kuis dan lencana',
    items: ['kuisPilih', 'kuisBenar', 'kuisSalah', 'kuisBintang', 'kuisSkor', 'lencanaKilau', 'benar', 'salah', 'tring', 'ding'],
  },
  {
    nama: 'Siklus Air dan Lensa',
    items: ['siklusMatahari', 'siklusAwan', 'siklusHujan', 'siklusSalju', 'lensaZoom', 'partikelDesis'],
  },
  {
    nama: 'Wujud di Sekitar Kita',
    items: ['sekitarPop', 'sekitarHujan', 'sekitarEsKrim', 'sekitarKaca', 'splash', 'cess', 'suhu'],
  },
]

export function SoundTestScreen({ volume, onVolume }: { volume: TingkatVolume; onVolume: (l: TingkatVolume) => void }) {
  const [suhu, setSuhu] = useState(50)
  const [loopAktif, setLoopAktif] = useState<string | null>(null)
  const [stopLoop, setStopLoop] = useState<(() => void) | null>(null)

  const mulai = (nama: NamaSuara) => {
    if (adalahLoop(nama)) {
      if (stopLoop) stopLoop()
      const stop = mulaiLoop(nama, { suhu, intervalMs: KONFIG_SUARA[nama].intervalMs })
      setStopLoop(() => stop)
      setLoopAktif(nama)
    } else {
      void mainkan(nama)
    }
  }

  const henti = () => {
    if (stopLoop) stopLoop()
    setStopLoop(null)
    setLoopAktif(null)
  }

  const handleSlider = (val: number) => {
    onVolume(val)
    setVolumeSuara(val)
  }

  return (
    <div className={s.halaman}>
      <Panel judul="Uji Suara" ikon={null}>
        <p className={s.intro}>
          Halaman tersembunyi untuk menilai efek suara. Geser slider volume atau tekan tombol.
        </p>
        <div className={s.volume}>
          <label htmlFor="volume-slider">Volume ({volume}%):</label>
          <input
            id="volume-slider"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => handleSlider(Number(e.target.value))}
            onMouseUp={() => void mainkan('klik')}
            onTouchEnd={() => void mainkan('klik')}
            style={{ width: '100%', accentColor: '#2f9bff', cursor: 'pointer' }}
          />
        </div>
        <div className={s.suhu}>
          <label htmlFor="suhu-suara">Suhu simulasi: {suhu} °C</label>
          <input
            id="suhu-suara"
            type="range"
            min={0}
            max={100}
            value={suhu}
            onChange={(e) => setSuhu(Number(e.target.value))}
          />
        </div>
        {loopAktif ? (
          <div className={s.loopBar}>
            <span>Loop aktif: {loopAktif}</span>
            <button type="button" onClick={henti}>Berhenti</button>
          </div>
        ) : null}
      </Panel>

      {GRUP.map((g) => (
        <Panel key={g.nama} judul={g.nama} ikon={null}>
          <div className={s.daftar}>
            {g.items.map((nama) => (
              <BigButton key={nama} onClick={() => mulai(nama)}>
                {nama}
              </BigButton>
            ))}
          </div>
        </Panel>
      ))}
    </div>
  )
}
