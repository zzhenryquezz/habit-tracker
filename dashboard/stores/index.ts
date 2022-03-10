import { defineStore } from 'pinia'
import { useApi } from '../composable/axios'

const api = useApi()

export const useStore = defineStore('main', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email: string, password: string) {
      return api
        .post('/auth/login', {
          email,
          password,
        })
        .then(({ data }) => this.check(data.token))
    },
    async check(token = localStorage.getItem('auth:token')) {
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      return api
        .get('/auth/who-i-am', { headers })
        .then(({ data }) => {
          this.user = data
          api.defaults.headers.common = headers
          localStorage.setItem('auth:token', token as string)
          return true
        })
        .catch(() => (this.user = null))
    },
  },
})
