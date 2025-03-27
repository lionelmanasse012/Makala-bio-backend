import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
    'requestId.required': 'L\'id de la demande est manquante',
})

export const CollectorValidator = vine.compile(
    vine.object({
        requestId: vine.number().positive(),
    })
)