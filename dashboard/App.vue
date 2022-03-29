<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
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
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <component :is="getLayout(Component)" v-if="Component">
      <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
    </component>
  </router-view>
</template>
