import App from './App.vue'

import './styles/index.css'

import { createApp as baseCreateApp } from 'vue'
import { createRouter } from './router'
import authMiddleware from './router/middlewares/auth'
import { useStore } from './stores'
import { createPinia } from 'pinia'

export async function createApp() {
  const app = baseCreateApp(App)
  const router = createRouter()
  const pinia = createPinia()

  app.use(pinia)

  const files = import.meta.glob('./plugins/*.ts')

  const plugins = await Promise.all(Object.values(files).map((r) => r()))

  plugins.map((p) => p.default).forEach((boot) => boot(app))

  const store = useStore()

  router.beforeEach((to, from, next) =>
    authMiddleware({
      to,
      from,
      next,
      store,
    })
  )

  app.use(router)

  return app
}
