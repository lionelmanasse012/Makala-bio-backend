import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'

export default class Offer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare producerId: number
  
  @belongsTo(() => User, { foreignKey: 'producerId' })
  declare producer: BelongsTo<typeof User>

  @column()
  declare qrCode: string

   @column()
  declare status: 'pending' | 'accepted' | 'collected'

  @column()
  declare collectorId: number | null

  @belongsTo(() => User, { foreignKey: 'collectorId' })
  declare collector: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}