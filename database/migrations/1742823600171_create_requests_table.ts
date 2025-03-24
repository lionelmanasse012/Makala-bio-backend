import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('producer_id').unsigned().notNullable()
      table.foreign('producer_id').references('users.id').onDelete('CASCADE')

      table.enum('type', ['Recyclables', 'Déchets organiques', 'Déchets électroniques', 'Autres']).notNullable()

      table.string('collectDate').notNullable()

      table.string('collectHour').notNullable()

      table.string('note').notNullable()

      table.enum('statut', ['en attente', 'accepté', 'terminé']).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
