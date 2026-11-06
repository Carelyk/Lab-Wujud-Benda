import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('Pemindai Otomatis Mojibake & Emoji', () => {
  it('tidak menemukan mojibake atau emoji terlarang di file src/', () => {
    const srcDir = path.resolve('src')
    const mojibakeRegex = /ðŸ|â€|Ã[\u0080-\u00BF]|Â[\u0080-\u00BF]/
    const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/u

    function scan(dir: string) {
      for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file)
        const stats = fs.statSync(fullPath)
        if (stats.isDirectory()) {
          scan(fullPath)
        } else if (stats.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css'))) {
          if (fullPath.includes('mojibakeScanner') || fullPath.includes('storage.ts')) continue
          const content = fs.readFileSync(fullPath, 'utf8')
          const lines = content.split(/\r?\n/)
          lines.forEach((line, idx) => {
            if (mojibakeRegex.test(line) || emojiRegex.test(line)) {
              throw new Error(`Mojibake/Emoji ditemukan di ${fullPath}:${idx + 1} -> ${line.trim()}`)
            }
          })
        }
      }
    }

    expect(() => scan(srcDir)).not.toThrow()
  })
})
