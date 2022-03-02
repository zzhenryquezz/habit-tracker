import { App } from 'vue'
import wind from 'vue-wind'

export default function boot(app: App) {
  app.use(wind)
}
