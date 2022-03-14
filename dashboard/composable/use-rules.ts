import { i18n } from '@/plugins/i18n'
export function useRules() {
  return {
    required: (value: unknown) => !!value || i18n.global.t('fieldRequired'),
  }
}
