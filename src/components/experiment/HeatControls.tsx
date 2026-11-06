import type { Benda } from '../../types'
import { BigButton } from '../ui/BigButton'
import { Panel } from '../ui/Panel'
import { IconDingin, IconPanas, IconUlang } from '../ui/Icons'
import { Thermometer } from './Thermometer'
import s from './HeatControls.module.css'

interface Props {
  benda: Benda
  suhu: number
  target: number
  bergerak: boolean
  ambang: number[]
  onTarget: (nilai: number) => void
  onTambah: (delta: number) => void
  onUlang: () => void
}

export function HeatControls({
  benda,
  suhu,
  target,
  bergerak,
  ambang,
  onTarget,
  onTambah,
  onUlang,
}: Props) {
  return (
    <Panel
      className={s.panel}
      judul="Atur Suhu"
      ikon={<IconPanas size={22} />}
      aksi={
        <span className={s.info}>
          {bergerak ? `Menuju ${Math.round(target)} °C` : 'Geser pelan atau tekan tombol'}
        </span>
      }
    >
      <div className={s.baris}>
        <Thermometer suhu={suhu} min={benda.suhuMin} maks={benda.suhuMaks} ambang={ambang} />

        <div className={s.kendali}>
          <div className={s.duaTombol}>
            <BigButton
              nada="panas"
              ikon={<IconPanas size={24} />}
              sub="+10 °C"
              onClick={() => onTambah(10)}
              disabled={target >= benda.suhuMaks}
            >
              Panaskan
            </BigButton>
            <BigButton
              nada="dingin"
              ikon={<IconDingin size={24} />}
              sub="−10 °C"
              onClick={() => onTambah(-10)}
              disabled={target <= benda.suhuMin}
            >
              Dinginkan
            </BigButton>
          </div>

          <div className={s.sliderBlok}>
            <input
              type="range"
              className={s.slider}
              min={benda.suhuMin}
              max={benda.suhuMaks}
              step={1}
              value={target}
              onChange={(e) => onTarget(Number(e.target.value))}
              aria-label={`Atur suhu ${benda.nama}`}
              aria-valuetext={`${Math.round(target)} derajat Celsius`}
            />
            <div className={s.skala} aria-hidden="true">
              <span>{benda.suhuMin} °C</span>
              <span>{benda.suhuMaks} °C</span>
            </div>
          </div>

          <button type="button" className={s.ulang} onClick={onUlang}>
            <IconUlang size={18} />
            <span>Ulangi dari {benda.suhuAwal} °C</span>
          </button>
        </div>
      </div>
    </Panel>
  )
}
