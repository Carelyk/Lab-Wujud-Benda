import type { BendaId, Wujud } from '../../../types'
import { CandleArt } from './CandleArt'
import { CrystalArt } from './CrystalArt'
import { CokelatArt } from './CokelatArt'
import { CamphorArt } from './CamphorArt'
import { IceArt } from './IceArt'
import { PotArt } from './PotArt'
import { WaterArt } from './WaterArt'

interface Props {
  bendaId: BendaId
  wujud: Wujud
  uap: number
  suhu?: number
}

/** Picks the right artwork. Each shape is plain SVG, no image files. */
export function Artwork({ bendaId, wujud, uap, suhu }: Props) {
  switch (bendaId) {
    case 'es':
      return <IceArt wujud={wujud} uap={uap} />
    case 'air':
      return <WaterArt wujud={wujud} uap={uap} />
    case 'lilin':
      return <CandleArt wujud={wujud} uap={uap} suhu={suhu} />
    case 'cokelat':
      return <CokelatArt wujud={wujud} uap={uap} />
    case 'kristal-es':
      return <CrystalArt wujud={wujud} />
    case 'kapur-barus':
      return <CamphorArt wujud={wujud} uap={uap} />
    case 'panci':
      return <PotArt wujud={wujud} uap={uap} />
  }
}

