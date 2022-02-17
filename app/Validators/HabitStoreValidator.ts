import { schema } from '@ioc:Adonis/Core/Validator'

export default class HabitStoreValidator {
  constructor() {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string.optional(),
  })

  public messages = {}
}
