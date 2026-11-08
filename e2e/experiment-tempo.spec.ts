import { expect, test } from '@playwright/test'
import fs from 'fs'

interface SampelApi {
  deltaPusat: number
  deltaDasar: number
  rotasi: number
}

async function aturSuhu(page: import('@playwright/test').Page, namaBenda: string, suhu: number) {
  const slider = page.locator(`input[aria-label="Atur suhu ${namaBenda}"]`)
  await slider.evaluate((elemen, nilai) => {
    const input = elemen as HTMLInputElement
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
    setter?.call(input, String(nilai))
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }, suhu)
}

async function ambilSampelApi(page: import('@playwright/test').Page): Promise<SampelApi[]> {
  return page.evaluate(async () => {
    const hasil: SampelApi[] = []
    for (let i = 0; i < 20; i += 1) {
      await new Promise<void>((selesai) => requestAnimationFrame(() => selesai()))
      const sumbu = document.querySelector('[data-testid="candle-wick"]')
      const api = document.querySelector('[data-testid="candle-flame"]')
      if (!(sumbu instanceof SVGGraphicsElement) || !(api instanceof SVGGraphicsElement)) continue
      const rectSumbu = sumbu.getBoundingClientRect()
      const rectApi = api.getBoundingClientRect()
      const transform = getComputedStyle(api).transform
      const cocok = transform.match(/^matrix\(([^,]+),\s*([^,]+)/)
      const rotasi = cocok ? (Math.atan2(Number(cocok[2]), Number(cocok[1])) * 180) / Math.PI : 0
      hasil.push({
        deltaPusat: Math.abs(rectApi.left + rectApi.width / 2 - (rectSumbu.left + rectSumbu.width / 2)),
        deltaDasar: Math.abs(rectApi.bottom - rectSumbu.top),
        rotasi,
      })
    }
    return hasil
  })
}

test('api lilin tetap menempel ke sumbu pada 60 dan 100 derajat', async ({ page }) => {
  test.setTimeout(45000)
  fs.mkdirSync('preview/shots', { recursive: true })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/eksperimen')
  await page.getByRole('button', { name: 'Lilin' }).click()
  await page.locator('[data-testid="experiment-art"]').screenshot({ path: 'preview/shots/lilin-28-1440.png' })

  await aturSuhu(page, 'Lilin', 60)
  await expect(page.getByRole('img', { name: 'Termometer menunjukkan 60 derajat Celsius' })).toBeVisible({ timeout: 8000 })
  const pada60 = await ambilSampelApi(page)
  await page.locator('[data-testid="experiment-art"]').screenshot({ path: 'preview/shots/lilin-60-1440.png' })

  await aturSuhu(page, 'Lilin', 100)
  await expect(page.getByRole('img', { name: 'Termometer menunjukkan 100 derajat Celsius' })).toBeVisible({ timeout: 8000 })
  const pada100 = await ambilSampelApi(page)
  await page.locator('[data-testid="experiment-art"]').screenshot({ path: 'preview/shots/lilin-100-1440.png' })

  await page.setViewportSize({ width: 360, height: 780 })
  await page.goto('/#/eksperimen')
  await page.getByRole('button', { name: 'Lilin' }).click()
  await page.locator('[data-testid="experiment-art"]').screenshot({ path: 'preview/shots/lilin-28-360.png' })
  await aturSuhu(page, 'Lilin', 60)
  await expect(page.getByRole('img', { name: 'Termometer menunjukkan 60 derajat Celsius' })).toBeVisible({ timeout: 8000 })
  await page.locator('[data-testid="experiment-art"]').screenshot({ path: 'preview/shots/lilin-60-360.png' })
  await aturSuhu(page, 'Lilin', 100)
  await expect(page.getByRole('img', { name: 'Termometer menunjukkan 100 derajat Celsius' })).toBeVisible({ timeout: 8000 })
  await page.locator('[data-testid="experiment-art"]').screenshot({ path: 'preview/shots/lilin-100-360.png' })

  for (const sampel of [...pada60, ...pada100]) {
    expect(sampel.deltaPusat).toBeLessThanOrEqual(3)
    expect(sampel.deltaDasar).toBeLessThanOrEqual(3)
    expect(Math.abs(sampel.rotasi)).toBeLessThanOrEqual(4)
  }
})

test('label proses menunggu visual, berurutan, dan tidak menumpuk', async ({ page }) => {
  test.setTimeout(45000)
  fs.mkdirSync('preview/shots', { recursive: true })
  await page.goto('/#/eksperimen')
  const art = page.locator('[data-testid="experiment-art"]')
  const toast = page.locator('[data-testid="process-toast"]')
  await page.evaluate(() => {
    const rekam = { faseCair: null as number | null, mencair: null as number | null, maksToast: 0 }
    ;(globalThis as typeof globalThis & { ujiTempo?: typeof rekam }).ujiTempo = rekam
    new MutationObserver(() => {
      const benda = document.querySelector('[data-testid="experiment-art"]')
      const label = document.querySelector('[data-testid="process-toast"]')
      if (benda?.getAttribute('data-fase') === 'cair' && rekam.faseCair === null) rekam.faseCair = performance.now()
      if (label?.textContent?.includes('Mencair') && rekam.mencair === null) rekam.mencair = performance.now()
      rekam.maksToast = Math.max(rekam.maksToast, document.querySelectorAll('[data-testid="process-toast"]').length)
    }).observe(document.body, { childList: true, subtree: true, attributes: true })
  })

  await aturSuhu(page, 'Es batu', 0)
  await expect(art).toHaveAttribute('data-fase', 'cair', { timeout: 3000 })
  await page.waitForTimeout(500)
  await expect(toast).toHaveCount(0)
  await page.waitForTimeout(500)
  await expect(toast).toContainText('Mencair')
  await art.locator('xpath=../..').screenshot({ path: 'preview/shots/label-mencair-t1500.png' })
  await page.waitForTimeout(3500)
  const rekam = await page.evaluate(
    () => (globalThis as typeof globalThis & { ujiTempo?: { faseCair: number | null; mencair: number | null; maksToast: number } }).ujiTempo,
  )
  expect(rekam?.faseCair).not.toBeNull()
  expect(rekam?.mencair).not.toBeNull()
  expect((rekam?.mencair ?? 0) - (rekam?.faseCair ?? 0)).toBeGreaterThanOrEqual(700)
  expect(rekam?.maksToast).toBeLessThanOrEqual(1)

  await page.getByRole('button', { name: 'Air', exact: true }).click()
  await aturSuhu(page, 'Air', 120)
  await expect(toast).toContainText('Menguap', { timeout: 4000 })
  await expect(toast).toHaveCount(1)
  await expect(toast).toContainText('Mendidih', { timeout: 11000 })
  await expect(toast).toHaveCount(1)

  await aturSuhu(page, 'Air', 20)
  await expect(toast).toContainText('Mengembun', { timeout: 5000 })
  await expect(toast).toHaveCount(1)
})
