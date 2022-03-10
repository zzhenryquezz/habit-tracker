import { render } from '@testing-library/vue'
import { Component } from 'vue'
import VWind from 'vue-wind'
import { createPinia } from 'pinia'

import { i18n } from '../../plugins/i18n'

export function renderWithPlugins(component: Component) {
  return render(component, {
    global: {
      plugins: [i18n, VWind, createPinia()],
      provide: [],
    },
  })
}
