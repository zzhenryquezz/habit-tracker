<script setup lang="ts">
import { useRules } from '@/composable/use-rules'
import { useHabitStore, Habit } from '@/stores/habits'
import { computed, ref, PropType, watch } from 'vue'

const props = defineProps({
  modelValue: {
    default: false,
    type: Boolean,
  },
  habit: {
    type: Object as PropType<Habit>,
    required: false,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])
const habitStore = useHabitStore()

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const habit = ref({
  name: '',
  description: '',
  start_date: '',
})

const loading = ref(false)

const rules = useRules()

watch(
  () => props.habit,
  (value) => {
    if (!value) {
      habit.value.name = ''
      habit.value.description = ''
      habit.value.start_date = ''
      return
    }

    habit.value.name = value.name
    habit.value.description = value.description
    habit.value.start_date = value.start_date
  }
)

async function create() {
  return habitStore.addHabit(habit.value)
}

async function update() {
  return habitStore.updateHabit(props.habit.id, habit.value)
}

async function submit() {
  loading.value = true

  const promise = props.habit ? update : create

  await promise().finally(() =>
    setTimeout(() => {
      emit('submit')
      loading.value = false
      model.value = false
    }, 800)
  )
}
</script>
<template>
  <w-dialog v-model="model">
    <w-card width="screen" max-width="md" class="p-4 rounded">
      <h2 class="text-2xl font-bold mb-4">{{ $t('add', ['habit']) }}</h2>
      <w-form @submit="submit" v-if="model">
        <div class="mb-4">
          <w-input
            v-model="habit.name"
            :label="$t('name')"
            :rules="[rules.required]"
            placeholder="Ex. Meditation, Yoga, etc."
          />
        </div>
        <div class="mb-4">
          <w-input
            v-model="habit.start_date"
            :label="$t('startDate')"
            placeholder="YYYY-MM-DD"
            :rules="[rules.date]"
          />
        </div>
        <div class="mb-4">
          <w-input
            v-model="habit.description"
            :label="$t('description')"
            placeholder="My awesome habit..."
          />
        </div>
        <w-btn color="primary" :disabled="loading" type="submit">
          {{ loading ? $t('loading') : $t('submit') }}
        </w-btn>
      </w-form>
    </w-card>
  </w-dialog>
</template>
