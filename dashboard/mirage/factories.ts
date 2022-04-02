import { Factory } from 'miragejs'

const userFactory = Factory.extend({
  name: (i) => `User ${i}`,
  email: (i) => `user-${i}@test.com`,
})

const habitFactory = Factory.extend({
  name: (i) => `Habit ${i}`,
})

export default {
  user: userFactory,
  habit: habitFactory,
}
