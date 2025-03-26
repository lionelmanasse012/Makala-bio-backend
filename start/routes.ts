/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import RequestController from '#controllers/requests_controller'

// Auth
router.post('auth/register', [AuthController, 'register']).as('auth.register')
router.post('auth/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())

// Add request
router.post('/add/request', [RequestController, 'request']).as('request').use(middleware.auth())