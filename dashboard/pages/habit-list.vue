<script setup lang="ts">
import { computed, ref } from 'vue'

import { useMoment } from '@/composable/moment'
import { useApi } from '@/composable/axios'

interface HabitSequence {
  date: string
  done: boolean
}

interface Habit {
  id: number
  name: string
  description: string
  sequences: HabitSequence[]
}

const moment = useMoment()
const api = useApi()

const selectedDate = ref(new Date())
const habits = ref<Habit[]>([])
const loading = ref(false)

const displayDate = computed(() => {
  const start = moment(selectedDate.value).startOf('week').format('D MMM')
  const end = moment(selectedDate.value).endOf('week').format('D MMM')
  return `${start} - ${end}`
})

const weekdays = computed(() =>
  moment.weekdays().map((weekday, index) => ({
    label: weekday,
    date: moment(selectedDate.value).weekday(index).format('YYYY-MM-DD'),
  }))
)

async function setHabits() {
  loading.value = true

  await api
    .get('/habits')
    .then((res) => {
      habits.value = res.data
    })
    .finally(() => setTimeout(() => (loading.value = false), 1000))
}
setHabits()

function isChecked(habit: Habit, day: string) {
  if (!habit.sequences) return false

  return habit.sequences
    .filter((sequence) => sequence.done)
    .some((sequence) => moment(sequence.date).isSame(day, 'day'))
}

async function updateSequence(habit: Habit, day: string) {
  await api
    .patch(`/habits/${habit.id}/sequences`, {
      date: day,
      done: !isChecked(habit, day),
    })
    .then(() => {
      const sequence = habit.sequences.find((sequence) => sequence.date === day)

      if (sequence) {
        sequence.done = !sequence.done
        return
      }

      habit.sequences.push({
        date: day,
        done: true,
      })

      // habits.value = habits.value.slice()
    })
}
</script>

<template>
  <div class="flex flex-wrap h-full w-full">
    <div class="w-full text-gray-500">
      <div class="w-full h-16">
        <h2 class="text-2xl font-bold">{{ displayDate }}</h2>
      </div>

      <w-card class="border rounded drop-shadow flex flex-wrap relative min-h-[500px]">
        <div
          v-if="loading"
          class="bg-white flex items-center justify-center animate-pulse absolute w-full h-full"
        >
          {{ $t('loading') }}
        </div>

        <div class="w-4/12"></div>

        <div
          class="w-1/12 text-center py-10 text-lg font-bold"
          v-for="day in weekdays"
          :key="day.date"
        >
          {{ day.label }}
        </div>

        <div class="flex w-full border-t" v-for="habit in habits" :key="habit.id">
          <div class="w-4/12 items-center flex pl-10 font-bold text-lg">{{ habit.name }}</div>
          <div
            class="w-1/12 text-center h-16 items-center flex justify-center"
            v-for="day in weekdays"
            :key="day.date"
          >
            <h-checkbox
              :model-value="isChecked(habit, day.date)"
              @update:model-value="updateSequence(habit, day.date)"
            />
          </div>
        </div>
      </w-card>
    </div>
  </div>
</template>
