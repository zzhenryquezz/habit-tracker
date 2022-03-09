import { render } from '@testing-library/vue'
import { Component } from 'vue'
import { i18n } from '../../plugins/i18n'
import VWind from 'vue-wind'

export function renderWithPlugins(component: Component) {
  return render(component, {
    global: {
      plugins: [i18n, VWind],
    },
  })
}
