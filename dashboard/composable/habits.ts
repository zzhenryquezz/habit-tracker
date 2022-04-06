import { Habit, useHabitStore } from '@/stores/habits'

const habitStore = useHabitStore()

export function isDayChecked(habit: Habit, day: string) {
  if (!habit.sequences) return false

  return habit.sequences
    .filter((sequence) => sequence.done)
    .some((sequence) => sequence.date === day)
}

export async function toggleDay(habit: Habit, date: string) {
  habitStore.updatingDays.push(`${habit.id}-${date}`)

  const sequence = habit.sequences.find((sequence) => sequence.date === date)

  if (sequence) {
    await habitStore.updateSequence(sequence, !sequence.done)
  }

  if (!sequence) {
    await habitStore.addSequence(habit, { date, done: true })
  }

  setTimeout(() => {
    habitStore.updatingDays.splice(habitStore.updatingDays.indexOf(`${habit.id}-${date}`), 1)
  }, 800)

  await habitStore.setHabits()
}

export function isUpdating(habit: Habit, date: string) {
  return habitStore.updatingDays.includes(`${habit.id}-${date}`)
}
