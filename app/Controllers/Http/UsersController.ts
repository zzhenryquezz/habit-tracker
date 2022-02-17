import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()

    return users
  }

  public async update({ params, request, bouncer, auth }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const data = await request.validate(UpdateUserValidator)

    await bouncer.with('UserPolicy').authorize('update', user)

    if (!auth.user?.isAdmin) {
      delete data.is_admin
    }

    user.merge(data)

    await user.save()

    return {
      message: 'User updated successfully',
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()

    return {
      message: 'User deleted successfully',
    }
  }
}
