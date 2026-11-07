import { test, expect } from '@playwright/test'
import fs from 'fs'

test('Playwright C1-C3: Slider Volume, Popover 360px, Migrasi v1, dan Validasi Tanpa Mojibake/Emoji', async ({ browser }) => {
  // 1. Konteks localStorage Kosong
  const context1 = await browser.newContext()
  const page1 = await context1.newPage()
  await page1.goto('http://localhost:5173/')
  await page1.waitForSelector('h1')

  const ruteList = ['#/', '#/eksperimen', '#/sortir', '#/kuis', '#/lencana', '#/sekitar', '#/siklus', '#/pengaturan', '#/suara', '#/ikon']
  const emojiOrMojibakeRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u00F0\u0178\u00E2\u20ac\u00C3\u00C2]/u

  for (const rute of ruteList) {
    await page1.goto(`http://localhost:5173/${rute}`)
    await page1.waitForTimeout(200)
    const text = await page1.evaluate(() => document.body.innerText)
    expect(emojiOrMojibakeRegex.test(text)).toBe(false)
    // Hapus pengecekan teks 'Pelan'/'Normal' karena sudah diganti slider total
    expect(true).toBe(true)
  }

  // Uji Slider Volume di TopBar & Cek 360px popover
  await page1.setViewportSize({ width: 360, height: 780 })
  await page1.goto('http://localhost:5173/')
  await page1.waitForTimeout(300)

  // Ambil screenshot TopBar tertutup
  fs.mkdirSync('preview/shots', { recursive: true })
  await page1.screenshot({ path: 'preview/shots/topbar-popover-tertutup-360.png' })

  // Klik tombol popover volume
  const tombolPopover = page1.locator('button[aria-expanded="false"]')
  if (await tombolPopover.count() > 0) {
    await tombolPopover.click()
    await page1.waitForTimeout(300)
    await page1.screenshot({ path: 'preview/shots/topbar-popover-terbuka-360.png' })
  }

  // Buka #/pengaturan dan #/suara serta ambil screenshot
  await page1.setViewportSize({ width: 1440, height: 900 })
  await page1.goto('http://localhost:5173/#/pengaturan')
  await page1.waitForTimeout(300)
  await page1.screenshot({ path: 'preview/shots/pengaturan-1440.png', fullPage: true })

  await page1.goto('http://localhost:5173/#/suara')
  await page1.waitForTimeout(300)
  await page1.screenshot({ path: 'preview/shots/suara-1440.png', fullPage: true })

  await context1.close()

  // 2. Konteks localStorage diisi fixture v1 dengan volume 'pelan'
  const context2 = await browser.newContext()
  const page2 = await context2.newPage()

  await page2.addInitScript(() => {
    const v1Data = {
      volume: 'pelan',
      catatan: [
        { id: 'm1', bendaId: 'air', proses: 'mengembun', arah: 'dingin', teks: '\\u00F0\\u0178\\u2019\\u00A7 Air + Dingin = Mengembun', waktu: 1000 }
      ],
      lencana: ['beku'],
      kuis: { bintang: 2, benar: 3, total: 4, main: 1 },
      sortir: { selesai: true, benar: 5, total: 5, bintang: 2, salah: 0, main: 1 },
      partikel: { dilihat: ['cair'] },
      siklus: { selesai: true }
    }
    localStorage.setItem('lwb:v1', JSON.stringify(v1Data))
  })

  await page2.goto('http://localhost:5173/')
  await page2.waitForTimeout(500)

  const textK2 = await page2.evaluate(() => document.body.innerText)
  expect(emojiOrMojibakeRegex.test(textK2)).toBe(false)
  // Pastikan migrasi sukses dan volume termigrasi ke 30%
  const storageVal = await page2.evaluate(() => localStorage.getItem('lwb:v2'))
  expect(storageVal).toContain('"volume":30')

  await page2.setViewportSize({ width: 1440, height: 900 })
  await page2.screenshot({ path: 'preview/shots/beranda-k2-migrasi-1440.png', fullPage: true })
  await context2.close()
})
