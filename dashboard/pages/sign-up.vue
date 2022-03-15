<script lang="ts">
export default {
  layout: 'empty',
}
</script>

<script setup lang="ts">
import { useApi } from '@/composable/axios'
import { useRules } from '@/composable/use-rules'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const tm = useI18n()

const rules = useRules()
const api = useApi()

const loading = ref(false)
const error = ref('')
const user = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

async function submit() {
  loading.value = true

  await api
    .post('/auth/register', user.value)
    .then(() => router.push('/login'))
    .catch(() => (error.value = tm.t('somethingWentWrong')))
    .finally(() => setTimeout(() => (loading.value = false), 800))
}
</script>
<template>
  <div class="flex h-full bg-gray-200 w-full items-center justify-center">
    <w-card max-width="[500px]" min-height="[400px]" class="p-12 border">
      <w-form @submit="submit">
        <div class="w-full text-center mb-9">
          <h1 class="text-4xl font-bold text-gray-500">Habit Tracker</h1>
        </div>

        <div class="w-full mb-7">
          <w-input
            v-model="user.name"
            :rules="[rules.required]"
            :label="$t('name')"
            :placeholder="$t('typeYour', ['name'])"
            id="name"
          />
        </div>

        <div class="w-full mb-7">
          <w-input
            v-model="user.email"
            :rules="[rules.required]"
            :label="$t('email')"
            :placeholder="$t('typeYour', ['email'])"
            type="email"
            id="e-mail"
          />
        </div>

        <div class="w-full mb-7">
          <w-input
            v-model="user.password"
            :rules="[rules.required]"
            :label="$t('password')"
            :placeholder="$t('typeYour', ['password'])"
            id="password"
            type="password"
          />
        </div>

        <div class="w-full mb-9">
          <w-input
            v-model="user.password_confirmation"
            :rules="[rules.required]"
            :label="$t('passwordConfirmation')"
            :placeholder="$t('typeYour', ['password'])"
            type="password"
            id="password-confirmation"
          />
        </div>

        <div class="w-full mb-9">
          <w-btn
            name="submit"
            width="full"
            color="yellow-400"
            text-size="xl"
            class="uppercase"
            type="submit"
            :disabled="loading"
          >
            {{ loading ? $t('loading') : $t('submit') }}
          </w-btn>

          <small class="block text-red-500 my-4 text-center" v-if="error">{{ error }}</small>
        </div>

        <div class="w-full text-center text-xs text-gray-500">
          {{ $t('alreadyHaveAccount') }}
          <router-link to="/login" class="text-yellow-400 font-bold">{{ $t('login') }}</router-link>
        </div>
      </w-form>
    </w-card>
  </div>
</template>
