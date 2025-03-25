/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AuthController from '../app/controllers/auth_controller.js'

router.post('auth/register', [AuthController, 'register']).as('auth.register')
router.post('auth/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())


router.get('/me', [AuthController, 'me'])