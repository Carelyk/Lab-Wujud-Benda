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
