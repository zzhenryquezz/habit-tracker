import { render, configure } from '@testing-library/vue'
import { Component } from 'vue'
import { useVueWind } from 'vue-wind'
import { createPinia } from 'pinia'

import { i18n } from '../../plugins/i18n'
import { createRouter } from '@/router'

configure({
  getElementError: (message) => {
    return new Error([message].join('\n'))
  },
})

export function renderWithPlugins(component: Component) {
  const router = createRouter()

  const wrapper = render(component, {
    global: {
      plugins: [i18n, useVueWind(), createPinia(), router],
      provide: [],
    },
  })

  return { wrapper, router }
}
