import App from './App.vue'
import { createApp as baseCreateApp } from 'vue'
import { createRouter } from './router'
import { createServer } from './mirage'

const { DEV, VITE_USE_PROXY } = import.meta.env

if (DEV && !VITE_USE_PROXY) {
  createServer()
}

export function createApp() {
  const app = baseCreateApp(App)
  const router = createRouter()

  app.use(router)

  const plugins = import.meta.globEager('./plugins/*.ts')

  Object.values(plugins).forEach((plugin) => {
    const boot = plugin.default || plugin

    boot(app, router)
  })

  return app
}
