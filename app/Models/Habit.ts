import { DateTime } from 'luxon'
import { BaseModel, column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import HabitSequence from './HabitSequence'
import moment from 'moment'

export default class Habit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => HabitSequence)
  public sequences: HasMany<typeof HabitSequence>

  @computed({ serializeAs: 'sequences_needed' })
  public get sequencesNeeded() {
    return moment().diff(moment(this.createdAt.toISO()), 'days')
  }
}
