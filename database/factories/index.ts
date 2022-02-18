import Factory from '@ioc:Adonis/Lucid/Factory'
import Habit from 'App/Models/Habit'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('habits', () => HabitFactory)
  .build()

export const HabitFactory = Factory.define(Habit, ({ faker }) => {
  return {
    name: faker.name.findName(),
  }
}).build()
