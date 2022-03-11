<script setup lang="ts">
import { useStore } from '@/stores'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

async function logOut() {
  await store.logout().finally(() => {
    router.push('/login')
  })
}
</script>
<template>
  <!-- <w-layout>
    <w-toolbar layout color="white"> Habit tracker </w-toolbar>

    <w-drawer layout class="bg-red-500">
      <div>Drawer</div>
    </w-drawer>

    <w-content layout class="bg-green-500"> Content </w-content>
  </w-layout> -->

  <div class="flex h-screen w-screen items-center justify-center bg-gray-200">
    <w-card max-width="md" class="text-center p-5 border">
      <h1 class="text-4xl font-bold text-gray-500 mb-4">Habit Tracker</h1>
      <h2 class="mb-4 text-gray-500">In development</h2>

      <w-btn block @click="logOut">{{ $t('logout') }}</w-btn>
    </w-card>
  </div>
</template>
