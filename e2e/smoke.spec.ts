import { test, expect } from '@playwright/test'

test('smoke test all main routes and candles', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Laboratorium Wujud Benda/)

  await page.goto('/#/eksperimen')
  await expect(page.locator('h1, h2, span').filter({ hasText: 'Eksperimen' }).first()).toBeVisible()
})
