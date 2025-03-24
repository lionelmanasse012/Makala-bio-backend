import vine, { SimpleMessagesProvider } from '@vinejs/vine'


vine.messagesProvider = new SimpleMessagesProvider({
    // Applicable for all fields
    'required': 'Le champ {{ field }} est obligatoire',
    'string': 'Le champ {{ field }} doit être une chaine de caractères',
    'email': 'Veiullez entrer une adresse email valide',
    'password.minLength': 'Le mot de passe doit contenir au moins {{ args.0 }} caractères',
    'password.maxLength': 'Le mot de passe doit contenir au plus {{ args.0 }} caractères',
    'confirmed': 'Les champs {{ field }} et {{ args.0 }} doivent être identiques',
    'email.unique': 'Cette adresse email est deja utilisée',
    'phone.unique': 'Ce numéro de téléphone est deja utilisé',
    'enum': 'La valeur du champ {{ field }} n\'est pas valide',

    'name.required': 'Veuillez entrer votre nom',
    'firstname.required': 'Veuillez entrer votre prénom',
  })

export const UserValidator = vine
    .withMetaData<{ userId: number }>()
    .compile(
        vine.object({
            name: vine.string().alpha().minLength(3).trim(),
            firstname: vine.string().alpha().minLength(3).trim(),
            email: vine.string().trim().unique(async (db, value, field) => {
                const user = await db
                    .from('users')
                    .whereNot('id', field.meta.userId)
                    .where('email', value)
                    .first()
                return !user
            }),
            phone: vine.string().trim().unique(async (db, value, field) => {
                const user = await db
                    .from('users')
                    .whereNot('id', field.meta.userId)
                    .where('phone', value)
                    .first()
                return !user
            }),
            password: vine.string().minLength(8).maxLength(20),
            confirmPassword: vine.string().confirmed(
                { confirmationField: 'password'}
            ),
            role: vine.enum(['admin', 'producer', 'collector']),
        })
    )
