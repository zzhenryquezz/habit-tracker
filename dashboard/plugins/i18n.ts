import { App } from 'vue'
import { createI18n } from 'vue-i18n'

export default function boot(app: App) {
  const files = import.meta.globEager('../locales/*.json')

  const messages = Object.entries(files).reduce((acc, [filename, file]) => {
    const lang = filename.replace('.json', '').replace('../locales/', '')
    return {
      ...acc,
      [lang]: file.default || {},
    }
  }, {})

  const i18n = createI18n({
    messages,
  })

  app.use(i18n)
}
