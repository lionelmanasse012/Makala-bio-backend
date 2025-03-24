import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Offer from '#models/offer'

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare offerId: number

  @belongsTo(() => Offer)
  declare offer: BelongsTo<typeof Offer>

  @column()
  declare collectorId: number

  @belongsTo(() => User, { foreignKey: 'collectorId' })
  declare collector: BelongsTo<typeof User>

  @column()
  declare weight: number

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
