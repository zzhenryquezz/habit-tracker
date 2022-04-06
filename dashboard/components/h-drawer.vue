<script setup lang="ts">
import { useMoment } from '@/composable/moment'
import { isDayChecked, toggleDay, isUpdating } from '@/composable/habits'
import { useStore } from '@/stores'
import { Habit, useHabitStore } from '@/stores/habits'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const store = useStore()
const habitStore = useHabitStore()
const router = useRouter()
const tm = useI18n()
const moment = useMoment()

const user = computed(() => store.user)

const today = computed(() => moment().format('YYYY-MM-DD'))

const habits = computed(() => habitStore.habits)

const todayDoneHabits = computed(() =>
  habitStore.habits.filter((habit) =>
    habit.sequences.filter((s) => s.done).some((sequence) => sequence.date === today.value)
  )
)

const todayLabel = computed(() => {
  return `${tm.t('today')} (${todayDoneHabits.value.length}/${habits.value.length})`
})

function toHabitList() {
  router.push('/habit-list')
}

function getSequencesLabel(habit: Habit) {
  const sequences = habit.sequences.filter((s) => s.done)

  return `${habit.name} - (${sequences.length} / ${habit.sequences_needed})`
}
</script>
<template>
  <w-drawer layout width="[300px]" class="bg-white py-10 px-8">
    <div
      class="w-32 h-32 mb-5 mx-auto rounded-full bg-gray-200 drop-shadow flex justify-center items-center"
    >
      <fa-icon icon="user" class="text-4xl" />
    </div>

    <div class="w-full text-center mb-10">
      <h1 class="text-3xl font-bold mb-2">{{ user?.name }}</h1>
      <h2 class="text-sm mb-4">{{ $t('sidebarQuote') }}</h2>
      <w-btn @click="toHabitList" color="primary" class="max-w-[130px]">
        {{ $t('habitList') }}
      </w-btn>
    </div>

    <div class="w-full mb-10">
      <h3 class="text-lg font-bold mb-5">
        {{ todayLabel }}
      </h3>
      <div class="w-full flex items-center mb-5" v-for="habit in habits" :key="habit.id">
        <h-checkbox
          :model-value="isDayChecked(habit, today)"
          @update:model-value="toggleDay(habit, today)"
          size="5"
          spin-size="3"
          :loading="isUpdating(habit, today)"
        />
        <h4 class="ml-5">{{ habit.name }}</h4>
      </div>
    </div>

    <div class="w-full flex flex-wrap">
      <h3 class="text-lg font-bold mb-5 w-full">{{ $tc('habitSequence', 2) }}</h3>

      <div class="w-full mb-5 flex items-center" v-for="habit in habits" :key="habit.id">
        <div class="h-2 w-2 rounded-full bg-primary"></div>
        <h4 class="ml-5">
          {{ getSequencesLabel(habit) }}
        </h4>
      </div>
    </div>
  </w-drawer>
</template>
