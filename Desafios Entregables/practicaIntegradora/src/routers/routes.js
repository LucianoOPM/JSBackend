const { Router } = require('express')
const router = Router()
const views = require('./homeView.router.js')
const realtime = require('./realTimeProducts.js')
const chats = require('./chatsRouter.js')
const carts = require('./cartsRouter.js')
const users = require('./usersRouter.js')
const products = require("./product.router.js")

router.use('/views', views)
router.use('/api/realtimeproducts', realtime)
router.use('/api/products', products)
router.use('/api/chat', chats)
router.use('/api/carts', carts)
router.use('/api/users', users)
/*
TO DO
'/products'
'/products/pid'

*/

module.exports = router