<script lang="ts">
export default {
  layout: 'empty',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const tm = useI18n()

const user = ref({
  email: '',
  password: '',
})

const rules = {
  required: (value: string) => (value.length > 0 ? true : tm.t('fieldRequired')),
}
</script>

<template>
  <div class="flex h-full bg-gray-200 w-full items-center justify-center">
    <w-card max-width="md" min-height="[400px]" class="px-10 py-10">
      <w-form class="items-center flex flex-wrap">
        <div class="w-full text-center mb-10">
          <h1 class="text-4xl font-bold text-gray-500">Habit Tracker</h1>
        </div>

        <div class="w-full mb-10">
          <w-input
            v-model="user.email"
            :rules="[rules.required]"
            :label="$t('email')"
            type="e-mail"
            placeholder="jonathan@jojo.com"
          />
        </div>

        <div class="w-full mb-10">
          <w-input
            v-model="user.password"
            :rules="[rules.required]"
            :label="$t('password')"
            :placeholder="$t('typePassword')"
            type="password"
          />
        </div>

        <div class="w-full mb-10">
          <w-btn type="submit" width="full" color="yellow-400" text-size="xl" class="uppercase">
            Submit
          </w-btn>
        </div>

        <div class="w-full text-center text-xs text-gray-500">
          {{ $t('notHaveAccount') }}
          <strong class="text-yellow-400 font-bold">{{ $t('signUp') }}</strong>
        </div>
      </w-form>
    </w-card>
  </div>
</template>
