import Factory from '@ioc:Adonis/Lucid/Factory'
import Habit from 'App/Models/Habit'
import HabitSequence from 'App/Models/HabitSequence'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('habits', () => HabitFactory)
  .build()

export const HabitSequencesFactory = Factory.define(HabitSequence, ({ faker }) => {
  return {
    date: DateTime.fromJSDate(faker.date.past()),
    done: faker.datatype.boolean(),
  }
}).build()

export const HabitFactory = Factory.define(Habit, ({ faker }) => {
  return {
    name: faker.name.findName(),
  }
})
  .relation('sequences', () => HabitSequencesFactory)
  .build()
