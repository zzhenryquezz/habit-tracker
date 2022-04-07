<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { provideConfirmDialog } from './composable/confirm-dialog'
const components = import.meta.glob('./layouts/*.vue')

const layouts: any = Object.entries(components)
  .map(([filename, component]) => {
    const name = filename
      .replace(/^\.\//, '')
      .replace(/\.vue$/, '')
      .replace('layouts/', '')

    return {
      name,
      component,
    }
  })
  .reduce(
    (result, { name, component }) => ({
      [name]: defineAsyncComponent(component),
      ...result,
    }),
    {}
  )

function getLayout(component: any) {
  return layouts[component.type.layout] || layouts.default
}

const confirmDialog = provideConfirmDialog()
</script>

<template>
  <w-dialog v-model="confirmDialog.model">
    <w-card width="screen" max-width="md" class="p-4 rounded flex flex-wrap">
      <h4 v-if="confirmDialog.title" class="w-full text-2xl text-center font-bold mb-4">
        {{ confirmDialog.title }}
      </h4>

      <h5 v-if="confirmDialog.message" class="w-full text-sm text-center mb-4">
        {{ confirmDialog.message }}
      </h5>

      <div class="w-full inline-flex">
        <w-btn class="mr-4" color="gray-500" @click="confirmDialog.model = false">
          {{ $t('no') }}
        </w-btn>
        <w-btn color="primary" @click="confirmDialog.confirm">{{ $t('yes') }}</w-btn>
      </div>
    </w-card>
  </w-dialog>

  <router-view v-slot="{ Component, route }">
    <component :is="getLayout(Component)" v-if="Component">
      <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
    </component>
  </router-view>
</template>
