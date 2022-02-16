import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateUserValidator {
  constructor() {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.confirmed()]),
  })

  public messages = {
    'email.unique': 'Email already in registered',
  }
}
