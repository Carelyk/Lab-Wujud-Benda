import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'

// base: './' keeps the build portable (Vercel, Netlify, GitHub Pages subfolder).
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Laboratorium Wujud Benda',
        short_name: 'Lab Wujud',
        description:
          'Laboratorium wujud benda untuk IPAS kelas 4 SD: padat, cair, gas, dan perubahan wujud.',
        lang: 'id',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        background_color: '#EAF6FF',
        theme_color: '#EAF6FF',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        cleanupOutdatedCaches: true,
        navigateFallback: 'index.html',
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
