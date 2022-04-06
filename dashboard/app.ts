import App from './App.vue'

import './styles/index.css'

import { createApp as baseCreateApp } from 'vue'
import { createRouter } from './router'
import authMiddleware from './router/middlewares/auth'
import { useStore } from './stores'

export async function createApp() {
  const app = baseCreateApp(App)
  const router = createRouter()

  const plugins = [
    './plugins/pinia.ts',
    './plugins/i18n.ts',
    './plugins/vue-wind.ts',
    './plugins/icons.ts',
    './plugins/global-components.ts',
  ]

  await Promise.all(
    plugins.map(async (filename) => {
      const boot = (await import(/* @vite-ignore */ filename)).default

      await boot(app, router)
    })
  )

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
