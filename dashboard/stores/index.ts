import { defineStore } from 'pinia'
import { useApi } from '../composable/axios'

const api = useApi()

interface User {
  id: number
  name: string
  email: string
}

export const useStore = defineStore('main', {
  state: () => ({
    user: null as null | User,
    drawer: true,
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

      localStorage.removeItem('auth:token')
      api.defaults.headers.common = {}

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
    async isAuthenticated() {
      if (this.user === null) {
        await this.check()
      }
      return this.user !== null
    },

    async logout() {
      this.user = null

      await api.post('/auth/logout')

      localStorage.removeItem('auth:token')
      api.defaults.headers.common = {}
    },
  },
})
