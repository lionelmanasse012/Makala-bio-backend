import vine, { SimpleMessagesProvider } from '@vinejs/vine'


vine.messagesProvider = new SimpleMessagesProvider({
    // Applicable for all fields
    'required': 'Le champ {{ field }} est obligatoire',
    'password.required': 'Vous devez saisir un mot de passe',
    'confirmPassword.required': 'Vous devez confirmer votre mot de passe',
    'role.required': 'Vous devez sélectionner un rôle',
    'string': 'Le champ {{ field }} doit être une chaîne de caractères',
    'email': 'Veuillez entrer une adresse email valide',
    'password.minLength': 'Le mot de passe doit contenir au moins {{ args.0 }} caractères',
    'password.maxLength': 'Le mot de passe doit contenir au plus {{ args.0 }} caractères',
    'confirmed': 'Les mots de passe ne correspondent pas',
    'email.database.unique': 'Cette adresse email est déjà utilisée',
    'phone.database.unique': 'Ce numéro de téléphone est déjà utilisé',
    'enum': 'La valeur du champ {{ field }} n\'est pas valide',
    'name.required': 'Veuillez entrer votre nom',
    'firstname.required': 'Veuillez entrer votre prénom',
})

export const AdminRegisterValidator = vine.compile(
    vine.object({
        name: vine.string().alpha().minLength(3).trim().regex(/^[a-zA-Z]+$/),
        firstname: vine.string().alpha().minLength(3).trim().regex(/^[a-zA-Z]+$/),
        email: vine.string().email().trim().unique(async (db, value) => {
            const user = await db.from('users').where('email', value).first();
            return !user;
        }),

        phone: vine.string().trim().unique(async (db, value) => {
            const user = await db.from('users').where('phone', value).first();
            return !user;
        }),
    })
)