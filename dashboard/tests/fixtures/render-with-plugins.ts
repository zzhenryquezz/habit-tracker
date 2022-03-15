import { render } from '@testing-library/vue'
import { Component } from 'vue'
import VWind from 'vue-wind'
import { createPinia } from 'pinia'

import { i18n } from '../../plugins/i18n'
import { createRouter } from '@/router'

export function renderWithPlugins(component: Component) {
  const router = createRouter()

  const wrapper = render(component, {
    global: {
      plugins: [i18n, VWind, createPinia(), router],
      provide: [],
    },
  })

  return { wrapper, router }
}
