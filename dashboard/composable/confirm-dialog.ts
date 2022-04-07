import { provide, ref, InjectionKey } from 'vue'

const state = ref({
  model: false,
  title: 'Are you sure?',
  message: undefined as string | undefined,
  confirm: () => {},
})

type State = typeof state

const key: InjectionKey<State> = Symbol('confirm-dialog')

export function provideConfirmDialog() {
  provide(key, state)

  return state
}

export function useConfirmDialog() {
  function onOk(callback: State['value']['confirm']) {
    state.value.confirm = () => {
      state.value.model = false
      callback()
    }
  }

  function show() {
    state.value.model = true
    return {
      onOk,
    }
  }

  return {
    show,
  }
}
