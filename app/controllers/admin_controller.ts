import User from '#models/user'
import Request from '#models/request'
import Offer from '#models/offer'
import { RegisterValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import Collection from '#models/collection'

export default class AdminController {
    public async register({ request, response }: HttpContext) {
        const { name, firstname, email, phone, password } = await request.validateUsing(RegisterValidator)

        const user = await User.create({
            name,
            firstname,
            email,
            phone,
            password,
            role: 'collector'
        })

        return response.created({ message: 'Inscription réussie', user })
    }

    public async allUsers({ request, response, auth }: HttpContext) {
        try {
            await auth.check()

            const page = request.input('page', 1)
            const limit = request.input('limit', 10)

            const users = await User.query().paginate(page, limit)

            return response.ok({
                status: "success",
                message: "Liste des utilisateurs récupérée avec succès",
                data: users.toJSON(),
            })
        } catch (error) {
            return response.unauthorized({ message: "Utilisateur non authentifié" })
        }
    }

    public async allRequests({ response, auth, request }: HttpContext) {


        try {
            await auth.check()

            const page = request.input('page', 1)
            const limit = request.input('limit', 10)

            const requests = await Request.query().paginate(page, limit)

            return response.ok({
                status: "success",
                message: "Liste des demandes récupérée avec succès",
                data: requests.toJSON(),
            })
        } catch (error) {
            return response.unauthorized({ message: "Utilisateur non authentifié" })
        }
    }

    public async allOffers({ request, response, auth }: HttpContext) {
        try {
            await auth.check()

            const page = request.input('page', 1)
            const limit = request.input('limit', 10)

            const offers = await Offer.query().paginate(page, limit)

            return response.ok({
                status: "success",
                message: "Liste des offres récupérée avec succès",
                data: offers.toJSON(),
            })
        } catch (error) {
            return response.unauthorized({ message: "Utilisateur non authentifié" })
        }
    }

    public async allCollections({ request, response, auth }: HttpContext) {
        try {
            await auth.check()

            const page = request.input('page', 1)
            const limit = request.input('limit', 10)

            const collections = await Collection.query().paginate(page, limit)

            return response.ok({
                status: "success",
                message: "Liste des utilisateurs récupérée avec succès",
                data: collections.toJSON(),
            })
        } catch (error) {
            return response.unauthorized({ message: "Utilisateur non authentifié" })
        }
    }
}