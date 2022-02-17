import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('users.habits', 'HabitsController').only([
    'index',
    'show',
    'store',
    'update',
    'destroy',
  ])
})
  .prefix('api')
  .middleware(['auth'])
