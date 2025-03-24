import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      
      table.integer('offer_id').unsigned().notNullable()
      table.foreign('offer_id').references('offers.id').onDelete('CASCADE')

      table.integer('collector_id').unsigned().notNullable()
      table.foreign('collector_id').references('users.id').onDelete('CASCADE')

      table.float('weight').notNullable()

      table.string('type').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}