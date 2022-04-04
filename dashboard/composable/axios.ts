import axios from 'axios'
import lodash from 'lodash'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const whiteList = ['/auth/who-i-am']
    const path = lodash.get(error, 'response.config.url')

    if (!whiteList.includes(path)) {
      alert(lodash.get(error, 'response.data.message', 'Something went wrong'))
    }

    return Promise.reject(error)
  }
)

export function useApi() {
  return api
}
