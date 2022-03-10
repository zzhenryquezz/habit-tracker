import { Factory } from 'miragejs'

const userFactory = Factory.extend({
  name: (i) => `User ${i}`,
  email: (i) => `user-${i}@test.com`,
})

export default {
  user: userFactory,
}
