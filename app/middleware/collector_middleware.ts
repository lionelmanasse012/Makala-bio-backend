import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class CollectorMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.user

    if (!user || user.role !== 'collector') {
      return response.unauthorized({ message: 'Accès réservé aux collecteurs' })
    }
    await next()
  }
}