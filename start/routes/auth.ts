import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout').middleware('auth')
  Route.post('/register', 'AuthController.register')
  Route.post('/reset-password', 'AuthController.resetPassword').middleware('auth')
})
  .prefix('auth')
  .prefix('api')
