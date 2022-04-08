<script setup lang="ts">
import { useStore } from '@/stores'

const store = useStore()
</script>
<template>
  <w-layout>
    <h-drawer :class="!store.drawer ? 'hidden' : ''" class="overflow-hidden" />

    <w-content layout class="bg-slate-200 relative">
      <div
        v-if="store.drawer"
        class="fixed top-0 left-0 ml-4 mt-2 z-10 cursor-pointer text-lg lg:hidden"
        @click="store.drawer = false"
      >
        <fa-icon icon="times" />
      </div>

      <div
        class="absolute top-0 left-0 ml-4 mt-2 z-10 cursor-pointer text-lg"
        @click="store.drawer = !store.drawer"
      >
        <fa-icon icon="bars" />
      </div>
      <slot />
    </w-content>
  </w-layout>
</template>
