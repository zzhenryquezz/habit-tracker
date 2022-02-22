import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const filters = await request.validate({
      schema: schema.create({
        page: schema.number.optional(),
        limit: schema.number.optional([rules.range(1, 100)]),
      }),
    })

    return User.query().paginate(filters.page || 1, filters.limit)
  }

  public async update({ params, request, bouncer, auth }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const data = await request.validate(UpdateUserValidator)

    await bouncer.with('UserPolicy').authorize('isOwner', user)

    if (!auth.user?.isAdmin) {
      delete data.is_admin
    }

    user.merge(data)

    await user.save()

    return {
      message: 'User updated successfully',
    }
  }

  public async destroy({ params, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await bouncer.with('UserPolicy').authorize('isOwner', user)

    await user.delete()

    return {
      message: 'User deleted successfully',
    }
  }
}
