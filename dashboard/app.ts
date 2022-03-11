import App from './App.vue'
import { createApp as baseCreateApp } from 'vue'
import { createRouter } from './router'
import authMiddleware from './router/middlewares/auth'

import { createServer } from './mirage'
import { useStore } from './stores'

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

  const store = useStore()

  router.beforeEach((to, from, next) => {
    return authMiddleware({
      to,
      from,
      next,
      store,
    })
  })

  return app
}
