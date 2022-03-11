import { useStore } from '@/stores'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

interface Middleware {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
  store: ReturnType<typeof useStore>
}

export default async function middleware({ to, next, store }: Middleware) {
  const isAuthenticated = await store.isAuthenticated()

  if (isAuthenticated && to.path === '/login') {
    return next('/')
  }

  if (!isAuthenticated && to.path !== '/login') {
    return next('/login')
  }

  return next()
}
