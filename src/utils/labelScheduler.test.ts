import { afterEach, describe, expect, it, vi } from 'vitest'
import { DURASI_LABEL_MIN_MS, FADE_LABEL_MS, JEDA_LABEL_MS } from '../data/tempo'
import type { LabelTerjadwal } from './labelScheduler'
import { LabelScheduler } from './labelScheduler'

const mencair: LabelTerjadwal = { proses: 'mencair', arah: 'panas' }
const membeku: LabelTerjadwal = { proses: 'membeku', arah: 'dingin' }

function buatScheduler() {
  const tampil: LabelTerjadwal[] = []
  const selesai: LabelTerjadwal[] = []
  const scheduler = new LabelScheduler({
    onTampil: (label) => tampil.push(label),
    onSelesai: (label) => selesai.push(label),
  })
  return { scheduler, tampil, selesai }
}

describe('LabelScheduler', () => {
  afterEach(() => vi.useRealTimers())

  it('tidak muncul sebelum jeda label', () => {
    vi.useFakeTimers()
    const { scheduler, tampil } = buatScheduler()
    scheduler.antrikan(mencair)
    vi.advanceTimersByTime(JEDA_LABEL_MS - 1)
    expect(tampil).toEqual([])
    vi.advanceTimersByTime(1)
    expect(tampil).toEqual([mencair])
  })

  it('tampil minimal selama durasi yang ditentukan', () => {
    vi.useFakeTimers()
    const { scheduler, tampil, selesai } = buatScheduler()
    scheduler.antrikan(mencair)
    vi.advanceTimersByTime(JEDA_LABEL_MS + DURASI_LABEL_MIN_MS - 1)
    expect(tampil).toEqual([mencair])
    expect(selesai).toEqual([])
    vi.advanceTimersByTime(1)
    expect(selesai).toEqual([mencair])
  })

  it('menampilkan satu label dan mengantrekan berikutnya secara berurutan', () => {
    vi.useFakeTimers()
    const { scheduler, tampil, selesai } = buatScheduler()
    scheduler.antrikan(mencair)
    scheduler.antrikan(membeku)
    vi.advanceTimersByTime(JEDA_LABEL_MS)
    expect(tampil).toEqual([mencair])
    vi.advanceTimersByTime(DURASI_LABEL_MIN_MS + FADE_LABEL_MS + JEDA_LABEL_MS)
    expect(selesai).toEqual([mencair])
    expect(tampil).toEqual([mencair, membeku])
  })

  it('membatalkan label yang belum tampil bila arah dibalik', () => {
    vi.useFakeTimers()
    const { scheduler, tampil } = buatScheduler()
    scheduler.antrikan(mencair)
    scheduler.batalkanArah('panas')
    vi.advanceTimersByTime(JEDA_LABEL_MS + DURASI_LABEL_MIN_MS)
    expect(tampil).toEqual([])
  })

  it('tidak berkedip ketika arah digeser cepat', () => {
    vi.useFakeTimers()
    const { scheduler, tampil } = buatScheduler()
    scheduler.antrikan(mencair)
    scheduler.batalkanArah('panas')
    scheduler.antrikan(membeku)
    vi.advanceTimersByTime(JEDA_LABEL_MS)
    expect(tampil).toEqual([membeku])
  })
})
