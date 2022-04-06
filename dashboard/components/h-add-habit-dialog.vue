<script setup lang="ts">
import { useRules } from '@/composable/use-rules'
import { useHabitStore } from '@/stores/habits'
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    default: false,
    type: Boolean,
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
})

const loading = ref(false)

const rules = useRules()

async function submit() {
  loading.value = true

  await habitStore.addHabit(habit.value.name, habit.value.description).finally(() =>
    setTimeout(() => {
      emit('submit')
      loading.value = false
      habit.value.name = ''
      habit.value.description = ''
      model.value = false
    }, 800)
  )
}
</script>
<template>
  <w-dialog v-model="model">
    <w-card width="screen" max-width="md" class="p-4 rounded">
      <h2 class="text-2xl font-bold mb-4">{{ $t('add', ['habit']) }}</h2>
      <w-form @submit="submit">
        <div class="mb-4">
          <w-input v-model="habit.name" :label="$t('name')" :rules="[rules.required]" />
        </div>
        <div class="mb-4">
          <w-input v-model="habit.description" :label="$t('description')" />
        </div>
        <w-btn color="primary" :disabled="loading" type="submit">
          {{ loading ? $t('loading') : $t('submit') }}
        </w-btn>
      </w-form>
    </w-card>
  </w-dialog>
</template>
