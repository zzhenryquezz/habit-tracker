import { Request, Response } from 'miragejs'
import { Schema } from '../types'

class AuthController {
  public login(schema: Schema, request: Request) {
    return new Response(200, {}, { message: 'Login success' })
  }
}

export default new AuthController()
