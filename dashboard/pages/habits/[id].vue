<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { Habit, useHabitStore } from '@/stores/habits'
import { isDayChecked, toggleDay, isUpdating } from '@/composable/habits'
import { useConfirmDialog } from '@/composable/confirm-dialog'

const router = useRouter()

const habitsStore = useHabitStore()
const tm = useI18n()
const confirmDialog = useConfirmDialog()

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
})

const habit = ref<Habit>({
  id: 0,
  name: '',
  description: '',
  sequences_needed: 0,
  sequences: [],
})

const sequenceDialog = ref(false)

async function setHabit() {
  const data = await habitsStore.findHabitById(Number(props.id))

  if (!data) {
    await router.push('/404')
    return
  }

  habit.value = data

  habit.value.sequences.sort((a, b) => {
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1
    return 0
  })
}

setHabit()

function getSequencesLabel() {
  const sequences = habit.value.sequences.filter((s) => s.done)

  return `${tm.t('sequences')}: ${sequences.length} / ${habit.value.sequences_needed}`
}

async function updateSequences(date: string) {
  await toggleDay(habit.value, date)

  await setHabit()
}

async function deleteHabit() {
  confirmDialog.show().onOk(async () => {
    await habitsStore.deleteHabit(habit.value.id)
    await router.push('/habits')
  })
}

async function deleteSequence(id: number) {
  confirmDialog.show().onOk(async () => {
    await habitsStore.deleteSequence(habit.value.id, id)
    await setHabit()
  })
}
</script>
<template>
  <h-add-sequence-dialog :habit="habit" v-model="sequenceDialog" @submit="setHabit" />

  <div class="w-full h-full flex">
    <div class="w-4/12 px-5">
      <w-card class="flex flex-wrap py-10 px-8 border border-slate-100 drop-shadow-sm">
        <div class="w-full text-center mb-5">
          <fa-icon icon="yin-yang" class="text-8xl"></fa-icon>
        </div>
        <h1 class="text-3xl mb-2 font-bold text-center w-full">
          {{ habit?.name }}
        </h1>
        <h2 class="text-sm text-center w-full mb-2">
          {{ habit?.description }}
        </h2>
        <h3 class="text-lg text-center w-full mb-8">
          {{ getSequencesLabel() }}
        </h3>

        <div class="w-full flex">
          <w-btn color="primary" class="mr-4" @click="deleteHabit">
            {{ $t('delete') }}
          </w-btn>
          <w-btn color="primary">
            {{ $t('edit') }}
          </w-btn>
        </div>
      </w-card>
    </div>
    <div class="w-8/12 px-5">
      <w-card class="flex flex-wrap py-10 px-8 border border-slate-100 drop-shadow-sm">
        <div class="w-full flex items-center justify-between mb-10">
          <h2 class="text-xl font-bold">
            {{ $t('sequencesList') }}
          </h2>

          <w-btn color="primary" class="max-w-[150px]" @click="sequenceDialog = true">{{
            $t('addSequence')
          }}</w-btn>
        </div>

        <div class="w-full">
          <table>
            <thead>
              <tr>
                <th>{{ $t('done') }}</th>
                <th>{{ $t('date') }}</th>
                <th>{{ $t('options') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!habit.sequences.length">
                <td colspan="3" class="text-center">
                  {{ $t('noSequences') }}
                </td>
              </tr>
              <tr v-for="sequence in habit.sequences">
                <td>
                  <div class="flex justify-center">
                    <h-checkbox
                      :model-value="isDayChecked(habit, sequence.date)"
                      :loading="isUpdating(habit, sequence.date)"
                      size="5"
                      spin-size="3"
                      @update:model-value="updateSequences(sequence.date)"
                    />
                  </div>
                </td>

                <td>{{ sequence.date }}</td>

                <td>
                  <fa-icon
                    class="cursor-pointer"
                    icon="trash"
                    @click="deleteSequence(sequence.id)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </w-card>
    </div>
  </div>
</template>
