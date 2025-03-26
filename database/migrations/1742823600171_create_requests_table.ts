import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('producer_id').unsigned().notNullable()
      table.foreign('producer_id').references('users.id').onDelete('CASCADE')

      table.enum('type', ['Recyclables', 'Déchets organiques', 'Déchets électroniques', 'Autres']).notNullable()

      table.string('weight').notNullable()

      table.string('collect_date').notNullable()

      table.string('collect_hour').notNullable()

      table.string('message').nullable()

      table.text('qr_code').notNullable()

      table.string('qr_code_id').notNullable()

      table.enum('statut', ['en attente', 'accepté']).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
