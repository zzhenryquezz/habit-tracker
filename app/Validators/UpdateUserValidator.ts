import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  public schema = schema.create({
    name: schema.string.optional(),
    password: schema.string.optional({}, [rules.confirmed()]),
    is_admin: schema.boolean.optional(),
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
  })

  public messages = {}
}
