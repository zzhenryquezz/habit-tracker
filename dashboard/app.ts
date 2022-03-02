import App from './App.vue'
import { createApp as baseCreateApp } from 'vue'
import { createRouter } from './router'
import boot from './plugins/vue-wind'

export function createApp() {
  const app = baseCreateApp(App)
  const router = createRouter()

  app.use(router)

  boot(app)

  return app
}
