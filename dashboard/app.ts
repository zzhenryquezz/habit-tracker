import App from './App.vue'
import { createApp as baseCreateApp } from 'vue'
import { createRouter } from './router'

export function createApp() {
  const app = baseCreateApp(App)
  const router = createRouter()

  app.use(router)

  return app
}
