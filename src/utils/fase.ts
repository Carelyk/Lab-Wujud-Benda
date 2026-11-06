import type { Benda, NamaProses, Perubahan, Wujud } from '../types'

export interface FaseInfo {
  wujud: Wujud
  /** 0 = no steam, 1 = full steam / boiling. */
  uap: number
}

/**
 * The state of a benda at one exact temperature.
 * Pure function: no React, no DOM, no side effects.
 */
export function fasePada(benda: Benda, suhu: number): FaseInfo {
  let wujud: Wujud = benda.fase[0].wujud

  for (const fase of benda.fase) {
    if (suhu >= fase.mulai) wujud = fase.wujud
    else break
  }

  let uap = 0
  if (benda.uap) {
    if (wujud === 'gas') {
      uap = 1
    } else if (wujud === 'cair') {
      const span = benda.uap.didih - benda.uap.tipis
      uap = span > 0 ? Math.min(1, Math.max(0, (suhu - benda.uap.tipis) / span)) : 0
    }
  }

  return { wujud, uap }
}

const PROSES_PERUBAHAN: Record<string, NamaProses> = {
  'padat>cair': 'mencair',
  'cair>padat': 'membeku',
  'cair>gas': 'mendidih',
  'gas>cair': 'mengembun',
  'padat>gas': 'menyublim',
  'gas>padat': 'mengkristal',
}

/**
 * Decide what happened between two temperatures.
 *
 * The process name comes from the DIRECTION of the change, not just from the
 * temperature: 25 °C -> 5 °C is membeku, 5 °C -> 25 °C is mencair, even though
 * both ends are `cair` in one of them.
 *
 * Crossing the thin-steam line inside a liquid (30 °C for water) also counts
 * as `menguap`, so the label appears even before the water boils.
 */
export function resolvePhase(
  benda: Benda,
  suhuSebelum: number,
  suhuSesudah: number,
): Perubahan {
  const dari = fasePada(benda, suhuSebelum)
  const ke = fasePada(benda, suhuSesudah)

  let proses: NamaProses | null = null

  if (dari.wujud !== ke.wujud) {
    proses = PROSES_PERUBAHAN[`${dari.wujud}>${ke.wujud}`] ?? null
  }

  if (!proses && dari.wujud === 'cair' && ke.wujud === 'cair' && benda.uap) {
    const { tipis, didih } = benda.uap
    const naik = suhuSesudah > suhuSebelum
    if (naik && suhuSebelum <= tipis && suhuSesudah > tipis && suhuSesudah < didih) {
      proses = 'menguap'
    }
  }

  return {
    dariWujud: dari.wujud,
    keWujud: ke.wujud,
    proses,
    arah:
      suhuSesudah > suhuSebelum ? 'panas' : suhuSesudah < suhuSebelum ? 'dingin' : null,
  }
}

/**
 * Every temperature where the label or the animation can change.
 * The thermometer animation pauses briefly at each one so the process label
 * is never skipped, even when the target jumps far.
 */
export function ambangSuhu(benda: Benda): number[] {
  const semua = benda.fase.slice(1).map((f) => f.mulai)
  if (benda.uap && benda.uap.tipis < benda.uap.didih) semua.push(benda.uap.tipis)
  return [...new Set(semua)].sort((a, b) => a - b)
}

export interface LangkahSuhu {
  /** Temperature the animation should show after this step. */
  berikut: number
  /** True when the step stopped on a threshold and should hold for a moment. */
  tahan: boolean
  /** True when this step reached the target. */
  selesai: boolean
}

/**
 * One animation step. Pure, so the "never skip a threshold" rule is testable
 * without a browser: a jump from -20 to 120 still produces stops at 0, 30, 100.
 */
export function langkahSuhu(
  benda: Benda,
  dari: number,
  tujuan: number,
  dt: number,
  kecepatan: number,
): LangkahSuhu {
  if (Math.abs(tujuan - dari) < 0.05) {
    return { berikut: tujuan, tahan: false, selesai: true }
  }

  const arah = tujuan > dari ? 1 : -1
  let berikut = dari + arah * kecepatan * dt

  if ((arah > 0 && berikut > tujuan) || (arah < 0 && berikut < tujuan)) {
    berikut = tujuan
  }

  const lewat = ambangSuhu(benda).filter((a) =>
    arah > 0 ? a > dari && a <= berikut : a < dari && a >= berikut,
  )

  if (lewat.length > 0) {
    berikut = arah > 0 ? lewat[0] : lewat[lewat.length - 1]
    return { berikut, tahan: true, selesai: Math.abs(tujuan - berikut) < 0.05 }
  }

  return { berikut, tahan: false, selesai: Math.abs(tujuan - berikut) < 0.05 }
}
