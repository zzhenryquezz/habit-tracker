import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'
import test from 'japa'
import { DateTime } from 'luxon'
import { createClient } from 'Test/fixtures/client'

test.group('HabitSequencesController (int)', (group) => {
  const client = createClient()

  group.before(async () => {
    await client.logout()

    await User.query().delete()
  })

  test('[index] should admin user get habit-sequences of other user', async (assert) => {
    await client.login()

    const user = await UserFactory.with('habits', 1, (h) => h.with('sequences', 5)).create()

    const habit = user.habits[0]

    const { body } = await client.get(`/api/habits/${habit.id}/sequences`).expect(200)

    assert.equal(body.data.length, 5)
  })

  test('[index] should normal user not get habit-sequences of other user', async (assert) => {
    await client.login({ isAdmin: false })

    const user = await UserFactory.with('habits', 1, (h) => h.with('sequences', 5)).create()

    const habit = user.habits[0]

    await client.get(`/api/habits/${habit.id}/sequences`).expect(403)
  })

  test('[index] should normal user not get habit-sequences of himself', async (assert) => {
    const user = await UserFactory.with('habits', 1, (h) => h.with('sequences', 5)).create()

    await client.login({ email: user.email, isAdmin: false })

    const habit = user.habits[0]

    const { body } = await client.get(`/api/habits/${habit.id}/sequences`).expect(200)

    assert.equal(body.data.length, 5)
  })

  test('[store] should admin user create habit-sequences of other user', async (assert) => {
    await client.login()

    const user = await UserFactory.with('habits', 1).create()

    const habit = user.habits[0]

    await client
      .post(`/api/habits/${habit.id}/sequences`)
      .send({ date: '2022-01-01', done: true })
      .expect(200)

    const sequence = await habit.related('sequences').query().first()

    assert.isNotNull(sequence)
  })

  test('[store] should normal user not create habit-sequences of other user', async () => {
    await client.login({ isAdmin: false })

    const user = await UserFactory.with('habits', 1).create()

    const habit = user.habits[0]

    await client
      .post(`/api/habits/${habit.id}/sequences`)
      .send({ date: '2022-01-01', done: true })
      .expect(403)
  })

  test('[store] should normal user create habit-sequences of himself', async (assert) => {
    const user = await UserFactory.with('habits', 1).create()

    await client.login({ email: user.email, isAdmin: false })

    const habit = user.habits[0]

    await client
      .post(`/api/habits/${habit.id}/sequences`)
      .send({ date: '2022-01-01', done: true })
      .expect(200)

    const sequence = await habit.related('sequences').query().first()

    assert.isNotNull(sequence)
  })

  test('[update] should admin user update habit-sequences of other user', async (assert) => {
    await client.login()

    const user = await UserFactory.with('habits', 1).create()

    const habit = user.habits[0]

    const sequence = await habit
      .related('sequences')
      .create({ date: DateTime.fromFormat('2022-01-01', 'yyyy-MM-dd'), done: true })

    await client
      .patch(`/api/habits/${habit.id}/sequences/${sequence.id}`)
      .send({ date: '2022-01-02', done: false })
      .expect(200)

    await sequence.refresh()

    assert.equal(sequence.date.toFormat('yyyy-MM-dd'), '2022-01-02')
    assert.isFalse(sequence.done)
  })

  test('[update] should normal user not update habit-sequences of other user', async (assert) => {
    await client.login({ isAdmin: false })

    const user = await UserFactory.with('habits', 1).create()

    const habit = user.habits[0]

    const sequence = await habit
      .related('sequences')
      .create({ date: DateTime.fromFormat('2022-01-01', 'yyyy-MM-dd'), done: true })

    await client
      .patch(`/api/habits/${habit.id}/sequences/${sequence.id}`)
      .send({ date: '2022-01-02', done: true })
      .expect(403)
  })

  test('[update] should normal user update habit-sequences of himself', async (assert) => {
    const user = await UserFactory.with('habits', 1).create()

    await client.login({ isAdmin: false, email: user.email })

    const habit = user.habits[0]

    const sequence = await habit
      .related('sequences')
      .create({ date: DateTime.fromFormat('2022-01-01', 'yyyy-MM-dd'), done: true })

    await client
      .patch(`/api/habits/${habit.id}/sequences/${sequence.id}`)
      .send({ date: '2022-01-02', done: true })
      .expect(200)

    await sequence.refresh()

    assert.equal(sequence.date.toFormat('yyyy-MM-dd'), '2022-01-02')
    assert.isTrue(sequence.done)
  })

  test('[destroy] should admin user delete a habit-sequences of other user', async (assert) => {
    await client.login()

    const user = await UserFactory.with('habits', 1).create()

    const habit = user.habits[0]

    const sequence = await habit
      .related('sequences')
      .create({ date: DateTime.fromFormat('2022-01-01', 'yyyy-MM-dd'), done: true })

    await client.delete(`/api/habits/${habit.id}/sequences/${sequence.id}`).expect(200)

    const deleted = await habit.related('sequences').query().first()

    assert.isNull(deleted)
  })

  test('[destroy] should normal user not delete a habit-sequences of other user', async () => {
    await client.login({ isAdmin: false })

    const user = await UserFactory.with('habits', 1).create()

    const habit = user.habits[0]

    const sequence = await habit
      .related('sequences')
      .create({ date: DateTime.fromFormat('2022-01-01', 'yyyy-MM-dd'), done: true })

    await client.delete(`/api/habits/${habit.id}/sequences/${sequence.id}`).expect(403)
  })

  test('[destroy] should normal user delete a habit-sequences of himself', async (assert) => {
    const user = await UserFactory.with('habits', 1).create()

    await client.login({ isAdmin: false, email: user.email })

    const habit = user.habits[0]

    const sequence = await habit
      .related('sequences')
      .create({ date: DateTime.fromFormat('2022-01-01', 'yyyy-MM-dd'), done: true })

    await client.delete(`/api/habits/${habit.id}/sequences/${sequence.id}`).expect(200)

    const deleted = await habit.related('sequences').query().first()

    assert.isNull(deleted)
  })
})
