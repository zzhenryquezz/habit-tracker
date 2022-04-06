import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import HabitStoreValidator from 'App/Validators/HabitStoreValidator'

export default class HabitsController {
  public async index({ params, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.user_id)

    await bouncer.with('HabitPolicy').authorize('view', user)

    const data = await user
      .related('habits')
      .query()
      .preload('sequences')
      .withCount('sequences', (q) => q.where('done', true))

    const habits = data.map((habit) => {
      return {
        ...habit.toJSON(),
        done: habit.$extras.sequences_count,
      }
    })

    return habits
  }

  public async show({ params, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.user_id)

    await bouncer.with('HabitPolicy').authorize('view', user)

    return await user.related('habits').query().where('id', params.id).firstOrFail()
  }

  public async store({ params, bouncer, request }) {
    const user = await User.findOrFail(params.user_id)

    await bouncer.with('HabitPolicy').authorize('view', user)

    const data = await request.validate(HabitStoreValidator)

    const habit = await user.related('habits').create(data)

    return habit
  }

  public async update({ params, bouncer, request }) {
    const user = await User.findOrFail(params.user_id)

    await bouncer.with('HabitPolicy').authorize('view', user)

    const data = await request.validate(HabitStoreValidator)

    const habit = await user.related('habits').query().where('id', params.id).firstOrFail()

    habit.merge(data)

    await habit.save()

    return {
      message: 'Habit updated successfully',
    }
  }

  public async destroy({ params, bouncer }) {
    const user = await User.findOrFail(params.user_id)

    await bouncer.with('HabitPolicy').authorize('view', user)

    const habit = await user.related('habits').query().where('id', params.id).firstOrFail()

    await habit.delete()

    return {
      message: 'Habit deleted successfully',
    }
  }
}
