import test from 'japa'
import Habit from 'App/Models/Habit'
import { UserFactory } from 'Database/factories'
import { createClient } from 'Test/fixtures/client'

test.group('HabitsController (int)', (group) => {
  const client = createClient()

  group.afterEach(async () => {
    await client.logout()
    await Habit.query().delete()
  })

  test('[index] should admin user get habits of other user', async (assert) => {
    await client.login()

    const user = await UserFactory.with('habits', 5).create()

    const { body } = await client.get(`/api/users/${user.id}/habits`)

    assert.equal(body.length, 5)
  })

  test('[index] should normal user not get habits of other user', async () => {
    await client.login({ isAdmin: false })

    const user = await UserFactory.with('habits', 5).create()

    await client.get(`/api/users/${user.id}/habits`).expect(403)
  })

  test('[index] should normal get habits of himself', async (assert) => {
    const { email, id } = await UserFactory.with('habits', 5).create()

    await client.login({ email: email, isAdmin: false })

    const { body } = await client.get(`/api/users/${id}/habits`).expect(200)

    assert.equal(body.length, 5)
  })

  test('[show] should admin user get a habit of other user', async (assert) => {
    await client.login()

    const { habits } = await UserFactory.with('habits', 1).create()

    const { body } = await client.get(`/api/users/${habits[0].userId}/habits/${habits[0].id}`)

    assert.equal(body.id, habits[0].id)
  })

  test('[show] should normal user not get a habit of other user', async () => {
    await client.login({ isAdmin: false })

    const { habits } = await UserFactory.with('habits', 1).create()

    await client.get(`/api/users/${habits[0].userId}/habits/${habits[0].id}`).expect(403)
  })

  test('[show] should normal user get a habit of himself', async () => {
    const { habits, email } = await UserFactory.with('habits', 1).create()

    await client.login({ email, isAdmin: false })

    await client.get(`/api/users/${habits[0].userId}/habits/${habits[0].id}`).expect(200)
  })

  test('[store] should admin user create a habit of other user', async (assert) => {
    await client.login()

    const { id } = await UserFactory.create()

    const { body } = await client.post(`/api/users/${id}/habits`).send({
      name: 'test',
    })

    assert.equal(body.name, 'test')
  })

  test('[store] should normal user not create a habit of other user', async (assert) => {
    await client.login({ isAdmin: false })

    const { id } = await UserFactory.create()

    await client.post(`/api/users/${id}/habits`).expect(403)
  })

  test('[store] should normal user create a habit of himself', async (assert) => {
    const { id, email } = await UserFactory.create()

    await client.login({ isAdmin: false, email })

    const { body } = await client
      .post(`/api/users/${id}/habits`)
      .send({ name: 'teste' })
      .expect(200)

    assert.equal(body.name, 'teste')
  })

  test('[update] should admin user update a habit of other user', async (assert) => {
    await client.login()

    const user = await UserFactory.with('habits', 1).create()
    const habit = user.habits[0]

    await client
      .patch(`/api/users/${user.id}/habits/${habit.id}`)
      .send({ name: 'teste-update' })
      .expect(200)

    await habit.refresh()

    assert.equal(habit.name, 'teste-update')
  })

  test('[update] should normal user not update a habit of other user', async () => {
    await client.login({ isAdmin: false })

    const user = await UserFactory.with('habits', 1).create()
    const habit = user.habits[0]

    await client
      .patch(`/api/users/${user.id}/habits/${habit.id}`)
      .send({ name: 'teste-update' })
      .expect(403)
  })

  test('[update] should normal user update a habit of himself', async (assert) => {
    const user = await UserFactory.with('habits', 1).create()
    const habit = user.habits[0]

    await client.login({ email: user.email, isAdmin: false })

    await client
      .patch(`/api/users/${user.id}/habits/${habit.id}`)
      .send({ name: 'teste-update' })
      .expect(200)

    await habit.refresh()

    assert.equal(habit.name, 'teste-update')
  })

  test('[destroy] should admin user delete a habit of other user', async (assert) => {
    await client.login()

    const user = await UserFactory.with('habits', 1).create()
    const habit = user.habits[0]

    await client.delete(`/api/users/${user.id}/habits/${habit.id}`).expect(200)

    const exist = await Habit.find(habit.id)

    assert.isNull(exist)
  })

  test('[destroy] should normal user not delete a habit of other user', async (assert) => {
    await client.login({ isAdmin: false })

    const user = await UserFactory.with('habits', 1).create()
    const habit = user.habits[0]

    await client.delete(`/api/users/${user.id}/habits/${habit.id}`).expect(403)

    const exist = await Habit.find(habit.id)

    assert.isNotNull(exist)
  })

  test('[destroy] should normal user delete a habit of himself', async (assert) => {
    const user = await UserFactory.with('habits', 1).create()

    await client.login({ email: user.email, isAdmin: false })

    const habit = user.habits[0]

    await client.delete(`/api/users/${user.id}/habits/${habit.id}`).expect(200)

    const exist = await Habit.find(habit.id)

    assert.isNull(exist)
  })
})
