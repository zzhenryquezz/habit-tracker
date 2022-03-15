import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import SignUp from '@/pages/sign-up.vue'
import { renderWithPlugins } from '@/tests/fixtures/render-with-plugins'
import { createServer } from '@/mirage'
import { Request, Response } from 'miragejs'

let server: ReturnType<typeof createServer>

beforeEach(() => {
  vi.resetAllMocks()

  server = createServer({
    environment: 'test',
  })
})

afterEach(() => {
  server?.shutdown()
  cleanup()
})

describe('sign-up.vue', () => {
  it('should display app title', () => {
    renderWithPlugins(SignUp)

    screen.getByText(/Habit tracker/i, { selector: 'h1' })
  })

  it('should display name input', () => {
    renderWithPlugins(SignUp)

    screen.getByLabelText(/name/i)
  })

  it('should display e-mail input', () => {
    renderWithPlugins(SignUp)

    screen.getByLabelText(/e-mail/i)
  })

  it('should display password input', () => {
    renderWithPlugins(SignUp)

    screen.getByLabelText('Password', { selector: 'input', exact: true })
  })

  it('should display confirm password input', () => {
    renderWithPlugins(SignUp)

    screen.getByLabelText('Confirm password', { selector: 'input', exact: true })
  })

  it('should display submit button', () => {
    renderWithPlugins(SignUp)

    screen.getByText(/submit/i, { selector: 'button' })
  })

  it('should display "Already have an account?" with link to login page', () => {
    renderWithPlugins(SignUp)

    screen.getByText(/Already have an account\?/i)

    screen.getByText(/login/i, { selector: 'a' })
  })

  it('should show error messages with fields are not filled', async () => {
    renderWithPlugins(SignUp)

    await userEvent.click(screen.getByText(/submit/i, { selector: 'button' }))

    const messages = screen.queryAllByText(/This field is required/i)

    expect(messages).toHaveLength(4)
  })

  it('should make request when fields are filled', async () => {
    renderWithPlugins(SignUp)

    const register = vi.fn()

    const user = {
      name: 'Johnathan',
      email: 'jonathan@jojo.com',
      password: '123456',
      password_confirmation: '123456',
    }

    await userEvent.type(screen.getByLabelText(/name/i), user.name)
    await userEvent.type(screen.getByLabelText(/e-mail/i), user.email)
    await userEvent.type(screen.getByLabelText('Password', { exact: true }), user.password)
    await userEvent.type(screen.getByLabelText(/confirm password/i), user.password_confirmation)

    server.post('/auth/register', (_, request: Request) =>
      register(JSON.parse(request.requestBody))
    )

    await userEvent.click(screen.getByText(/submit/i))

    expect(register).toHaveBeenCalledWith(user)
  })

  it('should not make request when fields are not filled', async () => {
    renderWithPlugins(SignUp)

    const register = vi.fn()

    server.post('/auth/register', (_, request: Request) =>
      register(JSON.parse(request.requestBody))
    )

    await userEvent.click(screen.getByText(/submit/i))

    expect(register).not.toHaveBeenCalled()
  })

  it('should disable submit button and show loading text when making the request', async () => {
    renderWithPlugins(SignUp)

    const user = {
      name: 'Johnathan',
      email: 'jonathan@jojo.com',
      password: '123456',
      password_confirmation: '123456',
    }

    await userEvent.type(screen.getByLabelText(/name/i), user.name)
    await userEvent.type(screen.getByLabelText(/e-mail/i), user.email)
    await userEvent.type(screen.getByLabelText('Password', { exact: true }), user.password)
    await userEvent.type(screen.getByLabelText(/confirm password/i), user.password_confirmation)

    await userEvent.click(screen.getByText(/submit/i))

    const btn = await screen.findByText(/loading.../i, { selector: 'button' })

    expect(btn.getAttribute('disabled')).not.toBeNull()
  })

  it('should redirect to login page when user is registered', async () => {
    const { router } = renderWithPlugins(SignUp)

    const user = {
      name: 'Johnathan',
      email: 'jonathan@jojo.com',
      password: '123456',
      password_confirmation: '123456',
    }

    const push = vi.spyOn(router, 'push')

    await userEvent.type(screen.getByLabelText(/name/i), user.name)
    await userEvent.type(screen.getByLabelText(/e-mail/i), user.email)
    await userEvent.type(screen.getByLabelText('Password', { exact: true }), user.password)
    await userEvent.type(screen.getByLabelText(/confirm password/i), user.password_confirmation)

    await userEvent.click(screen.getByText(/submit/i))

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).toBeNull()
    })

    expect(push).toHaveBeenCalledWith('/login')
  })

  it('should show error message when the request fail', async () => {
    renderWithPlugins(SignUp)

    const user = {
      name: 'Johnathan',
      email: 'jonathan@jojo.com',
      password: '123456',
      password_confirmation: '123456',
    }

    await userEvent.type(screen.getByLabelText(/name/i), user.name)
    await userEvent.type(screen.getByLabelText(/e-mail/i), user.email)
    await userEvent.type(screen.getByLabelText('Password', { exact: true }), user.password)
    await userEvent.type(screen.getByLabelText(/confirm password/i), user.password_confirmation)

    server.post('/auth/register', () => new Response(401))

    await userEvent.click(screen.getByText(/submit/i))

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).toBeNull()
    })

    screen.getByText(/Something went wrong/i)
  })
})
