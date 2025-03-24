import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'offers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()

      table.integer('request_id').unsigned().notNullable()
      table.foreign('request_id').references('request.id').onDelete('CASCADE')

      table.enum('type', ['Recyclables', 'Déchets organiques', 'Déchets électroniques', 'Autres']).notNullable()

      table.string('weight').notNullable()

      table.string('qr_code').notNullable()

      table.enum('status', ['pending', 'accepted', 'collected']).notNullable()

      table.integer('collector_id').unsigned().nullable()
      table.foreign('collector_id').references('users.id').onDelete('SET NULL')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}