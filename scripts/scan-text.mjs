import fs from 'node:fs'
import path from 'node:path'

const srcDir = path.resolve('src')
const mojibakeRegex = /\u00F0\u0178|\u00E2\u20ac|\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]/
const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/u

function scan(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file)
    const stats = fs.statSync(fullPath)
    if (stats.isDirectory()) {
      scan(fullPath)
    } else if (stats.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css'))) {
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

try {
  scan(srcDir)
  console.log('SCAN_OK: Nol temuan mojibake atau emoji di src/')
} catch (err) {
  console.error(err.message)
  process.exit(1)
}
