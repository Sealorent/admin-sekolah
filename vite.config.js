import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePWA from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'auto',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Admin Sekolah',
        short_name: 'Admin Sekolah',
        description: 'Admin Sekolah',
        theme_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
