import { useApi } from '@/composable/axios'
import { defineStore } from 'pinia'
import { useStore } from '@/stores'

export interface HabitSequence {
  id: number
  habit_id: number
  date: string
  done: boolean
}

export interface Habit {
  id: number
  name: string
  description: string
  start_date: string
  sequences: HabitSequence[]
  sequences_needed: number
}

const api = useApi()
const mainStore = useStore()

export const useHabitStore = defineStore('habits', {
  state: () => ({
    habits: [] as Habit[],
    updatingDays: [] as string[],
  }),
  actions: {
    async setHabits() {
      await api.get(`/users/${mainStore.user?.id}/habits`).then(({ data }) => {
        this.habits = data
      })
    },
    async findHabitById(id: number) {
      if (!this.habits.length) {
        await this.setHabits()
      }

      return this.habits.find((habit) => habit.id === id)
    },
    async addHabit(data: Partial<Habit>) {
      await api.post(`/users/${mainStore.user?.id}/habits`, data)

      await this.setHabits()
    },
    async updateHabit(id: number, data: Partial<Habit>) {
      await api.patch(`/users/${mainStore.user?.id}/habits/${id}`, data)

      await this.setHabits()
    },
    async deleteHabit(id: Habit['id']) {
      await api.delete(`/users/${mainStore.user?.id}/habits/${id}`)
    },
    async updateSequence(sequence: HabitSequence, done: boolean) {
      await api.patch(`/habits/${sequence.habit_id}/sequences/${sequence.id}`, {
        done,
      })
    },
    async addSequence(habit: Habit, sequence: Partial<HabitSequence>) {
      await api.post(`/habits/${habit.id}/sequences`, sequence)
    },
    async deleteSequence(habitId: Habit['id'], sequenceId: HabitSequence['id']) {
      await api.delete(`/habits/${habitId}/sequences/${sequenceId}`)
      await this.setHabits()
    },
  },
})
