import User from '#models/user'
import { LoginValidator, RegisterValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    public async register({ request, response }: HttpContext) {
        const { name, firstname, email, phone, password } = await request.validateUsing(RegisterValidator)

        const user = await User.create({
            name,
            firstname,
            email,
            phone,
            password,
            role: 'producer'
        })

        return response.created({ message: 'Inscription réussie', user })
    }

    public async login({ request, response }: HttpContext) {
        try {
            const { email, password } = await request.validateUsing(LoginValidator)
            const user = await User.verifyCredentials(email, password)

            const token = await User.accessTokens.create(user,
                ['*'],
                {
                    name: request.input('token_name'),
                    expiresIn: '7 days'
                })
            const data = {
                token: token,
                user
            }
            return response.ok(data)

        } catch (error) {
            return response.badRequest({ message: 'Votre mot de passe ou email est incorrect !' })
        }
    }

    public async logout({ response, auth }: HttpContext) {
        try {
            const user = auth.user!

            await User.accessTokens.delete(user, user.currentAccessToken.identifier)

            return response.ok({ message: 'Déconnexion réussie' });
        } catch (error) {
            console.error(error);
            return response.internalServerError({ message: 'Erreur lors de la déconnexion' });
        }
    }
}