import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Habits extends BaseSchema {
  protected tableName = 'habits'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description').notNullable().defaultTo('')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
