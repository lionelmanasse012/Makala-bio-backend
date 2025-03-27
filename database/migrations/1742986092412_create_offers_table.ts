import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'offers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('request_id').unsigned().notNullable()
      table.foreign('request_id').references('requests.id').onDelete('CASCADE')

      table.enum('type', ['Recyclables', 'Déchets organiques', 'Déchets électroniques', 'Autres']).notNullable()

      table.integer('weight').notNullable()

      table.text('qr_code').notNullable()

      table.string('qr_code_id').notNullable().unique()

      table.enum('status', ['acceptée', 'collectée']).notNullable()

      table.integer('collector_id').unsigned().notNullable()
      table.foreign('collector_id').references('users.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}