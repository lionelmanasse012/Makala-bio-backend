import type { HttpContext } from '@adonisjs/core/http'
import Request from '#models/request'

export default class RequestController {
    public async offer({ request, response }: HttpContext) {
        const { type, weight, collectDate, collectHour, note } = await request.validateUsing(OfferValidator)

        // const demande = await Request.create({ 
        //     type, 
        //     weight, 
        //     collectDate, 
        //     collectHour, 
        //     note: note ?? '' 
        // })

        // return response.created({ message: 'Offre créée avec succès', offer })
    }
}