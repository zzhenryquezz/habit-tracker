import { schema } from '@ioc:Adonis/Core/Validator'

export default class HabitSequenceIndexValidator {
  public schema = schema.create({
    page: schema.number.optional(),
    limit: schema.number.optional(),
  })

  public messages = {}
}
