import type { HttpContext } from '@adonisjs/core/http'
import Request from '#models/request'
import Offer from '#models/offer'
import Collection from '#models/collection'

export default class CollectorController {
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

    public async handleOffer({ response, auth, request }: HttpContext) {

        try {
            await auth.check()

            const requestId = request.input('requestId')

            if (!requestId) {
                return response.badRequest({
                    status: "error",
                    message: "L'ID de la demande est requis",
                })
            }

            const requestRecord = await Request.find(requestId)

            if (!requestRecord) {
                return response.notFound({
                    status: "error",
                    message: "Demande non trouvée",
                })
            }

            if (requestRecord.status === 'acceptée') {
                return response.conflict({
                    status: "error",
                    message: "Cette demande a déjà été acceptée",
                })

            }

            const offer = await Offer.create({
                type: requestRecord.type,
                weight: requestRecord.weight,
                qrCode: requestRecord.qrCode,
                qrCodeId: requestRecord.qrCodeId,
                status: 'acceptée',
                requestId: requestRecord.id,
                collectorId: auth.user!.id,
            })

            requestRecord.status = offer.status
            await requestRecord.save()

            return response.ok({
                status: "success",
                message: "Demande acceptée avec succès",
                offer
            })
        } catch (error) {
            console.error("Erreur lors de la récupération de la demande :", error)
            return response.internalServerError({
                status: "error",
                message: "Une erreur est survenue",
                error: error.message,
            })
        }
    }

    public async scanOffer({ response, auth, request }: HttpContext) {

        try {
            await auth.check()

            const qrCodeId = request.input('qrCodeId')

            if (!qrCodeId) {
                return response.badRequest({
                    status: "error",
                    message: "QRCode invalide",
                })
            }

            const offerRecord = await Offer.findBy('qr_code_id', qrCodeId)

            if (!offerRecord) {
                return response.notFound({
                    status: "error",
                    message: "QRCode invalide",
                })
            }

            if (offerRecord.status === 'collectée') {
                return response.conflict({
                    status: "error",
                    message: "Cette offre a déjà été collectée",
                })
            }
            offerRecord.status = 'collectée'
            await offerRecord.save()

            const collection = await Collection.create({
                type: offerRecord.type,
                weight: offerRecord.weight,
                offerId: offerRecord.id,
                collectorId: auth.user!.id,
            })

            return response.ok({
                status: "success",
                message: "Collecte effectuée avec succès",
                collection
            })
        } catch (error) {
            console.error("Erreur lors de la récupération de la demande :", error)
            return response.internalServerError({
                status: "error",
                message: "Une erreur est survenue",
                error: error.message,
            })
        }
    }
}
