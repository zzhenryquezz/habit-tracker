import test from 'japa'
import { createClient } from 'Test/fixtures/client'
import { UserFactory } from 'Database/factories'
import User from 'App/Models/User'

test.group('AuthController (int)', (group) => {
  const client = createClient()

  group.afterEach(async () => {
    await client.logout()
  })

  test('[register] should create a new user', async (assert) => {
    const { email, name, password } = await UserFactory.make()

    const payload = {
      name,
      email,
      password: password,
      password_confirmation: password,
    }

    await client.post('/api/auth/register').send(payload).expect(200)

    const user = await User.findBy('email', email)

    assert.exists(user)
  })

  test('[login] should return a valid api token', async (assert) => {
    const user = await UserFactory.create((u) => (u.password = '123456'))

    const { body } = await client
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: '123456',
      })
      .expect(200)

    assert.exists(body.token)
  })

  test('[logout] should invalidate api token', async () => {
    const user = await UserFactory.create((u) => (u.password = '123456'))

    const token = await client.generateToken({ email: user.email, password: '123456' })

    await client.post('/api/auth/logout').set('Authorization', `Bearer ${token}`).expect(200)

    await client.get('/api/auth/who-i-am').set('Authorization', `Bearer ${token}`).expect(401)
  })

  test('[whoIAm] should return logged user data', async (assert) => {
    const user = await UserFactory.create((u) => (u.password = '123456'))

    const token = await client.generateToken({ email: user.email, password: '123456' })

    const { body } = await client
      .get('/api/auth/who-i-am')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.equal(body.email, user.email)
  })
})
