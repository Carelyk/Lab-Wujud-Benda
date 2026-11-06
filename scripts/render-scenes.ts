import fs from 'node:fs'
import path from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import { CONTOH_UNTUNG_RUGI_ANIMASI } from '../src/data/untungRugiAnimasi'
import { SceneRenderer } from '../src/components/sekitar/scenes/SceneRenderer'

const previewDir = path.resolve('preview/scenes')
fs.mkdirSync(previewDir, { recursive: true })

for (const c of CONTOH_UNTUNG_RUGI_ANIMASI) {
  for (const p of [0, 0.5, 1]) {
    const html = renderToStaticMarkup(React.createElement(SceneRenderer, { id: c.id, progress: p }))
    fs.writeFileSync(path.join(previewDir, `${c.id}-p${p * 10}.svg`), html)
  }
}
console.log('Successfully generated preview SVGs for all scenes.')
