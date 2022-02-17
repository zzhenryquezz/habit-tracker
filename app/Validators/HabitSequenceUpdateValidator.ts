import { schema } from '@ioc:Adonis/Core/Validator'

export default class HabitSequenceUpdateValidator {
  public schema = schema.create({
    done: schema.boolean(),
    date: schema.date.optional({
      format: 'yyyy-MM-dd',
    }),
  })
  public messages = {}
}
