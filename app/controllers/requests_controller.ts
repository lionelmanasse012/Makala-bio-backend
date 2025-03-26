import type { HttpContext } from '@adonisjs/core/http'
import Request from '#models/request'
import { RequestValidator } from '#validators/request'
import { v4 as uuidv4 } from 'uuid'
import QRCode from 'qrcode'

export default class RequestController {
    public async request({ request, response, auth }: HttpContext) {

        auth.check()

        const { type, weight, collectDate, collectHour, message } = await request.validateUsing(RequestValidator)

        const generateQR = async (data: any): Promise<string> => {
            try {
                return await QRCode.toDataURL(JSON.stringify(data))
            } catch (err) {
                console.error(err)
                return ''
            }
        }

        const qrCodeId = uuidv4()
        const qrCodeData = { type, weight, qrCodeID: qrCodeId }

        const qrCode = await generateQR(qrCodeData)

        const req = await Request.create({
            type,
            weight,
            collectDate,
            collectHour,
            message,
            qrCode,
            qrCodeId,
            producerId: auth.user!.id,
            statut: 'en attente'
        })

        return response.created({ message: 'Demande effectuée', req })
    }
}
