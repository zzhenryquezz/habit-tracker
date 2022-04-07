<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: '6',
  },
  spinSize: {
    type: String,
    default: '4',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const color = computed(() => {
  if (model.value) {
    return 'primary'
  }

  if (props.disabled) {
    return 'white'
  }

  return 'teal-100'
})

function onClick() {
  if (props.disabled) {
    return
  }

  model.value = !model.value
}
</script>
<template>
  <input v-model="model" type="checkbox" class="hidden" />
  <a @click="onClick" :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'">
    <w-card
      :color="color"
      :class="model ? 'border-primary' : 'border-slate-200'"
      :width="props.size"
      :height="props.size"
      class="border flex items-center justify-center transition-colors"
    >
      <h-spin v-if="loading" :color="model ? 'white' : 'primary'" :size="spinSize" />
    </w-card>
  </a>
</template>
