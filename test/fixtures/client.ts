import supertest from 'supertest'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

let token: string | undefined

interface MyClient extends supertest.SuperTest<supertest.Test> {
  isAuthenticated: () => boolean
  generateToken: (user?: Partial<User>) => Promise<string>
  login: (user?: Partial<User>) => Promise<void>
  logout: () => Promise<void>
}

export function createClient() {
  const client = {
    ...supertest(BASE_URL),
    isAuthenticated: () => !!token,
  } as MyClient

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

  client.generateToken = async (user?: Pick<User, 'email' | 'password'>) => {
    const { body } = await client.post('/api/auth/login').send(user).expect(200)

    return body.token
  }

  client.login = async (data?: Partial<User>) => {
    const payload = {
      name: 'user-test',
      email: 'test@teste.com',
      password: '123456',
      isAdmin: true,
      ...data,
    }

    await User.updateOrCreate({ email: payload.email }, payload)

    token = await client.generateToken(payload)
  }

  return client
}
