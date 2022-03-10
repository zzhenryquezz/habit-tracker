import { Response } from 'miragejs'
import { Schema } from '../types'

class AuthController {
  public login() {
    const token = Math.random().toString(36).substring(2, 15)

    return new Response(200, {}, { token })
  }

  public whoIAm(schema: Schema) {
    const user = schema.create('user')

    return new Response(200, {}, user)
  }
}

export default new AuthController()
