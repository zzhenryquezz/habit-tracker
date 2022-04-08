import { schema } from '@ioc:Adonis/Core/Validator'

export default class HabitStoreValidator {
  constructor() {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string.optional(),
    start_date: schema.date.optional({
      format: 'yyyy-MM-dd',
    }),
  })

  public messages = {}
}
