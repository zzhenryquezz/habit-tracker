import App from './App.vue'

import './styles/index.css'

import { createApp as baseCreateApp } from 'vue'
import { createRouter } from './router'
import authMiddleware from './router/middlewares/auth'

import { useStore } from './stores'

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
