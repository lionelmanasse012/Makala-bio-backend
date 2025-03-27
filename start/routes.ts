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
import AdminController from '#controllers/admin_controller'

// Auth
router.group(() => {
    router.post('/auth/register', [AuthController, 'register'])
    router.post('/auth/login', [AuthController, 'login'])
})
router.delete('/auth/logout', [AuthController, 'logout']).use(middleware.auth())

// ************** Admin **************

router.group(() => {
    router.post('/admin/create/collector', [AdminController, 'register'])
    router.get('/admin/show/users', [AdminController, 'allUsers'])
    router.get('/admin/show/requests', [AdminController, 'allRequests'])
    router.get('/admin/show/offers', [AdminController, 'allOffers'])
    router.get('/admin/show/collections', [AdminController, 'allCollections'])
}).use([middleware.auth(), middleware.admin()])

// ************** Collector ************** 

// Show requests
router.group(() => {
    router.get('/collector/show/requests', [CollectorController, 'allRequests'])
    router.post('/collector/add/offer', [CollectorController, 'handleOffer'])
    router.post('/collector/scan/offer', [CollectorController, 'scanOffer'])
}) .use([middleware.auth(),middleware.collector()])
   

// ************** producer ************** 
// Add requests
router.post('/producer/add/request', [RequestController, 'request'])
    .use(middleware.auth())
    .use(middleware.producer())