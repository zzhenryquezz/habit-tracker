import { App, Component } from 'vue'

export function getComponents() {
  const components: Record<string, Component> = {}
  const files = import.meta.globEager('../components/**/*.vue')

  Object.entries(files).forEach(([key, component]) => {
    const name = key
      .replace('../components/', '')
      .replace('.vue', '')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace('-', '')

    components[name] = component.default
  })

  return components
}

export default function boot(app: App) {
  const components = getComponents()

  Object.entries(components).forEach(([key, component]) => {
    app.component(key, component)
  })
}
