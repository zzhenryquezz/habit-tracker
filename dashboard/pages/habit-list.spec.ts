import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, cleanup, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import HabitList from './habit-list.vue'
import { useMoment } from '@/composable/moment'
import { renderWithPlugins } from '@/tests/fixtures/render-with-plugins'
import { createServer } from '@/mirage'
import { makeHabits } from '@/tests/factories/habit'

let server: ReturnType<typeof createServer>
const date = new Date('2021-08-01 00:00:00')

const moment = useMoment()

beforeEach(() => {
  vi.setSystemTime(date)
  server = createServer({
    environment: 'test',
  })
})

afterEach(() => {
  cleanup()
  vi.clearAllTimers()
  server.shutdown()
})

async function renderComponent(habits = makeHabits(3)) {
  server.get('/habits', () => habits)

  renderWithPlugins(HabitList)

  await waitFor(async () => {
    expect(screen.queryByText(/Loading.../i)).toBeNull()
  })
}
describe('habit-list.vue', () => {
  it('should display week date start and end', async () => {
    await renderComponent()

    const start = moment().startOf('week').format('D MMM')
    const end = moment().endOf('week').format('D MMM')

    screen.getByText(`${start} - ${end}`)
  })

  it('should display a list of days of week', async () => {
    await renderComponent()

    const days = moment.weekdays()

    days.forEach((day) => screen.getByText(day))
  })

  it('should display a list habits list', async () => {
    const habits = makeHabits(5)

    await renderComponent(habits)

    await waitFor(async () => {
      expect(screen.queryByText(/Loading.../i)).toBeNull()
    })

    habits.forEach((habit) => screen.getByText(habit.name))
  })

  it('should each habit have a checkbox for the current weekdays', async () => {
    const habits = makeHabits(2)

    await renderComponent(habits)

    const boxes = screen.getAllByRole('checkbox')

    expect(boxes.length).toBe(14)
  })

  it('should checkbox be checked if the habit was done', async () => {
    const habits = makeHabits(1)

    habits[0].sequences = [{ date: new Date(), done: true }]

    await renderComponent(habits)

    const checkedBoxes = screen.getAllByRole('checkbox', { checked: true })

    expect(checkedBoxes.length).toBe(1)
  })

  it('should mark habit as done when user click in weekday checkbox', async () => {
    const [habit] = makeHabits(1)

    const sequence = { id: 7, date: new Date(), done: false }

    habit.sequences = [sequence]

    await renderComponent([habit])

    const spy = vi.fn().mockResolvedValue(true)

    server.patch('/habits/:habit_id/sequence/:id', () => spy)

    const [checkbox] = screen.getAllByRole('checkbox')

    await userEvent.click(checkbox)

    expect(spy).toBeCalledWith({ habit_id: habit.id, id: sequence.id, done: true })
  })
})
