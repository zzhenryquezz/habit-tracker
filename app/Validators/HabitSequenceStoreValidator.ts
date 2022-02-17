import { schema } from '@ioc:Adonis/Core/Validator'

export default class HabitSequenceStoreValidator {
  public schema = schema.create({
    date: schema.date({
      format: 'yyyy-MM-dd',
    }),
  })

  public messages = {}
}
