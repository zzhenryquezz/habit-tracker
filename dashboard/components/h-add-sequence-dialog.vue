<script setup lang="ts">
import { useRules } from '@/composable/use-rules'
import { toggleDay } from '@/composable/habits'
import { Habit } from '@/stores/habits'
import { computed, PropType, ref } from 'vue'

const props = defineProps({
  modelValue: {
    default: false,
    type: Boolean,
  },
  habit: {
    type: Object as PropType<Habit>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const sequence = ref({
  date: '',
  done: false,
})

const loading = ref(false)

const rules = useRules()

async function submit() {
  loading.value = true

  await toggleDay(props.habit, sequence.value.date).finally(() =>
    setTimeout(() => {
      loading.value = false
      model.value = false
      emit('submit')
    }, 800)
  )
}
</script>
<template>
  <w-dialog v-model="model">
    <w-card width="screen" max-width="md" class="p-4 rounded">
      <h2 class="text-2xl font-bold mb-4">{{ $t('add', ['sequence']) }}</h2>
      <w-form @submit="submit">
        <div class="mb-4">
          <w-input
            placeholder="YYYY-MM-DD"
            v-model="sequence.date"
            :label="$t('date')"
            :rules="[rules.required, rules.date]"
          />
        </div>
        <div class="mb-4 flex">
          <h-checkbox v-model="sequence.done" />
          <label class="font-bold ml-4">{{ $t('done') }}</label>
        </div>
        <w-btn color="primary" :disabled="loading" type="submit">
          {{ loading ? $t('loading') : $t('submit') }}
        </w-btn>
      </w-form>
    </w-card>
  </w-dialog>
</template>
