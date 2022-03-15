import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const { API_PROXY_URL } = loadEnv(mode, path.resolve(__dirname))

  const proxyUrl = API_PROXY_URL || 'http://localhost:3333'

  return {
    envDir: path.resolve(__dirname),
    test: {
      environment: 'jsdom',
      reporters: 'verbose',
    },
    build: {
      outDir: path.resolve(__dirname, '..', './public'),
      emptyOutDir: true,
    },
    plugins: [vue()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname) }],
      dedupe: ['vue'],
    },
    server: {
      proxy: {
        '^/api/.*': {
          target: `${proxyUrl}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
