import { createServer as baseCreateServer } from 'miragejs'
import AuthController from './controllers/auth-controller'
import models from './models'
import factories from './factories'
import HabitsController from './controllers/habits-controller'

export function createServer({ environment = 'development' } = {}) {
  return baseCreateServer({
    environment,
    models,
    factories,
    seeds(server) {
      server.createList('habit', 8)
    },
    routes() {
      this.namespace = 'api'

      this.post('/auth/register', AuthController.register)

      this.post('/auth/login', AuthController.login)

      this.post('/auth/logout', AuthController.logout)

      this.get('/auth/who-i-am', AuthController.whoIAm)

      this.get('/habits', HabitsController.index)

      this.patch('/habits/:habit_id/sequences', HabitsController.updateSequences)
    },
  })
}
