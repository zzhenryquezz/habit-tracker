import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/users', 'UsersController').only(['index', 'update', 'destroy'])
})
  .prefix('api')
  .middleware(['auth', 'admin'])
