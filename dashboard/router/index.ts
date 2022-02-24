import { createRouter as BaseCreateRouter, createWebHistory } from 'vue-router'

import routes from './routes'

export function createRouter() {
  const router = BaseCreateRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  })

  return router
}
