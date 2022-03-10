import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, cleanup } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { renderWithPlugins } from '../tests/fixtures/render-with-plugins'
import Login from './login.vue'

import { createServer } from '../mirage'

let server: ReturnType<typeof createServer>

beforeEach(() => {
  server = createServer({
    environment: 'test',
  })
})

afterEach(() => {
  server.shutdown()
  cleanup()
})

describe('login.vue', () => {
  it('should display site title', () => {
    renderWithPlugins(Login)

    screen.getByText(/Habit Tracker/i)
  })

  it('should display a input type e-mail', () => {
    renderWithPlugins(Login)

    screen.getByLabelText(/e-mail/i, { selector: 'input' })
  })

  it('should display a input type password', () => {
    renderWithPlugins(Login)

    screen.getByLabelText(/password/i, {
      selector: 'input',
    })
  })

  it('should display submit button', async () => {
    renderWithPlugins(Login)

    screen.getByText(/submit/i, { selector: 'button' })
  })

  it('should not make post request when fields are not filled', async () => {
    renderWithPlugins(Login)

    const auth = vi.fn()

    server.post('/auth/login', () => auth())

    userEvent.click(screen.getByText(/submit/i))

    expect(auth).not.toHaveBeenCalled()
  })

  it('should show error message when e-mail field is empty', async () => {
    renderWithPlugins(Login)

    userEvent.click(screen.getByText(/submit/i))

    await screen.findByText(/This field is required/i, { selector: 'small' })
  })

  it('should show error message when password field is empty', async () => {
    renderWithPlugins(Login)

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'jonathan@jojo.com')

    await userEvent.click(screen.getByText(/submit/i))

    await screen.findByText(/This field is required/i, { selector: 'small' })
  })

  it('should make post request when the fields are filled', async () => {
    renderWithPlugins(Login)

    const auth = vi.fn().mockImplementation(() => true)

    server.post('/auth/login', (_, r) => auth(JSON.parse(r.requestBody)))

    const email = 'jonathan@jojo.com'
    const password = '123456'

    await userEvent.type(screen.getByLabelText(/e-mail/i), email)
    await userEvent.type(screen.getByLabelText(/password/i), password)

    await userEvent.click(screen.getByText(/submit/i))

    expect(auth).toHaveBeenCalledWith({
      email,
      password,
    })
  })
})
