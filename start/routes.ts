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
import CollectorController from '#controllers/collectors_controller'

// Auth
router.post('auth/register', [AuthController, 'register'])
router.post('auth/login', [AuthController, 'login'])
router.delete('/logout', [AuthController, 'logout']).use(middleware.auth())

// Add requests
router.post('/add/request', [RequestController, 'request'])
.use(middleware.auth())

// Get requests
router.get('/offer', [CollectorController, 'post'])
.use(middleware.auth())

// Add offers
router.post('/add/offer', [CollectorController, 'handleOffer'])

// Add collections
router.post('/scan/offer', [CollectorController, 'scanOffer'])
.use(middleware.auth())