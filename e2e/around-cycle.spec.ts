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
