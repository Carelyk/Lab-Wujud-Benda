import type { Progress } from '../types'

/**
 * Which badges the saved progress has earned. Pure: no React, no storage.
 * `useProgress` compares this list with the saved one and unlocks the rest.
 */
export function lencanaTerbuka(progress: Progress): string[] {
  const terbuka: string[] = []

  const proses = new Set(progress.catatan.map((c) => c.proses))
  if (proses.has('membeku')) terbuka.push('ahli-membeku')
  if (proses.has('menguap') || proses.has('mendidih')) terbuka.push('pawang-uap')

  const mencair = new Set(
    progress.catatan.filter((c) => c.proses === 'mencair').map((c) => c.bendaId),
  )
  if (mencair.size >= 5) terbuka.push('si-pelumer')

  if (progress.sortir.selesai && progress.sortir.bintang >= 2) {
    terbuka.push('penyortir-handal')
  }
  if (progress.kuis.bintang >= 3) terbuka.push('bintang-kuis')
  if (progress.catatan.length >= 6) terbuka.push('ilmuwan-cilik')

  const dilihat = new Set(progress.partikel.dilihat)
  if (dilihat.has('padat') && dilihat.has('cair') && dilihat.has('gas')) {
    terbuka.push('mata-ilmuwan')
  }
  if (progress.siklus.selesai) terbuka.push('penjaga-siklus')

  return terbuka
}
