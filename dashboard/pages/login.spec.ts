import { describe, it, expect } from 'vitest'
import { renderWithPlugins } from '../tests/fixtures/render-with-plugins'
import Login from './login.vue'

describe('login.vue', () => {
  it('should render the login page', () => {
    const { getByText } = renderWithPlugins(Login)

    expect(getByText(/Habit Tracker/i)).toBeTruthy()
  })
})
