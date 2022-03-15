<script lang="ts">
export default {
  layout: 'empty',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useStore } from '../stores'
import { useRules } from '../composable/use-rules'

const tm = useI18n()

const store = useStore()
const router = useRouter()
const rules = useRules()

const user = ref({
  email: '',
  password: '',
})

const error = ref('')
const loading = ref(false)

async function login() {
  const { email, password } = user.value

  loading.value = true

  await store
    .login(email, password)
    .then(() => router.push('/'))
    .catch(() => (error.value = tm.t('loginError')))
    .finally(() => setTimeout(() => (loading.value = false), 800))
}
</script>

<template>
  <div class="flex h-full bg-gray-200 w-full items-center justify-center">
    <w-card max-width="[500px]" min-height="[400px]" class="p-12 border">
      <w-form class="items-center flex flex-wrap" @submit="login">
        <div class="w-full text-center mb-9">
          <h1 class="text-4xl font-bold text-gray-500">Habit Tracker</h1>
        </div>

        <div class="w-full mb-7">
          <w-input
            v-model="user.email"
            :rules="[rules.required]"
            :label="$t('email')"
            id="e-mail"
            type="e-mail"
            placeholder="jonathan@jojo.com"
          />
        </div>

        <div class="w-full mb-7">
          <w-input
            v-model="user.password"
            :rules="[rules.required]"
            :label="$t('password')"
            :placeholder="$t('typePassword')"
            id="password"
            type="password"
          />
        </div>

        <div class="w-full mb-9">
          <w-btn
            name="submit"
            width="full"
            color="yellow-400"
            text-size="xl"
            class="uppercase"
            :disabled="loading"
          >
            {{ loading ? $t('loading') : $t('submit') }}
          </w-btn>

          <small class="block text-red-500 my-4 text-center" v-if="error">{{ error }}</small>
        </div>

        <div class="w-full text-center text-xs text-gray-500">
          {{ $t('notHaveAccount') }}
          <router-link to="/sign-up" class="text-yellow-400 font-bold">
            {{ $t('signUp') }}
          </router-link>
        </div>
      </w-form>
    </w-card>
  </div>
</template>
