import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo } from '@adonisjs/lucid/orm'
import Request from '#models/request'
import User from '#models/user'

export default class Offer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare requestId: number

  @belongsTo(() => Request, { foreignKey: 'requestId' })
  declare request: BelongsTo<typeof Request>

  @column()
  declare type: 'Recyclables' | 'Déchets organiques' | 'Déchets électroniques' | 'Autres'

  @column()
  declare weight: number

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