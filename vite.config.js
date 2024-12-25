import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Fitness Tracker',
        short_name: 'FitnessApp',
        description: 'A fitness tracker app to help you monitor your health and fitness progress.',
        theme_color: '#000000',
        background_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/assets/images/logoImage.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/images/logoImage.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:js|css|html|png|jpg|jpeg|svg|woff2|ttf)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
});
