import { App } from 'vue'
import { useVueWind } from 'vue-wind'

const VWind = useVueWind()

export default function boot(app: App) {
  app.use(VWind)
}
