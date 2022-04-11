import { App } from 'vue'

export default function boot(app: App) {
  const files = import.meta.globEager('../components/**/*.vue')

  Object.entries(files).forEach(([key, component]) => {
    const name = key
      .replace('../components/', '')
      .replace('.vue', '')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/-/g, '')

    app.component(name, component.default || component)
  })
}
