import { useState } from 'react'
import { CONTOH_UNTUNG_RUGI, type ContohUntungRugi } from '../data/untungRugi'
import { Bubble, Mascot } from '../components/mascot/Mascot'
import { mainkan } from '../utils/sound'
import s from './UntungRugiScreen.module.css'

interface Props {
  onBack: () => void
}

export function UntungRugiScreen({ onBack }: Props) {
  const [tab, setTab] = useState<'untung' | 'rugi'>('untung')
  const [selected, setSelected] = useState<ContohUntungRugi | null>(null)
  const [dibuka, setDibuka] = useState<Set<string>>(new Set())

  const items = CONTOH_UNTUNG_RUGI.filter((item) => item.kategori === tab)

  const handleOpen = (item: ContohUntungRugi) => {
    setSelected(item)
    setDibuka((prev) => new Set(prev).add(item.id))
    void mainkan('pop')
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <button onClick={onBack} className={s.backBtn}>
          ← Beranda
        </button>
        <h1>🌍 Wujud di Sekitar Kita</h1>
        <div className={s.badgeCounter}>
          Dibuka: {dibuka.size} / {CONTOH_UNTUNG_RUGI.length}
        </div>
      </header>

      <div className={s.tabRow}>
        <button
          className={`${s.tab} ${tab === 'untung' ? s.activeUntung : ''}`}
          onClick={() => {
            setTab('untung')
            void mainkan('klik')
          }}
        >
          👍 Menguntungkan ({CONTOH_UNTUNG_RUGI.filter((i) => i.kategori === 'untung').length})
        </button>
        <button
          className={`${s.tab} ${tab === 'rugi' ? s.activeRugi : ''}`}
          onClick={() => {
            setTab('rugi')
            void mainkan('klik')
          }}
        >
          👎 Merugikan ({CONTOH_UNTUNG_RUGI.filter((i) => i.kategori === 'rugi').length})
        </button>
      </div>

      <div className={s.grid}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`${s.card} ${tab === 'untung' ? s.cardUntung : s.cardRugi} ${
              idx % 2 === 0 ? s.rotate1 : s.rotate2
            }`}
            onClick={() => handleOpen(item)}
          >
            <div className={s.cardTop}>
              <span className={s.processTag}>{item.proses}</span>
              <span className={s.checkMark}>{dibuka.has(item.id) ? '⭐' : '📌'}</span>
            </div>
            <h3>{item.judul}</h3>
            <p className={s.snippet}>{item.deskripsi.substring(0, 60)}...</p>
            <span className={s.tapHint}>Ketuk untuk lihat cerita →</span>
          </div>
        ))}
      </div>

      {selected && (
        <div className={s.modalOverlay} onClick={() => setSelected(null)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={s.modalBadge}>{selected.kategori === 'untung' ? '👍 Menguntungkan' : '👎 Merugikan'}</span>
            <h2>{selected.judul}</h2>
            <div className={s.processPill}>Proses: {selected.proses}</div>
            <p className={s.desc}>{selected.deskripsi}</p>
            
            <div className={s.tetesBox}>
              <Mascot mood="senang" size={60} />
              <Bubble>{selected.pesanTetes}</Bubble>
            </div>

            <button onClick={() => setSelected(null)} className={s.closeBtn}>
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className={s.footerMascot}>
        <Mascot mood="senang" size={70} />
        <Bubble>
          Perubahan wujud ada di sekitar kita setiap hari! Pilih kartu di atas untuk melihat manfaat atau akibatnya.
        </Bubble>
      </div>
    </div>
  )
}
