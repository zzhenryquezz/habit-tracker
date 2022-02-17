import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class HabitPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.isAdmin) {
      return true
    }
  }

  public view(user: User, owner: User) {
    return user.id === owner.id
  }
}
