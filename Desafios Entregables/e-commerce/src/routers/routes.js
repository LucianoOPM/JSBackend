const { Router } = require('express')
const router = Router()

//API v2 imports
const ProductsV2 = require('./product.router.js')
const UserRouterV2 = require('./users.router.js');
const SessionRouterV2 = require('./session.router.js')
const ViewsRouterV2 = require('./views.router.js')
const CartRouterV2 = require('./carts.router.js');

//API V2 Instances
const productsv2 = new ProductsV2()
const usersv2 = new UserRouterV2()
const sessionv2 = new SessionRouterV2()
const viewsv2 = new ViewsRouterV2()
const cartsv2 = new CartRouterV2()

//API v2 endpoints
router.use('/', viewsv2.getRouter())//Ruta de vistas
router.use('/api/products', productsv2.getRouter())//Funciona
router.use('/api/users', usersv2.getRouter())//Funciona
router.use('/api/session', sessionv2.getRouter())
router.use('/api/carts', cartsv2.getRouter())//Funciona

router.use('*', (_req, res) => {
    res.status(404).send({
        status: 'Error',
        payload: 'Not Found'
    })
})

module.exports = router