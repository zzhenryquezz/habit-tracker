import { createServer as baseCreateServer } from 'miragejs'
import AuthController from './controllers/auth-controller'

export function createServer({ environment = 'development' } = {}) {
  return baseCreateServer({
    environment,
    routes() {
      this.namespace = 'api'

      this.post('/auth/login', AuthController.login)
    },
  })
}
