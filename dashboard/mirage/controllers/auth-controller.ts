import { Response, Request } from 'miragejs'
import { Schema } from '../types'

const token = 'auth-token'
class AuthController {
  public login() {
    return new Response(200, {}, { token })
  }

  public whoIAm(schema: Schema, request: Request) {
    const headerToken = request.requestHeaders.Authorization.split(' ')[1]

    if (token !== headerToken) {
      return new Response(401)
    }

    const user = schema.create('user')

    return new Response(200, {}, user.attrs)
  }

  public logout() {
    return new Response(200)
  }

  public register(schema: Schema, request: Request) {
    const user = JSON.parse(request.requestBody)

    schema.create('user', user)

    return new Response(200)
  }
}

export default new AuthController()
