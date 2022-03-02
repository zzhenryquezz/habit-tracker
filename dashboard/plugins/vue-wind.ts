import { App } from 'vue'
import VWind from 'vue-wind'

export default function boot(app: App) {
  app.use(VWind)
}
