export function makeHabits(count = 1) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    name: `Habit ${i}`,
    sequences: [] as any[],
  }))
}
