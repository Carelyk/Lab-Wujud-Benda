import { expect, test } from '@playwright/test'
import fs from 'fs'

test('sekitar memakai tab, thumbnail, dan dialog animasi', async ({ page }) => {
  fs.mkdirSync('preview/shots', { recursive: true })
  await page.setViewportSize({ width: 360, height: 780 })
  await page.goto('/#/sekitar')
  await expect(page.getByRole('tab', { name: /Menguntungkan/ })).toHaveAttribute('aria-selected', 'false')
  await expect(page.locator('[data-testid^="scene-"]')).toHaveCount(10)
  await page.getByRole('button', { name: 'Lihat Animasi' }).first().click()
  const dialog = page.locator('[data-testid="sekitar-popup"]')
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await page.screenshot({ path: 'preview/shots/sekitar-popup-360.png' })
  await page.getByRole('button', { name: 'Tutup', exact: true }).click()
  await expect(dialog).toBeHidden()
})

test('siklus air memiliki diorama dan kontrol empat tahap', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/#/siklus')
  await page.waitForTimeout(200)
  expect(errors).toEqual([])
  await expect(page.locator('svg[aria-label^="Diorama siklus air"]')).toBeVisible()
  await expect(page.getByRole('button', { name: /1\. Penguapan/ })).toBeVisible()
  await page.getByRole('button', { name: /3\. Turunnya/ }).click()
  await expect(page.getByText('Tahap 3 dari 4')).toBeVisible()
  await page.getByRole('button', { name: /Danau/ }).click()
  await page.getByRole('button', { name: /Hutan/ }).click()
  await page.getByRole('button', { name: /Meresap ke tanah/ }).click()
  await expect(page.getByText(/Danau → uap air → awan → hujan di Hutan → meresap ke tanah → laut/)).toBeVisible()
})

test('layout desktop tidak melebar dan popup tetap di tengah', async ({ page }) => {
  fs.mkdirSync('preview/shots', { recursive: true })
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('/#/')
  const main = await page.locator('main').boundingBox()
  expect(main?.width).toBeLessThanOrEqual(1140)
  const kartu = page.locator('main button').filter({ hasText: /Eksperimen Bebas|Sortir Benda|Kuis Bintang|Lemari Lencana|Wujud di Sekitar Kita|Siklus Air/ })
  const posisi = await kartu.evaluateAll((items) => items.map((item) => ({ x: Math.round(item.getBoundingClientRect().x), y: Math.round(item.getBoundingClientRect().y) })))
  expect(new Set(posisi.map((item) => item.x)).size).toBe(3)
  expect(new Set(posisi.map((item) => item.y)).size).toBe(2)
  await page.screenshot({ path: 'preview/shots/beranda-layout-1920.png', fullPage: true })

  await page.goto('/#/siklus')
  const diorama = await page.locator('svg[aria-label^="Diorama siklus air"]').boundingBox()
  expect(diorama?.width).toBeLessThanOrEqual(880)
  await page.screenshot({ path: 'preview/shots/siklus-layout-1920.png', fullPage: true })

  await page.goto('/#/sekitar')
  await page.getByRole('button', { name: 'Lihat Animasi' }).first().click()
  const dialog = await page.locator('[data-testid="sekitar-popup"]').boundingBox()
  expect(Math.abs((dialog?.x ?? 0) + (dialog?.width ?? 0) / 2 - 960)).toBeLessThanOrEqual(2)
  await page.screenshot({ path: 'preview/shots/sekitar-popup-centered-1920.png' })
})

test('eksperimen memandu 6 proses dan kedua permainan berisi 10 tantangan', async ({ page }) => {
  fs.mkdirSync('preview/shots', { recursive: true })
  await page.setViewportSize({ width: 1440, height: 1000 })

  await page.goto('/#/eksperimen')
  const peta = page.getByRole('region', { name: '6 misi perubahan wujud' })
  await expect(peta).toBeVisible()
  await expect(peta.getByRole('button')).toHaveCount(6)
  await page.screenshot({ path: 'preview/shots/eksperimen-6-proses.png', fullPage: true })

  await page.goto('/#/sortir')
  await expect(page.getByText('Benda 1 dari 10')).toBeVisible()
  await page.screenshot({ path: 'preview/shots/sortir-10-benda.png', fullPage: true })

  await page.goto('/#/kuis')
  await expect(page.getByText(/10 soal tentang wujud benda/)).toBeVisible()
})

