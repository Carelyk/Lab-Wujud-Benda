# Laporan Pengembangan — Laboratorium Wujud Benda

**Proyek:** Laboratorium Wujud Benda (IPAS kelas 4 SD)
**Repo:** `Carelyk/Lab-Wujud-Benda` (branch `main`)
**Direktori kerja:** `C:\Users\User\Downloads\.LOMBA\lab-wujud-benda`
**Deploy:** Vercel — `https://lab-wujud-benda.vercel.app`
**Stack:** Vite 8 + React 19 + TypeScript + CSS Modules, Vitest, vite-plugin-pwa
**Status terakhir:** build produksi sukses, 52/52 unit test lulus, commit terbaru `0a2da24`.

---

## 1. Ringkasan Produk

Aplikasi web interaktif (tanpa backend, tanpa akun, tanpa iklan/pelacak) untuk siswa SD kelas 4 mempelajari wujud benda (padat, cair, gas) dan perubahan wujud lewat eksperimen panas/dingin, permainan sortir, kuis, lencana, siklus air, lensa partikel, dan contoh untung/rugi di kehidupan sehari-hari. Semua suara disintesis dengan Web Audio API (tanpa file audio). Maskot "Si Tetes" (4 ekspresi) memandu.

## 2. Fitur Utama (per commit)

1. `2f2fce9` — **Tahap 1 MVP**: eksperimen bebas, 5 benda (es, air, lilin, kapur barus, air di panci), pengatur suhu, prediksi, buku catatan otomatis, maskot.
2. `83527cb`/`57f5177`/`57a26b1` — konsistensi, lint, ukuran teks 18px di layar kecil.
3. `0dce35b` — **Tahap 2**: Sortir Benda (12 item), Kuis Bintang (8 soal), Lemari Lencana (8 lencana).
4. `ca56fed`/`4531a35` — nyala api lilin (candle flame art) saat dipanaskan.
5. `f4d7438` — **Tahap 3**: Siklus Air (water cycle), Lensa Partikel (particle lens).
6. `a76bc2a` — ganti cokelat → kapur barus; update test suite.
7. `c5ea845` — koreksi definisi kapur barus: **menyublim** (padat langsung ke gas, tanpa cair), tambah proses `menyublim` & `mengkristal`, 52 test lulus.
8. `67221ca` — **Mode baru "Wujud di Sekitar Kita"** (untung/rugi) dengan 10 contoh kartu + popup; tambah SFX `pop`, `splash`, `suhu`.
9. `0a2da24` — perbaikan posisi garis kuning (tidak menutup huruf J pada "Wujud"); footer kredit "Dirancang Oleh : Zefanya Rizqita Siathen".

## 3. Mode / Layar (5 mode di Beranda)

- **Eksperimen Bebas** (`#/eksperimen`): panaskan/dinginkan 5 benda; prediksi; catatan otomatis; toast proses.
- **Sortir Benda** (`#/sortir`): 12 item ke keranjang padat/cair/gas; bintang.
- **Kuis Bintang** (`#/kuis`): 8 soal acak, hingga 3 bintang.
- **Lemari Lencana** (`#/lencana`): 8 lencana + cara membuka.
- **Wujud di Sekitar Kita** (`#/sekitar`): 10 kartu contoh untung (6) & rugi (4), popup cerita, pesan Si Tetes.

Routing hash-based (`App.tsx`): `#/`, `#/eksperimen`, `#/sortir`, `#/kuis`, `#/lencana`, `#/siklus`, `#/sekitar`.

## 4. Data & Konten

- `src/data/objects.ts`: 5 benda (es, air, lilin, kapur-barus, panci) dengan band suhu, uap (air saja), prediksi. Kapur barus: padat→gas (menyublim), tanpa `uap`.
- `src/data/sortingItems.ts`: 18 item sortir.
- `src/data/quiz.ts`: 8 soal kuis.
- `src/data/badges.ts`: 8 lencana.
- `src/data/untungRugi.ts`: 10 contoh (6 untung, 4 rugi) dengan proses, deskripsi, pesan Tetes.
- `src/data/waterCycle.ts`: data siklus air.
- `src/data/labels.ts`: semua label/proses termasuk `menyublim`, `mengkristal`.

