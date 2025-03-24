import { UserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    public async register({ request, response }: HttpContext) {
        const { name, firstname, email, phone, role, password } = request.all()

        const validation = await UserValidator.validate(name, firstname, email, phone, role, password)

    }
}