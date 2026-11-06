import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

async function run() {
  const shotDir = path.resolve('preview/shots')
  fs.mkdirSync(shotDir, { recursive: true })

  // Ensure preview is running or build is ready
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  try {
    // Start preview server or visit local build
    await page.goto('http://localhost:4173')
    await page.waitForTimeout(1000)

    // 1. Home at 1440px
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.screenshot({ path: path.join(shotDir, 'home-1440.png'), fullPage: true })

    // Home at 360px
    await page.setViewportSize({ width: 360, height: 780 })
    await page.screenshot({ path: path.join(shotDir, 'home-360.png'), fullPage: true })

    // 2. #/sekitar
    await page.goto('http://localhost:4173/#/sekitar')
    await page.waitForTimeout(500)
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.screenshot({ path: path.join(shotDir, 'sekitar-1440.png'), fullPage: true })

    // 3. Popup Es Krim
    const tombolAnimasi = page.locator('text=Lihat Animasi').first()
    if (await tombolAnimasi.isVisible()) {
      await tombolAnimasi.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: path.join(shotDir, 'popup-eskrim-p0.png') })
      await page.waitForTimeout(2000)
      await page.screenshot({ path: path.join(shotDir, 'popup-eskrim-p5.png') })
      await page.waitForTimeout(2000)
      await page.screenshot({ path: path.join(shotDir, 'popup-eskrim-p1.png') })
      // Close popup
      await page.locator('text=Tutup').click()
    }

    // 4. #/siklus
    await page.goto('http://localhost:4173/#/siklus')
    await page.waitForTimeout(1000)
    await page.screenshot({ path: path.join(shotDir, 'siklus-t0.png') })
    await page.waitForTimeout(6000)
    await page.screenshot({ path: path.join(shotDir, 'siklus-t6.png') })

    // 5. Pengaturan
    await page.goto('http://localhost:4173/#/pengaturan')
    await page.waitForTimeout(500)
    await page.screenshot({ path: path.join(shotDir, 'pengaturan.png'), fullPage: true })

    console.log('Successfully captured snapshots in preview/shots/')
  } catch (err) {
    console.error('Error capturing shots:', err)
  } finally {
    await browser.close()
  }
}

run()