## 5. Komponen Utama

- `components/experiment/`: Bench, HeatControls, Thermometer, PredictionCard, NoteBook, ProcessToast.
- `components/experiment/art/`: Artwork router + IceArt, WaterArt, CandleArt (api), PotArt, CamphorArt (sublimation visual).
- `components/mascot/`: Tetes (4 mood) + Bubble.
- `components/ui/`: BigButton, Panel, StateBadge, Icons, Lencana.
- `components/layout/TopBar`: judul + toggle suara.
- `components/badges/BadgePopup`.

## 6. State, Storage, Sound

- `hooks/useProgress.ts`: progress (catatan, prediksi, lencana, kuis, sortir, partikel, siklus), localStorage key `lwb:v1` hanya lewat `utils/storage.ts`.
- `utils/sound.ts`: Web Audio synthesis; tipe `NamaSuara` = klik, benar, salah, cess, ding, tring, buka, pop, splash, suhu; mute toggle; resume on first gesture.
- `hooks/useSuhuBertahap.ts`: mesin suhu bertahap berhenti di tiap ambang.
- `hooks/useReducedMotion.ts`.

## 7. Tipe & Logika

- `types.ts`: `Wujud`, `NamaProses` (mencair, membeku, menguap, mendidih, mengembun, menyublim, mengkristal), `ScreenId` (+untungRugi), `BendaId`, `Progress`, dll.
- `utils/fase.ts`: `fasePada`, `resolvePhase`, `ambangSuhu`; pemetaan proses termasuk menyublim/mengkristal.
- `utils/fase.test.ts`: 52 test (data benda, fasePada, resolvePhase, sapu rentang suhu).

## 8. Styling & Aksesibilitas

- Token hanya di `src/styles/tokens.css`; CSS Modules per komponen.
- Responsif; teks minimal 18px di layar kecil.
- `prefers-reduced-motion` dihormati.
- PWA (service worker auto-update) untuk offline.

## 9. Perbaikan Terakhir (0a2da24)

- Garis kuning (`.coret`) di judul "Wujud Benda" di HomeScreen dipindah ke bawah (`bottom: -6px`, `padding-bottom: 16px`) agar tidak menutupi descender huruf J.
- Footer diubah menjadi "Dirancang Oleh : Zefanya Rizqita Siathen".

## 10. Verifikasi Terakhir

- `npm run test`: 4 file test, 52 lulus.
- `npm run build`: tsc -b + vite build sukses (dist/ terbentuk, PWA).
- Push ke `main` → Vercel redeploy.

## 11. Catatan untuk Claude (konteks kerja)

- Proyek di `.LOMBA`, siap dipromosikan ke `C:\Users\User\Downloads\Project\lab-wujud-benda` bila final.
- README masih menyebut Tahap 2/3 "not built" — perlu diperbarui (outdated).
- Science rule README menyebut "Menyublim is not used in Tahap 1" — sudah tidak akurat (sekarang dipakai).
- Tidak ada backend; semua state lokal.
- Jangan commit/push tanpa izin user (sudah di-push sesuai instruksi sebelumnya).

## 12. Daftar Commit (git log)

```
0a2da24 fix: avoid yellow stroke covering J in Wujud; update footer credit
67221ca feat: add Wujud di Sekitar Kita (Untung/Rugi) mode and sound effects
c5ea845 feat: correct camphor sublimation definitions and test cases
a76bc2a feat: replace chocolate with camphor and update test suites
f4d7438 feat: add water cycle and particle lens components
4531a35 feat: verified build with flame art on candle
ca56fed feat: add cute flame to candle art when heated
0dce35b feat: tahap 2 sorting, quiz, badges
57a26b1 fix: tahap 1 consistency and lint cleanup
83527cb fix: keep reading text at 18px on small screens
57f5177 docs: correct the lint note in README
2f2fce9 feat: build tahap 1 wujud benda experiment lab
```
