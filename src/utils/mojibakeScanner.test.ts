import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Uji Pemindai Mojibake & Emoji', () => {
  it('gagal mendeteksi mojibake atau emoji mentah di fixture simulasi', () => {
    const mojibakeRegex = /\u00F0\u0178|\u00E2\u20ac|\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]/
    const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/u

    const teksRusak = '\u00F0\u0178\u2019\u00A7 Air + Dingin = Mengembun'
    const adaRusak = mojibakeRegex.test(teksRusak) || emojiRegex.test(teksRusak)
    expect(adaRusak).toBe(true)
  })

  it('lulus pada kode asli src/ yang bersih', () => {
    const srcDir = path.resolve('src')
    const mojibakeRegex = /\u00F0\u0178|\u00E2\u20ac|\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]/
    const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/u

    function scan(dir: string) {
      for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file)
        const stats = fs.statSync(fullPath)
        if (stats.isDirectory()) {
          scan(fullPath)
        } else if (stats.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css'))) {
          if (fullPath.includes('mojibakeScanner') || fullPath.includes('migrasi.test.ts')) continue
          const content = fs.readFileSync(fullPath, 'utf8')
          const lines = content.split(/\r?\n/)
          lines.forEach((line: string) => {
            if (mojibakeRegex.test(line) || emojiRegex.test(line)) {
              throw new Error(`Ditemukan: ${line}`)
            }
          })
        }
      }
    }

    expect(() => scan(srcDir)).not.toThrow()
  })
})
