import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'

export default class Admin {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    const message = 'Not enough permissions'
    const status = 403
    const errorCode = 'E_UNAUTHORIZED'

    if (!auth.user || !auth.user.isAdmin) {
      throw new UnAuthorizedException(message, status, errorCode)
    }
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
