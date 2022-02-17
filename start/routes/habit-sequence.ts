import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('habits.sequences', 'HabitSequencesController').only([
    'index',
    'store',
    'update',
    'destroy',
  ])
})
  .prefix('api')
  .middleware(['auth'])
