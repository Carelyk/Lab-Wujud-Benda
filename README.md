# Laboratorium Wujud Benda

Interactive science lab for grade 4 (IPAS). Children heat and cool six objects
(ice, water, candle, chocolate, camphor, water in a pot) and watch the wujud change:
padat → cair → gas. A mascot named Tetes asks for a prediction first, and every
change is written into an automatic lab notebook.

Status: **Tahap 1 (MVP) and Tahap 2 (Sortir Benda, Kuis Bintang) are complete**. Tahap 3 (Siklus Air, Kaca Pembesar Partikel) has basic access and verification flags.

## Run

```bash
npm install
npm run dev       # dev server, http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ locally
npm test          # Vitest: phase + threshold logic
npm run lint      # oxlint
```

Node 20 or newer. No backend, no accounts, no ads, no trackers.

## Structure

```
src/
  App.tsx                 hash routing (#/ and #/eksperimen) + sound setup
  types.ts                shared types (Benda, Wujud, NamaProses, Progress)
  data/
    objects.ts            all six benda, their temperature bands and predictions
    labels.ts             every user-facing label and sentence
  utils/
    fase.ts               fasePada(), resolvePhase(), ambangSuhu()
    fase.test.ts          the unit tests that guard the phase logic
    sound.ts              Web Audio sounds + mute, resumes on first gesture
    storage.ts            the only module that touches localStorage (key lwb:v1)
  hooks/
    useSuhuBertahap.ts    gradual temperature engine, stops at every threshold
    useProgress.ts        progress state, notes, prediction answers
    useReducedMotion.ts   prefers-reduced-motion
  components/
    experiment/           Bench, HeatControls, Thermometer, PredictionCard,
                          NoteBook, ProcessToast, art/*.tsx (hand-written SVG)
    layout/               TopBar
    mascot/               Tetes (4 expressions) + speech bubble
    ui/                   BigButton, Panel, StateBadge, Pil, Icons
  screens/                HomeScreen, ExperimentScreen
  styles/                 tokens.css (all colours/radii/spacing), global.css
```

## Add or change an object

Everything is data; components never hard-code content.

1. Open `src/data/objects.ts` and add an entry to `BENDA_LIST`:

```ts
{
  id: 'kaca',                    // also used as the artwork id
  nama: 'Kaca',
  keterangan: 'One short sentence for the tooltip.',
  suhuAwal: 25,                  // realistic starting temperature
  suhuMin: -20,
  suhuMaks: 120,
  fase: [
    { mulai: -20, wujud: 'padat' },
    { mulai: 100, wujud: 'cair' },
  ],
  // optional, liquids only
  uap: { tipis: 40, didih: 100 },
  prediksi: { pertanyaan: '...', benar: 'cair' },
}
```

Rules enforced by `npm test`:

- `fase` must be sorted ascending by `mulai`, and the first band must cover
  `suhuMin`.
- If `uap` exists, `uap.didih` must equal the `mulai` of the gas band, and
  `uap.tipis` must be lower than `uap.didih`.
- Every `suhuAwal` must sit inside `suhuMin..suhuMaks`.

2. Add the id to `BendaId` in `src/types.ts`.
3. Add artwork: create `src/components/experiment/art/KacaArt.tsx` (an SVG that
   draws every layer once) and register it in `art/Artwork.tsx`.
4. Add an icon mapping in `screens/ExperimentScreen.tsx` (`IKON`).

## Add a quiz question (Tahap 2)

Not implemented yet. When Tahap 2 lands, questions belong in a new
`src/data/questions.ts` file next to `objects.ts`, not inside a component.
Every question needs a short explanation that is read after answering.

## Science rules the content follows

- Only temperature changes wujud. Pressure is deliberately not part of the app.
- Terms used: membeku, mencair, menguap, mendidih, mengembun. Menyublim is not
  used in Tahap 1.
- Water evaporates slowly from about 30 °C and boils at 100 °C. Heating ice or
  water above 100 °C shows gas, because the thermometer goes past boiling.
- Language is simple Indonesian, short sentences, for ages 9–10.

## Deploy

The build uses `base: './'`, so `dist/` works on a domain root or in a subfolder.

- Netlify: `netlify.toml` is included (build `npm run build`, publish `dist`).
- Vercel: `vercel.json` is included; Vercel also auto-detects Vite.
- GitHub Pages: publish `dist/` to the `gh-pages` branch. Hash routing means no
  404 rewrite is needed.

The app ships a small service worker (vite-plugin-pwa, auto-update) so it keeps
working offline after the first visit.

## Menyetel tempo label

Tempo di layar Eksperimen dipusatkan di `src/data/tempo.ts`.
`JEDA_LABEL_MS` memberi waktu anak melihat benda mulai berubah sebelum label
muncul. `DURASI_LABEL_MIN_MS` menentukan waktu baca minimum, `FADE_LABEL_MS`
lama hilangnya label, `JEDA_AMBANG_MS` lama berhenti pada setiap ambang, dan
`LAJU_SUHU_PER_DETIK` mengatur laju termometer. Ubah angka di satu file itu
dan jalankan test sebelum dipakai di kelas.

## Known issues

- `npm audit` reports 6 advisories (2 low, 4 moderate) that all come from
  `workbox-build` build-time dependencies (`deepmerge`, `glob`, `minimatch`).
  They are not shipped to the browser; the only fix npm offers is downgrading
  `vite-plugin-pwa`, which drops Vite 8 support. Revisit when upstream updates.

## Credits

Fonts: Fredoka and Nunito via Google Fonts. All artwork is hand-written SVG in
this repository. No image or audio assets are downloaded.
