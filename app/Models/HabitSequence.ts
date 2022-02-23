import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class HabitSequence extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public habitId: number

  @column.date()
  public date: DateTime

  @column()
  public done: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
