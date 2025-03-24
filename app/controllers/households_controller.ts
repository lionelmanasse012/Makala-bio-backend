import type { HttpContext } from '@adonisjs/core/http'

export default class HouseholdsController {
    public async home({ request, response }: HttpContext) {

        return ({ message: 'Home Household' })
    }
}