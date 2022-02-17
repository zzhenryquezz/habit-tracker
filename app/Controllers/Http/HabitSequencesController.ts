import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Habit from 'App/Models/Habit'
import HabitSequenceIndexValidator from 'App/Validators/HabitSequenceIndexValidator'
import HabitSequenceStoreValidator from 'App/Validators/HabitSequenceStoreValidator'
import HabitSequenceUpdateValidator from 'App/Validators/HabitSequenceUpdateValidator'

export default class HabitSequencesController {
  public async index({ request, params, bouncer }: HttpContextContract) {
    const habit = await Habit.findOrFail(params.habit_id)

    await bouncer.with('HabitPolicy').authorize('isOwner', habit)

    const filters = await request.validate(HabitSequenceIndexValidator)

    return habit
      .related('sequences')
      .query()
      .paginate(filters.page || 1, filters.limit)
  }

  public async store({ request, params, bouncer }: HttpContextContract) {
    const habit = await Habit.findOrFail(params.habit_id)

    await bouncer.with('HabitPolicy').authorize('isOwner', habit)

    const data = await request.validate(HabitSequenceStoreValidator)

    const sequence = await habit.related('sequences').create(data)

    return sequence
  }

  public async update({ request, params, bouncer }: HttpContextContract) {
    const habit = await Habit.findOrFail(params.habit_id)

    await bouncer.with('HabitPolicy').authorize('isOwner', habit)

    const data = await request.validate(HabitSequenceUpdateValidator)

    const sequence = await habit.related('sequences').query().where('id', params.id).firstOrFail()

    sequence.merge(data)

    await sequence.save()

    return {
      message: 'Sequence updated successfully',
    }
  }

  public async destroy({ params, bouncer }: HttpContextContract) {
    const habit = await Habit.findOrFail(params.habit_id)

    await bouncer.with('HabitPolicy').authorize('isOwner', habit)

    const sequence = await habit.related('sequences').query().where('id', params.id).firstOrFail()

    await sequence.delete()

    return {
      message: 'Sequence deleted successfully',
    }
  }
}
