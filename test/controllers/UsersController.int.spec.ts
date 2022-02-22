import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'
import test from 'japa'
import { createClient } from 'Test/fixtures/client'

test.group('UserController (int)', (group) => {
  const client = createClient()

  group.before(async () => {
    await client.logout()

    await User.query().delete()
  })

  test('[index] should admin user get a list of users', async (assert) => {
    await client.login()

    await UserFactory.createMany(10)

    const { body } = await client.get('/api/users').expect(200)

    assert.equal(body.data.length, 11)
  })

  test('[index] should normal user not get a list of users', async () => {
    await client.login({ isAdmin: false })

    await UserFactory.createMany(10)

    await client.get('/api/users').expect(403)
  })

  test('[update] should admin user update other user', async (assert) => {
    await client.login()

    const user = await UserFactory.create()

    await client
      .patch(`/api/users/${user.id}`)
      .send({ name: 'Update name', is_admin: true })
      .expect(200)

    await user.refresh()

    assert.equal(user.name, 'Update name')
    assert.equal(user.isAdmin, true)
  })

  test('[update] should normal user not update other user', async () => {
    await client.login({ isAdmin: false })

    const user = await UserFactory.create()

    await client
      .patch(`/api/users/${user.id}`)
      .send({ name: 'Update name', is_admin: true })
      .expect(403)
  })

  test('[update] should normal user update himself', async (assert) => {
    const user = await UserFactory.create()

    await client.login({ isAdmin: false, email: user.email })

    await client.patch(`/api/users/${user.id}`).send({ name: 'Update myself' }).expect(200)

    await user.refresh()

    assert.equal(user.name, 'Update myself')
  })

  test('[update] should normal user not update "is_admin" field', async (assert) => {
    const user = await UserFactory.create()

    await client.login({ isAdmin: false, email: user.email })

    await client
      .patch(`/api/users/${user.id}`)
      .send({ name: 'Update myself', is_admin: true })
      .expect(200)

    await user.refresh()

    assert.equal(user.name, 'Update myself')
    assert.equal(user.isAdmin, false)
  })

  test('[destroy] should admin user delete other user', async (assert) => {
    await client.login()

    const user = await UserFactory.create()

    await client.delete(`/api/users/${user.id}`).expect(200)

    const deletedUser = await User.find(user.id)

    assert.isNull(deletedUser)
  })

  test('[destroy] should normal user not delete other user', async () => {
    await client.login({ isAdmin: false })

    const user = await UserFactory.create()

    await client.delete(`/api/users/${user.id}`).expect(403)
  })

  test('[destroy] should normal user delete himself', async (assert) => {
    const user = await UserFactory.create()

    await client.login({ isAdmin: false, email: user.email })

    await client.delete(`/api/users/${user.id}`).expect(200)

    const deletedUser = await User.find(user.id)

    assert.isNull(deletedUser)
  })
})
