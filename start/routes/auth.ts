import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout').middleware('auth')
  Route.post('/register', 'AuthController.register')
})
  .prefix('auth')
  .prefix('api')