test('kristal es mewakili mengkristal dan lilin mencair sendiri', async ({ page }) => {
  test.setTimeout(30000)
  await page.goto('/#/eksperimen')

  await page.getByRole('button', { name: 'Uap & kristal es' }).click()
  await expect(page.locator('[data-testid="experiment-art"]')).toHaveAttribute('data-fase', 'gas')
  await page.getByRole('button', { name: 'Padat', exact: true }).click()
  await page.getByRole('button', { name: 'Dingin', exact: true }).click()
  await expect(page.locator('[data-testid="process-toast"]')).toContainText('Mengkristal', { timeout: 7000 })
  await expect(page.locator('[data-testid="experiment-art"]')).toHaveAttribute('data-fase', 'padat')

  await page.getByRole('button', { name: 'Lilin', exact: true }).click()
  await expect(page.locator('[data-testid="candle-flame"]')).toBeVisible()
  await expect(page.locator('[data-testid="experiment-art"]')).toHaveAttribute('data-fase', 'cair', { timeout: 15000 })
})

test('semua 10 popup sekitar aman di HP dan Smart TV sentuh', async ({ browser }) => {
  test.setTimeout(45000)
  fs.mkdirSync('preview/shots', { recursive: true })

  for (const perangkat of [
    { nama: 'hp', width: 360, height: 780 },
    { nama: 'smart-tv', width: 1920, height: 1080 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: perangkat.width, height: perangkat.height },
      hasTouch: true,
    })
    const page = await context.newPage()
    await page.goto('/#/sekitar')
    const pemicu = page.getByRole('button', { name: 'Lihat Animasi' })
    await expect(pemicu).toHaveCount(10)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

    await page.screenshot({ path: `preview/shots/sekitar-${perangkat.nama}.png`, fullPage: true })

    for (let indeks = 0; indeks < 10; indeks += 1) {
      await pemicu.nth(indeks).click()
      const dialog = page.locator('[data-testid="sekitar-popup"]')
      await expect(dialog).toBeVisible()
      const kotak = await dialog.boundingBox()
      expect(kotak).not.toBeNull()
      expect(kotak!.x).toBeGreaterThanOrEqual(0)
      expect(kotak!.y).toBeGreaterThanOrEqual(0)
      expect(kotak!.x + kotak!.width).toBeLessThanOrEqual(perangkat.width + 1)
      expect(kotak!.y + kotak!.height).toBeLessThanOrEqual(perangkat.height + 1)

      const tombolTutup = dialog.getByRole('button', { name: 'Tutup animasi' })
      const ukuranTutup = await tombolTutup.boundingBox()
      expect(ukuranTutup!.width).toBeGreaterThanOrEqual(44)
      expect(ukuranTutup!.height).toBeGreaterThanOrEqual(44)
      if (perangkat.nama === 'smart-tv' && indeks === 6) {
        await dialog.screenshot({ path: 'preview/shots/es-krim-meleleh-cone.png' })
      }
      await tombolTutup.click()
      await expect(dialog).toBeHidden()
    }

    await context.close()
  }
})

test('cerita siklus air responsif di HP dan Smart TV sentuh', async ({ browser }) => {
  fs.mkdirSync('preview/shots', { recursive: true })
  for (const perangkat of [
    { nama: 'hp', width: 360, height: 780 },
    { nama: 'smart-tv', width: 1920, height: 1080 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: perangkat.width, height: perangkat.height },
      hasTouch: true,
    })
    const page = await context.newPage()
    await page.goto('/#/siklus')
    await expect(page.getByRole('heading', { name: 'Pilih perjalanan setetes air' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    const tombolCerita = page.getByRole('button', { name: /Laut|Sungai|Danau|Desa|Hutan|Pegunungan|Lewat sungai|Meresap ke tanah/ })
    const jumlah = await tombolCerita.count()
    expect(jumlah).toBeGreaterThanOrEqual(8)
    for (let i = 0; i < jumlah; i += 1) {
      const kotak = await tombolCerita.nth(i).boundingBox()
      expect(kotak!.height).toBeGreaterThanOrEqual(44)
    }
    await page.screenshot({ path: `preview/shots/siklus-cerita-${perangkat.nama}.png`, fullPage: true })
    await context.close()
  }
})
