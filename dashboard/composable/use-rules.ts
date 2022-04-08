import { i18n } from '@/plugins/i18n'
import { useMoment } from './moment'

const moment = useMoment()

export function useRules() {
  return {
    required: (value: unknown) => !!value || i18n.global.t('fieldRequired'),
    date: (value: string) =>
      moment(value, 'YYYY-MM-DD', true).isValid() || i18n.global.t('invalidDate'),
  }
}
