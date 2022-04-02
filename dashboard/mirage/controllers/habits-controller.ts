import { Request, Response } from 'miragejs'
import { Schema } from '../types'

class HabitsController {
  public index(schema: Schema) {
    const habits = schema.all('habit').models

    return habits.map((habit) => ({
      id: habit.id,
      name: habit.name,
      sequences: habit.sequences.models,
    }))
  }

  public updateSequences(schema: Schema, request: Request) {
    const data = JSON.parse(request.requestBody)
    const habit = schema.find('habit', request.params.habit_id)

    if (!habit) {
      return new Response(404, {}, {})
    }

    let sequence = schema.findBy('habitSequence', { date: data.date })

    if (sequence) {
      sequence.update(data)
      return new Response(200, {}, { message: 'Sequence updated successfully' })
    }

    sequence = schema.create('habitSequence', data)

    habit.sequences.add(sequence)

    habit.save()

    return new Response(200, {}, { message: 'Sequence created successfully' })
  }
}

export default new HabitsController()
