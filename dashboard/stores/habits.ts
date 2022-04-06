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
  sequences: HabitSequence[]
}

const api = useApi()
const mainStore = useStore()

export const useHabitStore = defineStore('habits', {
  state: () => ({
    habits: [] as Habit[],
  }),
  actions: {
    async setHabits() {
      await api.get(`/users/${mainStore.user?.id}/habits`).then(({ data }) => {
        this.habits = data.data
      })
    },
    async addHabit(name: string, description: string) {
      await api.post(`/users/${mainStore.user?.id}/habits`, {
        name,
        description,
      })

      await this.setHabits()
    },
    async updateSequence(sequence: HabitSequence, done: boolean) {
      await api.patch(`/habits/${sequence.habit_id}/sequences/${sequence.id}`, {
        done,
      })
    },
    async addSequence(habit: Habit, sequence: Partial<HabitSequence>) {
      await api.post(`/habits/${habit.id}/sequences`, sequence)
    },
  },
})
