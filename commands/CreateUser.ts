import { BaseCommand } from '@adonisjs/core/build/standalone'

import UserStoreValidator from 'App/Validators/UserStoreValidator'

export default class CreateUser extends BaseCommand {
  public static commandName = 'create:user'
  public static description = 'Create a new user'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: User } = await import('App/Models/User')
    const { validator } = await import('@ioc:Adonis/Core/Validator')

    const name = await this.prompt.ask('Name')
    const email = await this.prompt.ask('Email')
    const password = await this.prompt.secure('Password')
    const passwordConfirmation = await this.prompt.secure('Confirm password')
    const userType = await this.prompt.confirm('Is admin user?')

    await validator
      .validate({
        ...new UserStoreValidator(),
        data: { name, email, password, password_confirmation: passwordConfirmation },
      })
      .then(async (user) => {
        await User.create({
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: userType,
        })

        this.logger.success('User created successfully')
      })
      .catch((error) => this.logger.logError(error.message || error.messages))
  }
}
