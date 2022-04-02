import { App } from 'vue'

export default function boot(app: App) {
  const components = import.meta.globEager('../components/**/*.vue')

  Object.entries(components).forEach(([key, component]) => {
    const name = key
      .replace('../components/', '')
      .replace('.vue', '')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace('-', '')

    app.component(name, component.default || component)
  })
}
