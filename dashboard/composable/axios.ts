import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export function useApi() {
  return api
}
