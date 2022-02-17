import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Habit from 'App/Models/Habit'
import User from 'App/Models/User'

export default class HabitPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user?.isAdmin) {
      return true
    }
  }

  public view(user: User, owner: User) {
    return user.id === owner.id
  }

  public isOwner(user: User, habit: Habit) {
    return user.id === habit.userId
  }
}
