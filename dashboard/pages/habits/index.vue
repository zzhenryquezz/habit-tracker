<script setup lang="ts">
import { computed, ref } from 'vue'

import { useMoment } from '@/composable/moment'
import { isDayChecked, toggleDay, isUpdating } from '@/composable/habits'
import { useHabitStore } from '@/stores/habits'

const moment = useMoment()
const habitStore = useHabitStore()

const selectedDate = ref(new Date())
const loading = ref(false)
const dialog = ref(false)
const habits = computed(() => habitStore.habits)

const displayDate = computed(() => {
  const start = moment(selectedDate.value).startOf('week').format('D MMM')
  const end = moment(selectedDate.value).endOf('week').format('D MMM')
  return `${start} - ${end}`
})

const isToday = computed(() => {
  return moment(selectedDate.value).isSame(moment(), 'day')
})

const weekdays = computed(() =>
  moment.weekdays().map((weekday, index) => ({
    label: weekday,
    date: moment(selectedDate.value).weekday(index).format('YYYY-MM-DD'),
  }))
)

async function setHabits() {
  loading.value = true

  await habitStore.setHabits().finally(() => setTimeout(() => (loading.value = false), 1000))
}

setHabits()

function updateDate(value = 0) {
  selectedDate.value = moment(selectedDate.value).add(value, 'days').toDate()
}
</script>

<template>
  <h-add-habit-dialog v-model="dialog" @submit="setHabits" />

  <div class="flex flex-wrap h-full w-full">
    <div class="w-full text-gray-500">
      <div class="w-full h-16 flex text-2xl font-bold items-center">
        <h2 class="mr-4 min-w-[200px]">{{ displayDate }}</h2>
        <button class="mr-2 hover:bg-gray-50 p-2" @click="updateDate(-7)">
          <fa-icon icon="chevron-left"></fa-icon>
        </button>
        <button
          :disabled="isToday"
          :class="isToday ? 'opacity-25' : ''"
          class="mr-2 hover:bg-gray-50 p-2"
          @click="updateDate(7)"
        >
          <fa-icon icon="chevron-right"></fa-icon>
        </button>
        <div class="flex-1"></div>
        <div>
          <w-btn color="primary" @click="dialog = true">
            {{ $t('add', ['habit']) }}
            <fa-icon icon="plus" class="ml-2"></fa-icon>
          </w-btn>
        </div>
      </div>

      <w-card class="border rounded drop-shadow flex flex-wrap relative">
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
          <div class="hidden xl:block">
            {{ day.label }}
          </div>

          <div class="xl:hidden">
            {{ day.label.charAt(0) }}
          </div>
        </div>

        <div
          v-if="!habits.length && !loading"
          class="flex my-20 items-center justify-center w-full"
        >
          <div class="text-center">
            <h2 class="mb-4">{{ $t('noHabits') }}</h2>
            <w-btn color="primary" @click="dialog = true">
              {{ $t('add', ['habit']) }}
            </w-btn>
          </div>
        </div>

        <div class="overflow-y-auto w-full max-h-[600px]">
          <div class="flex w-full border-t" v-for="habit in habits" :key="habit.id">
            <router-link
              :to="`/habits/${habit.id}`"
              class="w-4/12 items-center flex pl-10 font-bold text-lg hover:bg-teal-500/20 transition-all"
            >
              <fa-icon icon="yin-yang" class="mr-5 text-2xl"></fa-icon>
              {{ habit.name }}
            </router-link>
            <div
              class="w-1/12 text-center h-16 items-center flex justify-center"
              v-for="day in weekdays"
              :key="day.date"
            >
              <h-checkbox
                :model-value="isDayChecked(habit, day.date)"
                @update:model-value="toggleDay(habit, day.date)"
                :loading="isUpdating(habit, day.date)"
                :disabled="moment(day.date).isAfter(moment())"
              />
            </div>
          </div>
        </div>
      </w-card>
    </div>
  </div>
</template>