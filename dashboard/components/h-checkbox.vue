<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>
<template>
  <input v-model="model" type="checkbox" class="hidden" />

  <w-card
    :color="model ? 'primary' : 'teal-100'"
    width="6"
    height="6"
    class="cursor-pointer border"
    @click="model = !model"
  />
</template>
