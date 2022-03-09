import faker from 'faker'
import { Factory } from 'miragejs'

const userFactory = Factory.extend({
  name: () => faker.name.findName(),
  email: () => faker.internet.email(),
})

export default {
  user: userFactory,
}
