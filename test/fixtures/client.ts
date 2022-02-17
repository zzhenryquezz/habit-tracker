import supertest from 'supertest'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

let token: string | undefined

export function createClient() {
  const client = {
    ...supertest(BASE_URL),
    isAuthenticated: () => !!token,
    login: async () => Promise.resolve(),
    logout: async () => Promise.resolve(),
  }

  const methods = ['get', 'post', 'patch', 'put', 'delete']

  methods.forEach((method) => {
    client[method] = (path: string) => {
      const request = supertest(BASE_URL)[method](path)

      if (token) {
        request.set('Authorization', `Bearer ${token}`)
      }

      return request
    }
  })

  client.logout = async () => {
    if (token) {
      await client.post('/api/auth/logout').expect(200)
    }

    token = undefined
  }

  client.login = async (isAdmin = true) => {
    await User.updateOrCreate(
      { email: 'admin-test@teste.com' },
      {
        name: 'Admin Test',
        email: 'admin-test@teste.com',
        password: 'ys-123',
        isAdmin,
      }
    )

    const { body } = await client
      .post('/api/auth/login')
      .send({
        email: 'admin-test@teste.com',
        password: 'ys-123',
      })
      .expect(200)

    token = body.token
  }

  return client
}
