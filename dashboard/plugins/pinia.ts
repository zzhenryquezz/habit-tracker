import { App } from 'vue'
import { createPinia } from 'pinia'

export default function boot(app: App) {
  app.use(createPinia())
}
