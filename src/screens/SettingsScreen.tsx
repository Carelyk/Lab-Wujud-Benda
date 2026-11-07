import { useState, useEffect } from 'react'
import { BigButton } from '../components/ui/BigButton'
import { Panel } from '../components/ui/Panel'
import { mainkan, setVolume as setVolumeSuara } from '../utils/sound'
import { penyimpanan } from '../utils/storage'
import s from './SettingsScreen.module.css'

interface Props {
  onBack: () => void
}

export function SettingsScreen({ onBack }: Props) {
  const [volume, setVolume] = useState<number>(60)
  const [kurangiGerak, setKurangiGerak] = useState<boolean>(false)

  useEffect(() => {
    void penyimpanan.ambil().then((p) => {
      setVolume(p.volume ?? 60)
      setKurangiGerak(p.suaraMati ?? false)
    })
  }, [])

  const handleVolumeChange = async (val: number) => {
    setVolume(val)
    setVolumeSuara(val)
    await penyimpanan.setVolume(val)
  }

  const handleGerak = () => {
    const val = !kurangiGerak
    setKurangiGerak(val)
    void mainkan('klik')
  }

  const handleBacakan = (teks: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(teks)
      u.lang = 'id-ID'
      window.speechSynthesis.speak(u)
    } else {
      alert('Maaf, fitur suara baca tidak didukung di peramban ini.')
    }
  }

  return (
    <div className={s.layar}>
      <div className={s.kepala}>
        <div>
          <span className={s.pita}>Pengaturan & Aksesibilitas</span>
          <h1 className={s.judul}>Sesuaikan Kenyamanan Belajar</h1>
          <p className={s.sub}>Atur suara dan kenyamanan tampilan sesuai kebutuhan.</p>
        </div>
        <BigButton nada="netral" onClick={onBack}>
          ← Kembali ke Beranda
        </BigButton>
      </div>

      <div className={s.grid}>
        <Panel judul="Pengaturan Suara" stiker="Audio">
          <div className={s.barisOpsi}>
            <span>Geser untuk Atur Volume ({volume}%):</span>
            <div className={s.sliderGrup}>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => void handleVolumeChange(Number(e.target.value))}
                onMouseUp={() => void mainkan('klik')}
                onTouchEnd={() => void mainkan('klik')}
                aria-label="Volume"
                aria-valuetext={`Volume ${volume} persen`}
                className={s.rangeBesar}
              />
              <div className={s.tombolCepatGrup}>
                <button
                  type="button"
                  className={`${s.tombolCepat} ${volume === 0 ? s.aktif : ''}`}
                  onClick={() => void handleVolumeChange(0)}
                >
                  Mati (0%)
                </button>
                <button
                  type="button"
                  className={`${s.tombolCepat} ${volume === 30 ? s.aktif : ''}`}
                  onClick={() => void handleVolumeChange(30)}
                >
                  30%
                </button>
                <button
                  type="button"
                  className={`${s.tombolCepat} ${volume === 60 ? s.aktif : ''}`}
                  onClick={() => void handleVolumeChange(60)}
                >
                  60%
                </button>
              </div>
            </div>
          </div>
        </Panel>

        <Panel judul="Mode Tampilan & Gerak" stiker="Visual">
          <div className={s.barisOpsi}>
            <span>Kurangi Gerakan (Animasi Statis):</span>
            <button
              type="button"
              className={`${s.tombolOpsi} ${kurangiGerak ? s.aktif : ''}`}
              onClick={handleGerak}
            >
              {kurangiGerak ? 'Aktif (Tenang)' : 'Mati (Biasa)'}
            </button>
          </div>
        </Panel>

        <Panel judul="Tes Fitur 'Bacakan untukku'" stiker="Suara">
          <p className={s.teksInfo}>Coba dengarkan Tetes membacakan teks pelajaran secara otomatis:</p>
          <BigButton
            nada="netral"
            onClick={() => handleBacakan('Halo! Selamat datang di Laboratorium Wujud Benda. Mari belajar wujud padat, cair, dan gas dengan gembira!')}
          >
            Bacakan Sambutan Tetes
          </BigButton>
        </Panel>
      </div>
    </div>
  )
}
