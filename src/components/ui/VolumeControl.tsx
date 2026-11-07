import type { TingkatVolume } from '../../types'
import { useState, useRef, useEffect } from 'react'
import { mainkan } from '../../utils/sound'
import { IconSuaraMati, IconSuaraNyala } from '../ui/Icons'
import s from './VolumeControl.module.css'

interface Props {
  volume: TingkatVolume
  onVolume: (val: TingkatVolume) => void
}

export function VolumeControl({ volume, onVolume }: Props) {
  const [buka, setBuka] = useState(false)
  const [sebelumMute, setSebelumMute] = useState<number>(() => (volume === 0 ? 60 : volume))
  const kontainerRef = useRef<HTMLDivElement>(null)

  if (volume > 0 && volume !== sebelumMute) {
    setSebelumMute(volume)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (kontainerRef.current && !kontainerRef.current.contains(e.target as Node)) {
        setBuka(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setBuka(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleToggleMute = () => {
    void mainkan('klik')
    if (volume === 0) {
      const target = sebelumMute > 0 ? sebelumMute : 60
      onVolume(target)
    } else {
      setSebelumMute(volume)
      onVolume(0)
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    onVolume(val)
  }

  const handleSliderCommit = () => {
    void mainkan('klik')
  }

  const getIkanSpeaker = () => {
    if (volume === 0) return <IconSuaraMati size={20} />
    return <IconSuaraNyala size={20} />
  }

  return (
    <div className={s.kontainer} ref={kontainerRef}>
      <button
        type="button"
        className={s.tombolUtama}
        onClick={handleToggleMute}
        aria-label={volume === 0 ? 'Nyalakan suara' : 'Matikan suara'}
        title={volume === 0 ? 'Suara Mati' : `Volume ${volume}%`}
      >
        {getIkanSpeaker()}
      </button>

      <div className={s.sliderInline}>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleSliderChange}
          onMouseUp={handleSliderCommit}
          onTouchEnd={handleSliderCommit}
          aria-label="Volume"
          aria-valuetext={`Volume ${volume} persen`}
          className={s.range}
        />
      </div>

      <button
        type="button"
        className={s.tombolPopover}
        onClick={() => setBuka(!buka)}
        aria-label="Pengaturan volume"
        aria-expanded={buka}
      >
        {volume}%
      </button>

      {buka && (
        <div className={s.popover} role="dialog" aria-label="Pengaturan Volume">
          <div className={s.popoverHeader}>
            <span>Volume Suara</span>
            <span className={s.nilaiBadge}>{volume}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleSliderChange}
            onMouseUp={handleSliderCommit}
            onTouchEnd={handleSliderCommit}
            aria-label="Volume"
            aria-valuetext={`Volume ${volume} persen`}
            className={s.rangeBesar}
          />
        </div>
      )}
    </div>
  )
}
