import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CandleArt } from './CandleArt'

describe('CandleArt flame', () => {
  it('menampilkan api saat lilin mencair (suhu 60)', () => {
    const html = renderToStaticMarkup(<CandleArt wujud="cair" uap={0} suhu={60} />)
    expect(html).toContain('data-testid="candle-flame"')
  })

  it('menampilkan api saat suhu 100', () => {
    const html = renderToStaticMarkup(<CandleArt wujud="cair" uap={0} suhu={100} />)
    expect(html).toContain('data-testid="candle-flame"')
  })

  it('mengikat api dan sumbu pada pusat yang sama', () => {
    const html = renderToStaticMarkup(<CandleArt wujud="cair" uap={0} suhu={100} />)
    expect(html).toContain('data-testid="candle-wick"')
    expect(html).toContain('translate(120 148)')
    expect(html).toContain('data-testid="candle-flame"')
  })

  it('menampilkan api sejak masih padat sebagai easter egg', () => {
    const html = renderToStaticMarkup(<CandleArt wujud="padat" uap={0} suhu={28} />)
    expect(html).toContain('data-testid="candle-flame"')
  })
})
