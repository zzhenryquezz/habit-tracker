import { vi } from 'vitest'

export function useMockRouter() {
  const router = {
    push: vi.fn().mockResolvedValue(true),
  }

  return router
}
